import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const filePath = isVercel
  ? path.join("/tmp", "projects.json")
  : path.join(process.cwd(), "data", "projects.json");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

const defaultProjects = [
  {
    id: "project-1",
    title: "InvDocs - Digital Archive System",
    category: "Digital Archive System",
    type: "Fullstack",
    color: "from-amber-600 to-yellow-500",
    desc: "Sistem pengarsipan dan manajemen dokumen digital terstruktur untuk organisasi dengan enkripsi berkas dan hak akses bertingkat.",
    problem: "Pengarsipan fisik yang berantakan dan lambatnya pencarian dokumen administratif lama.",
    impact: "Mempercepat waktu pencarian berkas dari hitungan jam menjadi kurun waktu < 3 detik dengan indeks metadata terstruktur.",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    demoUrl: "",
    repoUrl: "https://github.com/MohammadKevin/InvDocs-Archive"
  },
  {
    id: "project-2",
    title: "Kasir App (POS Terminal)",
    category: "Point of Sale System",
    type: "Fullstack",
    color: "from-emerald-600 to-teal-500",
    desc: "Sistem kasir toko & UMKM dengan pencatatan transaksi real-time, cetak struk faktur, serta pembuatan laporan penjualan harian.",
    problem: "Pencatatan kasir manual yang rawan selisih persediaan barang dan kesalahan kalkulasi kembalian.",
    impact: "Menghilangkan selisih persediaan fisik dengan akurasi pemotongan stok otomatis 100% pada transaksi kasir.",
    tech: ["React.js", "Express.js", "MySQL", "Prisma", "Tailwind CSS"],
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: "project-3",
    title: "Inventory Management API & Engine",
    category: "Backend Engine",
    type: "Backend",
    color: "from-cyan-600 to-blue-500",
    desc: "RESTful API high-throughput untuk pelacakan persediaan gudang, multi-warehouse batch logging, dan notifikasi stok kritis.",
    problem: "Lambatnya query pencarian stok barang dalam jumlah puluhan ribu baris data pada sistem gudang lama.",
    impact: "Mempercepat query pencarian persediaan sebesar 40% setelah penerapan database indexing dan Prisma query tuning.",
    tech: ["NestJS", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    demoUrl: "",
    repoUrl: "https://github.com/MohammadKevin/inventory-backend-engine"
  },
  {
    id: "project-4",
    title: "Digital Public Record Platform",
    category: "Web Application",
    type: "Fullstack",
    color: "from-blue-600 to-indigo-500",
    desc: "Platform pengarsipan data publik dan catatan administratif sekolah/organisasi dengan proteksi otentikasi JWT.",
    problem: "Kebutuhan publikasi data arsip terbuka yang tetap menjamin kerahasiaan berkas internal.",
    impact: "Sistem berhasil menangani ribuan pengunduhan berkas dokumen publik dengan pengamanan akses granular.",
    tech: ["Next.js", "Tailwind CSS", "Prisma", "MySQL"],
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: "project-5",
    title: "Developer Terminal Portfolio",
    category: "System Interface",
    type: "Frontend",
    color: "from-purple-600 to-pink-500",
    desc: "Website portofolio pribadi bertema IDE/Terminal developer tool dengan UI high-contrast, status diagnostics, dan system info viewer.",
    problem: "Template portofolio SaaS generik yang tidak mencerminkan fokus arsitektur backend & system dev.",
    impact: "Memberikan pengalaman visual unik bergaya system terminal dengan performa 100% Lighthouse score.",
    tech: ["Next.js 16", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://mohammadkevin.dev",
    repoUrl: "https://github.com/MohammadKevin/my-portfolio"
  },
  {
    id: "project-6",
    title: "School System Admin Dashboard",
    category: "Admin Dashboard",
    type: "Frontend",
    color: "from-slate-700 to-slate-900",
    desc: "Dashboard monitoring metrik data akademik sekolah, visualisasi keaktifan siswa, dan pengelolaan jadwal kegiatan.",
    problem: "Visualisasi data akademis kompleks yang sulit dibaca oleh staf pengajar.",
    impact: "Menyederhanakan pemantauan data akademik dengan waktu pemuatan widget dashboard under 1 detik.",
    tech: ["React.js", "Chart.js", "Tailwind CSS", "TypeScript"],
    demoUrl: "",
    repoUrl: ""
  }
];

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

// Local File helper
function ensureFileAndRead() {
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultProjects, null, 2), "utf-8");
    return defaultProjects;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error("Error reading local projects file, resetting to default:", err);
    fs.writeFileSync(filePath, JSON.stringify(defaultProjects, null, 2), "utf-8");
    return defaultProjects;
  }
}

function writeLocalProjects(projects: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), "utf-8");
}

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      // Fetch from Supabase
      const res = await supabaseFetch("/projects?select=*&order=created_at.desc");
      if (!res.ok) {
        const errorMsg = await parseSupabaseError(res, "Supabase GET error");
        throw new Error(errorMsg);
      }
      let projects = await res.json();
      
      // Seed if empty
      if (projects.length === 0) {
        const seedData = defaultProjects.map((p, i) => ({
          ...p,
          created_at: new Date(Date.now() - i * 60000).toISOString()
        }));
        const seedRes = await supabaseFetch("/projects", {
          method: "POST",
          body: JSON.stringify(seedData)
        });
        if (seedRes.ok) {
          projects = await seedRes.json();
        }
      }
      
      // Normalize demoUrl and repoUrl
      projects = projects.map((p: any) => ({
        ...p,
        demoUrl: p.demoUrl ?? p.demo_url ?? p.demourl ?? "",
        repoUrl: p.repoUrl ?? p.repo_url ?? p.repourl ?? ""
      }));

      return NextResponse.json({ success: true, projects, source: "supabase" });
    } else {
      // Fallback to local files
      const projects = ensureFileAndRead();
      return NextResponse.json({ success: true, projects, source: "local" });
    }
  } catch (error: any) {
    console.error("Projects GET error:", error);
    // If Supabase fails, fallback to local JSON file
    try {
      const projects = ensureFileAndRead();
      return NextResponse.json({ 
        success: true, 
        projects, 
        source: "local-fallback", 
        warning: `Supabase GET failed (${error.message || error}), falling back to local files.` 
      });
    } catch (fallbackError) {
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, type, color, desc, tech, demoUrl, repoUrl } = body;

    if (!title || !category || !type || !color || !desc || !tech) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const techArray = Array.isArray(tech) ? tech : tech.split(",").map((t: string) => t.trim()).filter(Boolean);
    const newId = Math.random().toString(36).substring(2, 9);

    if (isSupabaseConfigured) {
      const baseProject: Record<string, any> = {
        id: newId,
        title,
        category,
        type,
        color,
        desc,
        tech: techArray,
        created_at: new Date().toISOString()
      };

      // Attempt 1: camelCase (demoUrl, repoUrl)
      let payload: Record<string, any> = {
        ...baseProject,
        demoUrl: demoUrl || "",
        repoUrl: repoUrl || ""
      };

      let res = await supabaseFetch("/projects", {
        method: "POST",
        body: JSON.stringify([payload])
      });

      if (!res.ok) {
        // Attempt 2: snake_case (demo_url, repo_url)
        payload = {
          ...baseProject,
          demo_url: demoUrl || "",
          repo_url: repoUrl || ""
        };
        res = await supabaseFetch("/projects", {
          method: "POST",
          body: JSON.stringify([payload])
        });
      }

      if (!res.ok) {
        // Attempt 3: Basic columns only
        payload = { ...baseProject };
        res = await supabaseFetch("/projects", {
          method: "POST",
          body: JSON.stringify([payload])
        });
      }

      if (!res.ok) {
        const errorMsg = await parseSupabaseError(res, "Supabase POST error");
        throw new Error(errorMsg);
      }
      
      let data: any[] = [];
      try {
        data = await res.json();
      } catch {
        data = [];
      }
      const created = data[0] || payload;

      return NextResponse.json({ 
        success: true, 
        project: {
          ...created,
          demoUrl: created.demoUrl ?? created.demo_url ?? demoUrl ?? "",
          repoUrl: created.repoUrl ?? created.repo_url ?? repoUrl ?? ""
        }, 
        source: "supabase" 
      });
    } else {
      // Insert to local file
      const projects = ensureFileAndRead();
      const newProject = {
        id: newId,
        title,
        category,
        type,
        color,
        desc,
        tech: techArray,
        demoUrl: demoUrl || "",
        repoUrl: repoUrl || ""
      };
      projects.unshift(newProject);
      writeLocalProjects(projects);
      return NextResponse.json({ success: true, project: newProject, source: "local" });
    }
  } catch (error: any) {
    console.error("Projects POST error:", error);
    return NextResponse.json({ 
      success: false, 
      error: `Failed to save project: ${error.message || error}` 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, category, type, color, desc, tech, demoUrl, repoUrl } = body;

    if (!id || !title || !category || !type || !color || !desc || !tech) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const techArray = Array.isArray(tech) ? tech : tech.split(",").map((t: string) => t.trim()).filter(Boolean);

    if (isSupabaseConfigured) {
      const baseProject: Record<string, any> = {
        title,
        category,
        type,
        color,
        desc,
        tech: techArray
      };

      // Attempt 1: camelCase
      let payload: Record<string, any> = {
        ...baseProject,
        demoUrl: demoUrl || "",
        repoUrl: repoUrl || ""
      };

      let res = await supabaseFetch(`/projects?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        // Attempt 2: snake_case
        payload = {
          ...baseProject,
          demo_url: demoUrl || "",
          repo_url: repoUrl || ""
        };
        res = await supabaseFetch(`/projects?id=eq.${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      }

      if (!res.ok) {
        // Attempt 3: Basic columns only
        payload = { ...baseProject };
        res = await supabaseFetch(`/projects?id=eq.${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      }

      if (!res.ok) {
        const errorMsg = await parseSupabaseError(res, "Supabase PATCH error");
        throw new Error(errorMsg);
      }

      let data: any[] = [];
      try {
        data = await res.json();
      } catch {
        data = [];
      }
      const updated = data[0] || { id, ...baseProject, demoUrl, repoUrl };

      return NextResponse.json({ 
        success: true, 
        project: {
          ...updated,
          id,
          demoUrl: updated.demoUrl ?? updated.demo_url ?? demoUrl ?? "",
          repoUrl: updated.repoUrl ?? updated.repo_url ?? repoUrl ?? ""
        }, 
        source: "supabase" 
      });
    } else {
      // Update in local file
      const projects = ensureFileAndRead();
      const index = projects.findIndex((p: any) => p.id === id);

      if (index === -1) {
        return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
      }

      projects[index] = {
        id,
        title,
        category,
        type,
        color,
        desc,
        tech: techArray,
        demoUrl: demoUrl || "",
        repoUrl: repoUrl || ""
      };

      writeLocalProjects(projects);
      return NextResponse.json({ success: true, project: projects[index], source: "local" });
    }
  } catch (error: any) {
    console.error("Projects PUT error:", error);
    return NextResponse.json({ 
      success: false, 
      error: `Failed to update project: ${error.message || error}` 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing project ID" }, { status: 400 });
    }

    if (isSupabaseConfigured) {
      // Delete in Supabase
      const res = await supabaseFetch(`/projects?id=eq.${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const errorMsg = await parseSupabaseError(res, "Supabase DELETE error");
        throw new Error(errorMsg);
      }

      return NextResponse.json({ success: true, message: "Project deleted successfully", source: "supabase" });
    } else {
      // Delete in local file
      const projects = ensureFileAndRead();
      const filteredProjects = projects.filter((p: any) => p.id !== id);

      if (projects.length === filteredProjects.length) {
        return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
      }

      writeLocalProjects(filteredProjects);
      return NextResponse.json({ success: true, message: "Project deleted successfully", source: "local" });
    }
  } catch (error: any) {
    console.error("Projects DELETE error:", error);
    return NextResponse.json({ 
      success: false, 
      error: `Failed to delete project: ${error.message || error}` 
    }, { status: 500 });
  }
}

