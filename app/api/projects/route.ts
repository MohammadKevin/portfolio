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
    title: "InvDocs",
    category: "Document Management System",
    type: "Fullstack",
    color: "from-blue-600 to-cyan-500",
    desc: "Sistem berkinerja tinggi yang dirancang untuk pengarsipan dan manajemen dokumentasi digital perusahaan dengan enkripsi file.",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma"]
  },
  {
    id: "project-2",
    title: "Kasir App",
    category: "Point of Sale System",
    type: "Fullstack",
    color: "from-indigo-600 to-blue-500",
    desc: "Sistem kasir offline-first lengkap dengan pembuatan faktur, pemantauan stok, dan laporan keuangan komprehensif.",
    tech: ["React.js", "Laravel", "MySQL", "Tailwind CSS"]
  },
  {
    id: "project-3",
    title: "Digital Archive",
    category: "Web Application",
    type: "Fullstack",
    color: "from-cyan-600 to-blue-600",
    desc: "Platform pengarsipan data publik dan catatan administratif, dibangun dengan fokus pada kecepatan respon dan keamanan berkas.",
    tech: ["Next.js", "Tailwind CSS", "Prisma", "MySQL"]
  },
  {
    id: "project-4",
    title: "Inventory Management System",
    category: "Backend Development",
    type: "Backend",
    color: "from-blue-700 to-indigo-600",
    desc: "RESTful API backend yang mendukung pelacakan barang real-time, peringatan batas stok otomatis, dan multi-warehouse logs.",
    tech: ["Node.js", "Express", "JWT", "PostgreSQL"]
  },
  {
    id: "project-5",
    title: "Portfolio Website",
    category: "Frontend Development",
    type: "Frontend",
    color: "from-blue-500 to-cyan-400",
    desc: "Website portofolio interaktif dengan desain gelap modern dan dynamic accent theme untuk menampilkan karya dengan representasi premium.",
    tech: ["Next.js", "Tailwind CSS v4", "TypeScript"]
  },
  {
    id: "project-6",
    title: "School Project Dashboard",
    category: "Dashboard UI",
    type: "Frontend",
    color: "from-slate-800 to-blue-900",
    desc: "Antarmuka dashboard kaya data untuk visualisasi metrik performa sekolah, statistik siswa, dan penjadwalan kelas.",
    tech: ["React.js", "Chart.js", "Tailwind CSS"]
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
        throw new Error(`Supabase error: ${res.statusText} (${res.status})`);
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
    const { title, category, type, color, desc, tech } = body;

    if (!title || !category || !type || !color || !desc || !tech) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const techArray = Array.isArray(tech) ? tech : tech.split(",").map((t: string) => t.trim()).filter(Boolean);
    const newId = Math.random().toString(36).substring(2, 9);

    if (isSupabaseConfigured) {
      // Insert to Supabase
      const newProject = {
        id: newId,
        title,
        category,
        type,
        color,
        desc,
        tech: techArray,
        created_at: new Date().toISOString()
      };
      
      const res = await supabaseFetch("/projects", {
        method: "POST",
        body: JSON.stringify([newProject]) // Array for POST in PostgREST
      });

      if (!res.ok) {
        throw new Error(`Supabase POST error: ${res.statusText} (${res.status})`);
      }
      
      const data = await res.json();
      return NextResponse.json({ success: true, project: data[0] || newProject, source: "supabase" });
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
        tech: techArray
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
    const { id, title, category, type, color, desc, tech } = body;

    if (!id || !title || !category || !type || !color || !desc || !tech) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const techArray = Array.isArray(tech) ? tech : tech.split(",").map((t: string) => t.trim()).filter(Boolean);

    if (isSupabaseConfigured) {
      // Update in Supabase
      const updatedProject = {
        title,
        category,
        type,
        color,
        desc,
        tech: techArray
      };

      const res = await supabaseFetch(`/projects?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedProject)
      });

      if (!res.ok) {
        throw new Error(`Supabase PATCH error: ${res.statusText} (${res.status})`);
      }

      const data = await res.json();
      return NextResponse.json({ success: true, project: data[0] || { id, ...updatedProject }, source: "supabase" });
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
        tech: techArray
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
        throw new Error(`Supabase DELETE error: ${res.statusText} (${res.status})`);
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
