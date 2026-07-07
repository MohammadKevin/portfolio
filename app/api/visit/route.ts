import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const filePath = isVercel
  ? path.join("/tmp", "visitors.json")
  : path.join(process.cwd(), "data", "visitors.json");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

// Supabase helper
async function supabaseFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${supabaseUrl}/rest/v1${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      "apikey": supabaseKey!,
      "Authorization": `Bearer ${supabaseKey!}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...options.headers,
    },
  });
}

function parseUserAgent(userAgent: string) {
  let device = "Desktop";
  let os = "Windows";
  let browser = "Chrome";

  const ua = userAgent.toLowerCase();

  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("macintosh") || ua.includes("mac os x")) os = "macOS";
  else if (ua.includes("android")) {
    os = "Android";
    device = "Mobile";
  } else if (ua.includes("iphone")) {
    os = "iOS (iPhone)";
    device = "Mobile";
  } else if (ua.includes("ipad")) {
    os = "iOS (iPad)";
    device = "Tablet";
  } else if (ua.includes("linux")) os = "Linux";

  if (ua.includes("mobile") && device === "Desktop") {
    device = "Mobile";
  }

  if (ua.includes("chrome") || ua.includes("crios")) {
    if (ua.includes("edge") || ua.includes("edg")) {
      browser = "Edge";
    } else if (ua.includes("opr") || ua.includes("opera")) {
      browser = "Opera";
    } else {
      browser = "Chrome";
    }
  } else if (ua.includes("safari") && !ua.includes("chrome") && !ua.includes("crios")) {
    browser = "Safari";
  } else if (ua.includes("firefox") || ua.includes("fxios")) {
    browser = "Firefox";
  }

  return { device, os, browser };
}

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent") || "Unknown User-Agent";

    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";

    const parsed = parseUserAgent(userAgent);

    const newId = Math.random().toString(36).substring(2, 9);
    const timestamp = new Date().toISOString();

    const newEntry = {
      id: newId,
      timestamp: timestamp,
      ip: ip,
      device: parsed.device,
      os: parsed.os,
      browser: parsed.browser,
      userAgent: userAgent,
    };

    if (isSupabaseConfigured) {
      // Save to Supabase (map userAgent camelCase to user_agent snake_case for DB consistency)
      const dbEntry = {
        id: newId,
        timestamp,
        ip,
        device: parsed.device,
        os: parsed.os,
        browser: parsed.browser,
        user_agent: userAgent
      };
      
      const res = await supabaseFetch("/visitors", {
        method: "POST",
        body: JSON.stringify([dbEntry])
      });

      if (!res.ok) {
        throw new Error(`Supabase POST error: ${res.statusText} (${res.status})`);
      }
    } else {
      // Fallback: Save to local JSON file
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      let visitors = [];
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          visitors = JSON.parse(fileContent);
        } catch (err) {
          visitors = [];
        }
      }

      visitors.unshift(newEntry);

      if (visitors.length > 1000) {
        visitors = visitors.slice(0, 1000);
      }

      fs.writeFileSync(filePath, JSON.stringify(visitors, null, 2), "utf-8");
    }

    return NextResponse.json({ success: true, visit: newEntry });
  } catch (error: any) {
    console.error("Tracker error:", error);
    // If Supabase fails, write to local file as backup
    try {
      const parsed = parseUserAgent(request.headers.get("user-agent") || "Unknown User-Agent");
      const newEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        ip: "127.0.0.1",
        device: parsed.device,
        os: parsed.os,
        browser: parsed.browser,
        userAgent: request.headers.get("user-agent") || "Unknown User-Agent"
      };
      return NextResponse.json({ success: true, visit: newEntry, warning: `Database write failed, fallback. Error: ${error.message || error}` });
    } catch (e) {
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      // Fetch from Supabase, limited to 1000 logs sorted by timestamp desc
      const res = await supabaseFetch("/visitors?select=*&order=timestamp.desc&limit=1000");
      if (!res.ok) {
        throw new Error(`Supabase GET error: ${res.statusText} (${res.status})`);
      }
      const data = await res.json();
      
      // Map keys from snake_case back to camelCase for the frontend
      const visitors = data.map((v: any) => ({
        id: v.id,
        timestamp: v.timestamp,
        ip: v.ip,
        device: v.device,
        os: v.os,
        browser: v.browser,
        userAgent: v.user_agent || v.userAgent || "Unknown User-Agent"
      }));
      
      return NextResponse.json({ success: true, visitors, source: "supabase" });
    } else {
      // Fetch from local file
      let visitors = [];
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          visitors = JSON.parse(fileContent);
        } catch (err) {
          visitors = [];
        }
      }
      return NextResponse.json({ success: true, visitors, source: "local" });
    }
  } catch (error: any) {
    console.error("Fetcher error:", error);
    // If Supabase fails, fallback to local JSON file
    try {
      let visitors = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        visitors = JSON.parse(fileContent);
      }
      return NextResponse.json({ 
        success: true, 
        visitors, 
        source: "local-fallback", 
        warning: `Supabase GET failed (${error.message || error}), falling back to local files.` 
      });
    } catch (e) {
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
  }
}
