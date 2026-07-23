import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const filePath = isVercel
  ? path.join("/tmp", "certificates.json")
  : path.join(process.cwd(), "data", "certificates.json");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

const defaultCertificates = [
  {
    id: "cert-1",
    title: "Backend Developer & RESTful API Engineering",
    issuer: "SMK Telkom Malang / Industry Credential",
    date: "2024",
    category: "Backend",
    skills: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
    credentialUrl: "https://github.com/MohammadKevin"
  },
  {
    id: "cert-2",
    title: "Fullstack Web Application Development",
    issuer: "Kemendikbudristek / Vocational Certification",
    date: "2024",
    category: "Fullstack",
    skills: ["Next.js", "React.js", "MySQL", "Tailwind CSS"],
    credentialUrl: "https://github.com/MohammadKevin"
  },
  {
    id: "cert-3",
    title: "Database Design & Performance Tuning",
    issuer: "Developer Academy Certificate",
    date: "2023",
    category: "Database",
    skills: ["PostgreSQL", "MySQL", "Indexing", "Query Optimization"],
    credentialUrl: "https://github.com/MohammadKevin"
  }
];

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

async function parseSupabaseError(res: Response, defaultPrefix: string) {
  let errText = "";
  try {
    const errJson = await res.json();
    errText = errJson.message || errJson.error || errJson.hint || JSON.stringify(errJson);
  } catch {
    errText = await res.text().catch(() => "");
  }
  return `${defaultPrefix}: ${errText || res.statusText} (${res.status})`;
}

function ensureFileAndRead() {
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultCertificates, null, 2), "utf-8");
    return defaultCertificates;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local certificates file:", err);
    fs.writeFileSync(filePath, JSON.stringify(defaultCertificates, null, 2), "utf-8");
    return defaultCertificates;
  }
}

function writeLocalCertificates(certs: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(certs, null, 2), "utf-8");
}

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      const res = await supabaseFetch("/certificates?select=*&order=created_at.desc");
      if (!res.ok) {
        const errorMsg = await parseSupabaseError(res, "Supabase GET error");
        throw new Error(errorMsg);
      }
      let certs = await res.json();
      
      if (certs.length === 0) {
        const seedData = defaultCertificates.map((c, i) => ({
          ...c,
          credential_url: c.credentialUrl,
          created_at: new Date(Date.now() - i * 60000).toISOString()
        }));
        const seedRes = await supabaseFetch("/certificates", {
          method: "POST",
          body: JSON.stringify(seedData)
        });
        if (seedRes.ok) {
          certs = await seedRes.json();
        }
      }

      certs = certs.map((c: any) => ({
        ...c,
        credentialUrl: c.credentialUrl ?? c.credential_url ?? "",
        skills: Array.isArray(c.skills) ? c.skills : []
      }));

      return NextResponse.json({ success: true, certificates: certs, source: "supabase" });
    } else {
      const certs = ensureFileAndRead();
      return NextResponse.json({ success: true, certificates: certs, source: "local" });
    }
  } catch (error: any) {
    console.error("Certificates GET error:", error);
    try {
      const certs = ensureFileAndRead();
      return NextResponse.json({ 
        success: true, 
        certificates: certs, 
        source: "local-fallback", 
        warning: `Supabase GET failed (${error.message || error}), falling back to local files.` 
      });
    } catch {
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, issuer, date, category, skills, credentialUrl } = body;

    if (!title || !issuer || !date || !category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const skillsArray = Array.isArray(skills) ? skills : (skills || "").split(",").map((s: string) => s.trim()).filter(Boolean);
    const newId = "cert-" + Math.random().toString(36).substring(2, 9);

    if (isSupabaseConfigured) {
      const baseCert: Record<string, any> = {
        id: newId,
        title,
        issuer,
        date,
        category,
        skills: skillsArray,
        created_at: new Date().toISOString()
      };

      // Try with credentialUrl and credential_url
      let payload: Record<string, any> = {
        ...baseCert,
        credentialUrl: credentialUrl || "",
        credential_url: credentialUrl || ""
      };

      let res = await supabaseFetch("/certificates", {
        method: "POST",
        body: JSON.stringify([payload])
      });

      if (!res.ok) {
        payload = { ...baseCert };
        res = await supabaseFetch("/certificates", {
          method: "POST",
          body: JSON.stringify([payload])
        });
      }

      if (!res.ok) {
        const errorMsg = await parseSupabaseError(res, "Supabase POST error");
        throw new Error(errorMsg);
      }

      let data: any[] = [];
      try { data = await res.json(); } catch { data = []; }
      const created = data[0] || payload;

      return NextResponse.json({
        success: true,
        certificate: {
          ...created,
          credentialUrl: created.credentialUrl ?? created.credential_url ?? credentialUrl ?? ""
        },
        source: "supabase"
      });
    } else {
      const certs = ensureFileAndRead();
      const newCert = {
        id: newId,
        title,
        issuer,
        date,
        category,
        skills: skillsArray,
        credentialUrl: credentialUrl || ""
      };
      certs.unshift(newCert);
      writeLocalCertificates(certs);
      return NextResponse.json({ success: true, certificate: newCert, source: "local" });
    }
  } catch (error: any) {
    console.error("Certificates POST error:", error);
    return NextResponse.json({ success: false, error: error.message || error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, issuer, date, category, skills, credentialUrl } = body;

    if (!id || !title || !issuer || !date || !category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const skillsArray = Array.isArray(skills) ? skills : (skills || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    if (isSupabaseConfigured) {
      const baseCert: Record<string, any> = {
        title,
        issuer,
        date,
        category,
        skills: skillsArray
      };

      let payload: Record<string, any> = {
        ...baseCert,
        credentialUrl: credentialUrl || "",
        credential_url: credentialUrl || ""
      };

      let res = await supabaseFetch(`/certificates?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        payload = { ...baseCert };
        res = await supabaseFetch(`/certificates?id=eq.${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      }

      if (!res.ok) {
        const errorMsg = await parseSupabaseError(res, "Supabase PATCH error");
        throw new Error(errorMsg);
      }

      let data: any[] = [];
      try { data = await res.json(); } catch { data = []; }
      const updated = data[0] || { id, ...baseCert, credentialUrl };

      return NextResponse.json({
        success: true,
        certificate: {
          ...updated,
          id,
          credentialUrl: updated.credentialUrl ?? updated.credential_url ?? credentialUrl ?? ""
        },
        source: "supabase"
      });
    } else {
      const certs = ensureFileAndRead();
      const index = certs.findIndex((c: any) => c.id === id);
      if (index === -1) {
        return NextResponse.json({ success: false, error: "Certificate not found" }, { status: 404 });
      }

      certs[index] = {
        id,
        title,
        issuer,
        date,
        category,
        skills: skillsArray,
        credentialUrl: credentialUrl || ""
      };

      writeLocalCertificates(certs);
      return NextResponse.json({ success: true, certificate: certs[index], source: "local" });
    }
  } catch (error: any) {
    console.error("Certificates PUT error:", error);
    return NextResponse.json({ success: false, error: error.message || error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing certificate ID" }, { status: 400 });
    }

    if (isSupabaseConfigured) {
      const res = await supabaseFetch(`/certificates?id=eq.${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const errorMsg = await parseSupabaseError(res, "Supabase DELETE error");
        throw new Error(errorMsg);
      }

      return NextResponse.json({ success: true, message: "Certificate deleted successfully", source: "supabase" });
    } else {
      const certs = ensureFileAndRead();
      const filtered = certs.filter((c: any) => c.id !== id);
      if (certs.length === filtered.length) {
        return NextResponse.json({ success: false, error: "Certificate not found" }, { status: 404 });
      }
      writeLocalCertificates(filtered);
      return NextResponse.json({ success: true, message: "Certificate deleted successfully", source: "local" });
    }
  } catch (error: any) {
    console.error("Certificates DELETE error:", error);
    return NextResponse.json({ success: false, error: error.message || error }, { status: 500 });
  }
}
