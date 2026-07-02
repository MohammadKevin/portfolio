import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "visitors.json");

function parseUserAgent(userAgent: string) {
  let device = "Desktop";
  let os = "Windows";
  let browser = "Chrome";

  const ua = userAgent.toLowerCase();

  // OS detection
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

  // Device override
  if (ua.includes("mobile") && device === "Desktop") {
    device = "Mobile";
  }

  // Browser detection
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
    
    // Obfuscate / Extract client IP
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";

    const parsed = parseUserAgent(userAgent);

    // Initialize dir and file
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
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

    // Ignore tracker views from localhost if needed, or record all
    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      ip: ip,
      device: parsed.device,
      os: parsed.os,
      browser: parsed.browser,
      userAgent: userAgent,
    };

    visitors.unshift(newEntry);

    // Keep it clean (last 1000 views)
    if (visitors.length > 1000) {
      visitors = visitors.slice(0, 1000);
    }

    fs.writeFileSync(filePath, JSON.stringify(visitors, null, 2), "utf-8");

    return NextResponse.json({ success: true, visit: newEntry });
  } catch (error) {
    console.error("Tracker error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    let visitors = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        visitors = JSON.parse(fileContent);
      } catch (err) {
        visitors = [];
      }
    }
    return NextResponse.json({ success: true, visitors });
  } catch (error) {
    console.error("Fetcher error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
