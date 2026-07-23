"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Folder,
  Eye,
  Activity,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  X,
  Search,
  Sparkles,
  Terminal,
  Grid,
  ChevronRight,
  Database,
  Smartphone,
  Laptop,
  Monitor,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  type: string;
  color: string;
  desc: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
}

interface Visitor {
  id: string;
  timestamp: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  userAgent: string;
}

const colorGradients = [
  { label: "Blue to Cyan", value: "from-blue-600 to-cyan-500", bg: "bg-gradient-to-r from-blue-600 to-cyan-500" },
  { label: "Indigo to Blue", value: "from-indigo-600 to-blue-500", bg: "bg-gradient-to-r from-indigo-600 to-blue-500" },
  { label: "Cyan to Blue", value: "from-cyan-600 to-blue-600", bg: "bg-gradient-to-r from-cyan-600 to-blue-600" },
  { label: "Blue to Indigo", value: "from-blue-700 to-indigo-600", bg: "bg-gradient-to-r from-blue-700 to-indigo-600" },
  { label: "Blue to Green", value: "from-blue-500 to-emerald-400", bg: "bg-gradient-to-r from-blue-500 to-emerald-400" },
  { label: "Purple to Pink", value: "from-purple-600 to-pink-500", bg: "bg-gradient-to-r from-purple-600 to-pink-500" },
  { label: "Rose to Red", value: "from-rose-600 to-red-500", bg: "bg-gradient-to-r from-rose-600 to-red-500" },
  { label: "Orange to Red", value: "from-orange-500 to-red-600", bg: "bg-gradient-to-r from-orange-500 to-red-600" },
  { label: "Slate to Navy", value: "from-slate-800 to-blue-900", bg: "bg-gradient-to-r from-slate-800 to-blue-900" },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "analytics">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  
  // Project Form States
  const [isEditing, setIsEditing] = useState(false);
  const [formId, setFormId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formType, setFormType] = useState("Fullstack");
  const [formColor, setFormColor] = useState("from-blue-600 to-cyan-500");
  const [formDesc, setFormDesc] = useState("");
  const [formTech, setFormTech] = useState("");
  const [formDemoUrl, setFormDemoUrl] = useState("");
  const [formRepoUrl, setFormRepoUrl] = useState("");

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisitorQuery, setSearchVisitorQuery] = useState("");
  const [visitorFilterDevice, setVisitorFilterDevice] = useState("All");

  // Notifications (Toast)
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | null }>({ msg: "", type: null });
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Authenticate on Load
  useEffect(() => {
    if (sessionStorage.getItem("kevin-analytics-auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Projects if Authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchProjects();
  }, [isAuthenticated]);

  // Fetch Analytics if Tab Active
  useEffect(() => {
    if (!isAuthenticated || activeTab !== "analytics") return;
    fetchAnalytics();
  }, [isAuthenticated, activeTab]);

  const showToast = (msg: string, type: "success" | "error") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3500);
  };

  const fetchProjects = () => {
    setLoadingProjects(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.projects);
        } else {
          showToast(data.error || "Gagal mengambil data proyek", "error");
        }
      })
      .catch((err) => {
        console.error("Fetch projects error:", err);
        showToast("Error koneksi server", "error");
      })
      .finally(() => setLoadingProjects(false));
  };

  const fetchAnalytics = () => {
    setLoadingAnalytics(true);
    fetch("/api/visit")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVisitors(data.visitors);
        } else {
          showToast(data.error || "Gagal mengambil data analitik", "error");
        }
      })
      .catch((err) => {
        console.error("Fetch analytics error:", err);
        showToast("Error koneksi server", "error");
      })
      .finally(() => setLoadingAnalytics(false));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "kevin" && password === "kevin135") {
      sessionStorage.setItem("kevin-analytics-auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
      showToast("Selamat datang kembali, Kevin!", "success");
    } else {
      setLoginError("Username atau password salah!");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("kevin-analytics-auth");
    setIsAuthenticated(false);
    showToast("Berhasil keluar dari sesi admin.", "success");
  };

  const handleFormReset = () => {
    setIsEditing(false);
    setFormId("");
    setFormTitle("");
    setFormCategory("");
    setFormType("Fullstack");
    setFormColor("from-blue-600 to-cyan-500");
    setFormDesc("");
    setFormTech("");
    setFormDemoUrl("");
    setFormRepoUrl("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formCategory.trim() || !formDesc.trim() || !formTech.trim()) {
      showToast("Mohon isi semua kolom formulir wajib.", "error");
      return;
    }

    const payload = {
      id: formId || undefined,
      title: formTitle,
      category: formCategory,
      type: formType,
      color: formColor,
      desc: formDesc,
      tech: formTech.split(",").map((t) => t.trim()).filter(Boolean),
      demoUrl: formDemoUrl.trim(),
      repoUrl: formRepoUrl.trim(),
    };

    const url = "/api/projects";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        showToast(isEditing ? "Proyek berhasil diperbarui!" : "Proyek baru berhasil diunggah!", "success");
        handleFormReset();
        fetchProjects();
      } else {
        showToast(data.error || "Gagal menyimpan proyek", "error");
      }
    } catch (err) {
      console.error("Save error:", err);
      showToast("Gagal menyimpan. Cek jaringan Anda.", "error");
    }
  };

  const handleEditClick = (project: Project) => {
    setIsEditing(true);
    setFormId(project.id);
    setFormTitle(project.title);
    setFormCategory(project.category);
    setFormType(project.type);
    setFormColor(project.color);
    setFormDesc(project.desc);
    setFormTech(project.tech.join(", "));
    setFormDemoUrl(project.demoUrl || "");
    setFormRepoUrl(project.repoUrl || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        showToast("Proyek berhasil dihapus!", "success");
        fetchProjects();
      } else {
        showToast(data.error || "Gagal menghapus proyek", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Gagal menghapus. Cek jaringan Anda.", "error");
    }
  };

  // Filters projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Filters visitors
  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      v.ip.includes(searchVisitorQuery) ||
      v.os.toLowerCase().includes(searchVisitorQuery.toLowerCase()) ||
      v.browser.toLowerCase().includes(searchVisitorQuery.toLowerCase()) ||
      v.userAgent.toLowerCase().includes(searchVisitorQuery.toLowerCase());
    const matchesDevice = visitorFilterDevice === "All" || v.device === visitorFilterDevice;
    return matchesSearch && matchesDevice;
  });

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return isoString;
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device === "Desktop") return <Laptop className="w-4 h-4 text-sky-400" />;
    if (device === "Mobile") return <Smartphone className="w-4 h-4 text-emerald-400" />;
    return <Monitor className="w-4 h-4 text-amber-400" />;
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#030712] text-foreground flex items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-[15%] left-[-10%] w-[30rem] h-[30rem] bg-primary/10 glow-blob animate-glow-1" />
        <div className="absolute bottom-[15%] right-[-10%] w-[30rem] h-[30rem] bg-secondary/10 glow-blob animate-glow-2" />

        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary mb-4 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
              Kembali ke Portfolio
            </Link>
            <h1 className="text-3xl font-black text-white tracking-tight">Admin Console</h1>
            <p className="text-xs text-gray-400 mt-1.5">Masukkan kredensial Kevin untuk mengelola portofolio.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
              <input
                type="text"
                required
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-white bg-slate-950/60 focus:bg-slate-950 transition-all w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-white bg-slate-950/60 focus:bg-slate-950 transition-all w-full"
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4.5 bg-gradient-to-r from-primary to-secondary text-gray-950 font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer text-center text-sm"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-foreground pt-12 pb-16 relative overflow-hidden font-sans">
      <div className="absolute top-[5%] left-[-15%] w-[35rem] h-[35rem] bg-primary/10 glow-blob animate-glow-1" />
      <div className="absolute bottom-[10%] right-[-15%] w-[40rem] h-[40rem] bg-secondary/10 glow-blob animate-glow-2" />

      {/* Floating Toast notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 flex items-center gap-3 ${
          toastVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90 pointer-events-none"
        } ${toast.type === "success" ? "bg-primary border border-primary/30" : "bg-rose-600 border border-rose-500/30"}`}
      >
        {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
        <span>{toast.msg}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 border border-white/10 hover:border-primary text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <h1 className="text-3xl font-extrabold text-white leading-tight">Developer Dashboard</h1>
                <p className="text-xs text-gray-400 mt-0.5">Pusat kendali portofolio dan pemantauan analitik Mohammad Kevin.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (activeTab === "projects") fetchProjects();
                else fetchAnalytics();
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-white/10 hover:border-primary hover:text-primary rounded-xl text-xs font-bold text-white transition-all cursor-pointer"
            >
              Segarkan Data
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-950/20 border border-rose-500/25 text-rose-400 hover:bg-rose-500 hover:text-gray-950 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1.5 bg-slate-950/60 border border-white/5 rounded-2xl w-fit mb-10">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "projects" ? "bg-primary text-gray-950 shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            <Folder className="w-4 h-4" />
            Upload & Edit Proyek
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "analytics" ? "bg-primary text-gray-950 shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="w-4 h-4" />
            Analitik Pengunjung
          </button>
        </div>

        {/* CONTENT TABS */}
        {activeTab === "projects" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FORM UPLOAD (Left - 5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col gap-6 relative">
              <div className="border-b border-white/5 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {isEditing ? "Edit Proyek" : "Upload Proyek Baru"}
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-1">Data ini langsung disinkronkan ke halaman utama.</p>
                </div>
                {isEditing && (
                  <button
                    onClick={handleFormReset}
                    className="p-1 rounded-lg bg-white/5 hover:bg-rose-950/40 text-gray-400 hover:text-rose-400 transition-colors"
                    title="Batalkan Edit"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Judul Proyek *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kasir App"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sub-kategori *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: POS System"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tipe Proyek *</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60"
                    >
                      <option value="Fullstack">Fullstack</option>
                      <option value="Backend">Backend</option>
                      <option value="Frontend">Frontend</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Skema Gradien Warna *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorGradients.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setFormColor(g.value)}
                        className={`h-10 rounded-xl relative border flex items-center justify-center text-[9px] font-bold text-white tracking-tight overflow-hidden transition-all ${
                          formColor === g.value ? "border-primary ring-2 ring-primary/45" : "border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className={`absolute inset-0 opacity-80 ${g.bg}`} />
                        <span className="relative z-10 px-1 text-center bg-black/40 rounded py-0.5">{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Deskripsi Proyek *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Sistem kasir offline-first lengkap dengan faktur dan pemantauan stok..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60 resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Teknologi (Pisahkan koma) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="React.js, Laravel, MySQL, Tailwind CSS"
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60"
                  />
                  <span className="text-[9px] text-gray-500">Masukkan nama teknologi dipisahkan dengan tanda koma.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Live Demo URL (Opsional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://demo-app.com"
                      value={formDemoUrl}
                      onChange={(e) => setFormDemoUrl(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Source Code URL (Opsional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/user/repo"
                      value={formRepoUrl}
                      onChange={(e) => setFormRepoUrl(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 bg-gradient-to-r from-primary to-secondary text-gray-950 font-bold rounded-xl shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider"
                >
                  {isEditing ? "Perbarui Proyek" : "Upload Proyek"}
                </button>
              </form>

              {/* CARD PREVIEW */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Live Card Preview</span>
                <div className="relative group bg-slate-900/40 border border-white/5 rounded-3xl shadow-lg p-0 flex flex-col h-64 overflow-hidden">
                  <div className={`h-full bg-gradient-to-br ${formColor} p-6 flex flex-col justify-between overflow-hidden relative z-0`}>
                    <div className="absolute inset-0 bg-[#030712]/45 backdrop-blur-[1px]" />
                    
                    <span className="relative z-10 text-[10px] font-bold text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/10 uppercase tracking-wider">
                      {formCategory || "Kategori"}
                    </span>

                    <div className="relative z-10 flex flex-col gap-1">
                      <h3 className="text-xl font-extrabold text-white leading-tight">{formTitle || "Judul Proyek"}</h3>
                      <span className="text-[10px] text-primary font-semibold flex items-center gap-1 opacity-80">
                        {formType} Developer
                      </span>
                      <p className="text-[10px] text-gray-300 leading-snug line-clamp-2 mt-1">
                        {formDesc || "Deskripsi proyek Anda akan muncul di bagian ini ketika Anda mulai mengetik."}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {formTech.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 3).map((techName) => (
                          <span key={techName} className="text-[8px] text-gray-300 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                            {techName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LIST PROJECT (Right - 7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col gap-6">
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Grid className="w-5 h-5 text-secondary" />
                    Proyek Aktif ({projects.length})
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-1">Daftar semua proyek yang saat ini tampil di portofolio.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Cari proyek..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-9 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Projects Grid */}
              {loadingProjects ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                  <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span className="text-xs">Memuat daftar proyek...</span>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      className="border border-white/5 bg-slate-950/40 rounded-2xl p-5 hover:border-primary/20 transition-all flex flex-col justify-between h-48"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{p.category}</span>
                          <span className="text-[9px] font-semibold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                            {p.type}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white leading-tight">{p.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{p.desc}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3">
                        <div className="flex flex-wrap gap-1 max-w-[60%]">
                          {p.tech.slice(0, 2).map((t) => (
                            <span key={t} className="text-[8px] bg-slate-900 border border-white/5 px-1.5 py-0.5 rounded text-gray-400">
                              {t}
                            </span>
                          ))}
                          {p.tech.length > 2 && <span className="text-[7px] text-gray-500">+{p.tech.length - 2}</span>}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-primary hover:text-primary text-gray-400 transition-all"
                            title="Edit Proyek"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p.id, p.title)}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-rose-500 hover:text-rose-500 text-gray-400 transition-all"
                            title="Hapus Proyek"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white/[0.01] rounded-2xl border border-white/5">
                  <Search className="w-8 h-8 text-gray-500 mx-auto" />
                  <h3 className="text-sm font-bold text-white mt-3">Tidak Ada Proyek</h3>
                  <p className="text-xs text-gray-400 mt-1.5 px-6">
                    Mulai upload proyek baru menggunakan formulir di sebelah kiri.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ANALYTICS TAB CONTENT */
          <div className="flex flex-col gap-8">
            
            {/* STATS PANEL */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Total Kunjungan</span>
                <div className="text-4xl font-black text-white mt-2">{visitors.length}</div>
                <p className="text-[10px] text-gray-500 mt-1">Jumlah tayangan halaman utama</p>
              </div>

              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Desktop</span>
                <div className="text-4xl font-black text-white mt-2">
                  {visitors.filter((v) => v.device === "Desktop").length}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Kunjungan via PC / Laptop (
                  {visitors.length
                    ? Math.round((visitors.filter((v) => v.device === "Desktop").length / visitors.length) * 100)
                    : 0}
                  %)
                </p>
              </div>

              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Mobile</span>
                <div className="text-4xl font-black text-white mt-2">
                  {visitors.filter((v) => v.device === "Mobile").length}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Kunjungan via Smartphone (
                  {visitors.length
                    ? Math.round((visitors.filter((v) => v.device === "Mobile").length / visitors.length) * 100)
                    : 0}
                  %)
                </p>
              </div>

              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Tablet & Lainnya</span>
                <div className="text-4xl font-black text-white mt-2">
                  {visitors.filter((v) => v.device !== "Desktop" && v.device !== "Mobile").length}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Kunjungan via perangkat lain (
                  {visitors.length
                    ? Math.round(
                        (visitors.filter((v) => v.device !== "Desktop" && v.device !== "Mobile").length /
                          visitors.length) *
                          100
                      )
                    : 0}
                  %)
                </p>
              </div>
            </div>

            {/* VISITOR LOGS TABLE */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col gap-6">
              
              {/* Filter visitor */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    Log Kunjungan Terbaru
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-1">Detil logs 1000 kunjungan terakhir ke portofolio Anda.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <select
                    value={visitorFilterDevice}
                    onChange={(e) => setVisitorFilterDevice(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-white/5 text-xs text-white bg-slate-950/60 focus:outline-none"
                  >
                    <option value="All">Semua Perangkat</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tablet">Tablet</option>
                  </select>

                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Cari IP, OS, Browser..."
                      value={searchVisitorQuery}
                      onChange={(e) => setSearchVisitorQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-9 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs text-white bg-slate-950/60"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {loadingAnalytics ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                  <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span className="text-xs">Memuat logs analitik...</span>
                </div>
              ) : filteredVisitors.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 uppercase tracking-wider font-semibold">
                        <th className="py-3 px-4">Waktu</th>
                        <th className="py-3 px-4">IP Address</th>
                        <th className="py-3 px-4">Alat</th>
                        <th className="py-3 px-4">Sistem Operasi</th>
                        <th className="py-3 px-4">Browser</th>
                        <th className="py-3 px-4 max-w-xs truncate">User Agent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {filteredVisitors.slice(0, 100).map((v) => (
                        <tr key={v.id} className="hover:bg-white/[0.02] transition-all">
                          <td className="py-3.5 px-4 font-medium text-white">{formatDate(v.timestamp)}</td>
                          <td className="py-3.5 px-4 font-mono">{v.ip}</td>
                          <td className="py-3.5 px-4">
                            <span className="flex items-center gap-1.5">
                              {getDeviceIcon(v.device)}
                              {v.device}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">{v.os}</td>
                          <td className="py-3.5 px-4">{v.browser}</td>
                          <td className="py-3.5 px-4 max-w-xs truncate text-[10px] text-gray-500" title={v.userAgent}>
                            {v.userAgent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredVisitors.length > 100 && (
                    <div className="text-center text-[10px] text-gray-500 mt-4">
                      Menampilkan 100 dari {filteredVisitors.length} logs pengunjung.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 bg-white/[0.01] rounded-2xl border border-white/5">
                  <Search className="w-8 h-8 text-gray-500 mx-auto" />
                  <h3 className="text-sm font-bold text-white mt-3">Tidak Ada Data Kunjungan</h3>
                  <p className="text-xs text-gray-400 mt-1.5 px-6">
                    Belum ada data yang cocok dengan kriteria pencarian Anda.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
