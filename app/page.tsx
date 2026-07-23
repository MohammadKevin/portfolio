"use client";

import { useState, useEffect } from "react";
import * as emailjs from "@emailjs/browser";
import {
  Terminal,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Rocket,
  Search,
  Settings,
  Server,
  UserCheck,
  Wrench,
  AlertTriangle,
  Send,
  XCircle,
  Copy,
  GitCommit,
  GitBranch,
  Star,
  GitFork,
  Activity,
  FileText,
  Award,
  Play,
  Check,
  Download,
  ShieldCheck
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

import { whoamiData } from "@/data/whoami";
import { skillCategories } from "@/data/skills";
import { projectsData, Project } from "@/data/projects";
import { timelineLogs } from "@/data/timeline";
import { certificatesData } from "@/data/certificates";

const SERVICE_ID = "service_rmat5kp";
const TEMPLATE_ID = "template_zt9llkk";
const PUBLIC_KEY = "3qW5e407vXhAIdlX5";

export default function Home() {
  const [projectsList, setProjectsList] = useState<Project[]>(projectsData);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [githubLoading, setGithubLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("backend");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Resume Modal State
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Certificates State & Fetching
  const [certificatesList, setCertificatesList] = useState<any[]>(certificatesData);

  useEffect(() => {
    async function fetchLiveCertificates() {
      try {
        const res = await fetch("/api/certificates");
        const data = await res.json();
        if (data.success && Array.isArray(data.certificates) && data.certificates.length > 0) {
          setCertificatesList(data.certificates);
        }
      } catch (err) {
        console.error("Failed to fetch live certificates:", err);
      }
    }
    fetchLiveCertificates();
  }, []);

  // Fetch live projects from API / Supabase
  useEffect(() => {
    async function fetchLiveProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectsList(data.projects);
        }
      } catch (err) {
        console.error("Failed to fetch live projects:", err);
      }
    }
    fetchLiveProjects();
  }, []);

  // Fetch live GitHub Repositories
  useEffect(() => {
    async function fetchGithubData() {
      try {
        const res = await fetch("/api/github/repos?username=MohammadKevin");
        const data = await res.json();
        if (data.success && Array.isArray(data.repos)) {
          setGithubRepos(data.repos);
        }
      } catch (err) {
        console.error("Failed to fetch github repos:", err);
      } finally {
        setGithubLoading(false);
      }
    }
    fetchGithubData();
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      setErrorMessage("Harap isi semua kolom perintah sebelum mengirim.");
      return;
    }

    setFormStatus("loading");
    setErrorMessage("");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setFormStatus("error");
      setErrorMessage("Gagal mengirim pesan via terminal. Silakan coba via WhatsApp/Email langsung.");
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("kvn4.200581@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Filter projects
  const filteredProjects = projectsList.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      item.type.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.problem && item.problem.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#090d16] text-slate-300 relative overflow-hidden bg-grid-pattern selection:bg-amber-400/20 selection:text-amber-300">
      
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section id="hero" className="pt-32 pb-20 relative z-10 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Text & Identification */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-amber-400 font-bold">$ whoami --verbose</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-sans tracking-tight">
                Mohammad Kevin
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold">
                <span className="text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-500/30">
                  Backend & Fullstack Developer
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">SMK Telkom Malang</span>
              </div>

              <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed max-w-xl">
                Saya merancang arsitektur API yang aman, handal, dan berkinerja tinggi. Berspesialisasi dalam{" "}
                <span className="text-white font-mono font-semibold">Next.js, NestJS, Express, Prisma, PostgreSQL</span>, dan{" "}
                <span className="text-white font-mono font-semibold">MySQL</span> untuk sistem transaksi Kasir (POS) & Arsip Digital.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Rocket className="w-4 h-4" />
                  <span>$ ./contact.sh</span>
                </a>

                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/40 text-amber-400 font-semibold text-xs rounded transition-all focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>$ ./download_cv.sh</span>
                </button>
              </div>

              {/* Key Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-6 border-t border-slate-800/80">
                {whoamiData.stats.map((st) => (
                  <div key={st.label} className="flex flex-col gap-0.5 p-2 rounded bg-slate-900/50 border border-slate-800/60">
                    <span className="text-lg font-black text-amber-400">{st.value}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{st.label}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Col: Signature Visual Element (Neofetch / System Diagnostics Panel) */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-slate-700/80 bg-[#0d1117] shadow-2xl overflow-hidden font-mono text-xs">
                
                {/* IDE Window Header */}
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>neofetch --system-diagnostics</span>
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">
                    v2.4-stable
                  </div>
                </div>

                {/* Neofetch Content Body */}
                <div className="p-5 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  
                  {/* ASCII Logo / Portrait Box */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950/80 border border-slate-800 rounded-lg">
                    <pre className="text-[9px] leading-none font-bold text-amber-400 select-none">
{`  __  __ _  __
 |  \\/  | |/ /
 | |\\/| | ' / 
 | |  | | . \\ 
 |_|  |_|_|\\_\\`}
                    </pre>
                    <div className="mt-3 text-center">
                      <span className="text-white font-bold text-xs block">KEVIN.SYS</span>
                      <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">● ONLINE [ID: 9457]</span>
                    </div>
                  </div>

                  {/* Neofetch Key-Value Diagnostics */}
                  <div className="sm:col-span-7 flex flex-col gap-2 text-[11px]">
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                      <span className="text-amber-400 font-bold">OS:</span>
                      <span className="text-slate-200">DevKernel / Linux x86_64</span>
                    </div>
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                      <span className="text-amber-400 font-bold">HOST:</span>
                      <span className="text-slate-200">SMK Telkom Malang (ID)</span>
                    </div>
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                      <span className="text-amber-400 font-bold">ROLE:</span>
                      <span className="text-slate-200">Backend & Fullstack Dev</span>
                    </div>
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                      <span className="text-amber-400 font-bold">UPTIME:</span>
                      <span className="text-slate-200">2+ Years Active Coding</span>
                    </div>
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                      <span className="text-amber-400 font-bold">CORE:</span>
                      <span className="text-slate-200">Next, Nest, Express, Prisma</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">DB ENGINE:</span>
                      <span className="text-slate-200">PostgreSQL & MySQL</span>
                    </div>
                  </div>

                </div>

                {/* Interactive CLI Prompt Line */}
                <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">$</span>
                    <span className="text-slate-300">echo $STATUS</span>
                    <span className="text-slate-400">=&gt;</span>
                    <span className="text-emerald-400 font-bold">Ready for Freelance & Systems Collaboration</span>
                    <span className="inline-block w-2 h-4 bg-amber-400 animate-blink" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= ABOUT / WHOAMI SECTION ================= */}
      <section id="whoami" className="py-20 relative z-10 border-t border-slate-800/80 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-2 mb-10">
            <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest">
              <UserCheck className="w-4 h-4" />
              <span>$ cat whoami.md</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Tentang Saya & Filosofi Kode
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Main Narrative Terminal Window */}
            <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-[#0d1117] p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex flex-col gap-4 font-sans text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>
                  Halo! Saya <strong className="text-white font-mono">Mohammad Kevin</strong>, seorang Fullstack & Backend Developer yang menempuh pendidikan di <strong className="text-white font-mono">SMK Telkom Malang</strong>, berdomisili di Malang, Indonesia.
                </p>
                <p>
                  Fokus utama saya adalah membangun arsitektur API yang terstruktur dan scalable, mengoptimalkan query database relasional, serta menerjemahkan logika bisnis rumit menjadi antarmuka dashboard admin yang bersih dan responsif.
                </p>
                <p>
                  Selama 2 tahun terakhir, saya telah mengembangkan berbagai sistem transaksi keuangan seperti <strong className="text-amber-400 font-mono">Aplikasi Kasir (Point of Sale)</strong>, <strong className="text-amber-400 font-mono">Arsip Digital Dokumen</strong>, serta engine persediaan barang. Saya lebih menyukai solusi pragmatis dengan arsitektur modular daripada kode berlebihan.
                </p>
              </div>

              {/* Core Philosophy Code Snippet */}
              <div className="mt-6 p-4 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400">
                <div className="text-slate-500 mb-1">// philosophy.ts</div>
                <div className="text-amber-400">const devPhilosophy = &#123;</div>
                <div className="pl-4 text-slate-300">architecture: <span className="text-emerald-400">"Modular & Clean Code"</span>,</div>
                <div className="pl-4 text-slate-300">database: <span className="text-cyan-400">"Indexed & Query-Tuned"</span>,</div>
                <div className="pl-4 text-slate-300">stack: [<span className="text-amber-300">"Next.js"</span>, <span className="text-amber-300">"NestJS"</span>, <span className="text-amber-300">"Prisma"</span>, <span className="text-amber-300">"PostgreSQL"</span>]</div>
                <div className="text-amber-400">&#125;;</div>
              </div>
            </div>

            {/* Quick Specs Sidebar */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-[#0d1117] p-6 flex flex-col justify-between font-mono text-xs gap-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-amber-400 font-bold uppercase tracking-wider">
                <Server className="w-4 h-4" />
                <span>SYSTEM ENVIRONMENT</span>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">BASE LOCATION:</span>
                  <span className="text-white font-bold">Malang, Jawa Timur, Indonesia</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">INSTITUTION:</span>
                  <span className="text-white font-bold">SMK Telkom Malang (RPL)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">PRIMARY STACK:</span>
                  <span className="text-amber-400 font-bold">Next.js, NestJS, Express, Prisma</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">DATABASE ENGINE:</span>
                  <span className="text-cyan-400 font-bold">PostgreSQL & MySQL</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">SECONDARY STACK:</span>
                  <span className="text-slate-400">Laravel / PHP (Historical Monolith)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold">● FREELANCE AVAILABILITY</span>
                <span className="text-slate-400">OPEN</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= TECH STACK / SKILLS SECTION ================= */}
      <section id="stack" className="py-20 relative z-10 border-t border-slate-800/80 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-2 mb-10">
            <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest">
              <Settings className="w-4 h-4" />
              <span>$ cat .config/stack.json</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Tech Stack & Pencapaian Konkret
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-2xl">
              Fokus utama pada ekosistem TypeScript & Database relasional. Persentase indikatif diganti dengan fakta pencapaian nyata per kategori.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Nav: Skill Category Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {skillCategories.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? "bg-amber-400/10 border-amber-500/40 text-amber-400 shadow-lg"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-slate-500 uppercase">{cat.cmd}</span>
                      <h3 className="font-bold text-sm text-white font-sans">{cat.title}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {isActive ? "&gt;" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Panel: Selected Skill Group Details */}
            <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-[#0d1117] p-6 sm:p-8 flex flex-col gap-6">
              
              {/* Category Header */}
              <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-white font-sans">
                    {skillCategories.find((c) => c.id === activeTab)?.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {skillCategories.find((c) => c.id === activeTab)?.cmd}
                  </span>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillCategories
                  .find((c) => c.id === activeTab)
                  ?.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded bg-slate-950 border border-slate-800 flex flex-col gap-1.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-sans">{skill.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                          skill.levelTag === "CORE STACK"
                            ? "bg-amber-400/10 border-amber-500/30 text-amber-400"
                            : skill.levelTag === "PRIMARY"
                            ? "bg-cyan-400/10 border-cyan-500/30 text-cyan-400"
                            : "bg-slate-800 border-slate-700 text-slate-400"
                        }`}>
                          {skill.levelTag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug font-sans">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Concrete Achievements Box */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pencapaian & Hasil Implementasi Konkret</span>
                </div>
                <ul className="flex flex-col gap-2 font-sans text-xs text-slate-300">
                  {skillCategories
                    .find((c) => c.id === activeTab)
                    ?.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-amber-400 font-mono font-bold mt-0.5">&gt;</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= FEATURED PROJECTS SECTION ================= */}
      <section id="projects" className="py-20 relative z-10 border-t border-slate-800/80 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">
                <Code2 className="w-4 h-4" />
                <span>$ ./fetch_projects.sh --status=deployed</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
                Portofolio Proyek Terstruktur
              </h2>
            </div>

            {/* Filter Buttons & Search */}
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Backend", "Frontend", "Fullstack"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    activeCategory === cat
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  --{cat.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-md">
            <input
              type="text"
              placeholder="Filter nama proyek, stack, atau masalah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded bg-slate-900 border border-slate-800 focus:outline-none focus:border-amber-400 text-xs text-white placeholder-slate-500 font-mono"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredProjects.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-800 bg-[#0d1117] hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-6 relative overflow-hidden group h-full"
                >
                  {/* Top Gradient Bar Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color && item.color.includes('from-') ? item.color : 'from-amber-500 to-yellow-500'} opacity-75 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex-1 flex flex-col justify-between gap-4">
                    
                    <div className="flex flex-col gap-3">
                      {/* Card Header Tag */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                          {item.category}
                        </span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {item.type}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white font-sans tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2 min-h-[2.5rem]">
                        {item.desc}
                      </p>

                      {/* Problem Solved */}
                      {item.problem && (
                        <div className="p-3 rounded bg-slate-950 border border-slate-800/80 flex flex-col gap-1 text-xs">
                          <span className="text-[10px] text-rose-400 font-bold uppercase">$ problem.log:</span>
                          <p className="text-slate-300 font-sans text-[11px] leading-snug line-clamp-2">
                            {item.problem}
                          </p>
                        </div>
                      )}

                      {/* Impact / Results */}
                      {item.impact && (
                        <div className="p-3 rounded bg-slate-950 border border-slate-800/80 flex flex-col gap-1 text-xs">
                          <span className="text-[10px] text-emerald-400 font-bold uppercase">$ impact.metric:</span>
                          <p className="text-slate-300 font-sans text-[11px] leading-snug line-clamp-2">
                            {item.impact}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Card Actions (Live Demo & Source Code - Pinned to bottom) */}
                  <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      {item.demoUrl && item.demoUrl.length > 0 && (
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {item.repoUrl && item.repoUrl.length > 0 && (
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-all focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          Source Code
                        </a>
                      )}
                    </div>

                    <a
                      href="#contact"
                      className="text-[11px] font-bold text-amber-400 hover:underline"
                    >
                      $ detail --info
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0d1117] rounded-xl border border-slate-800">
              <Search className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-sans">Tidak ada proyek yang sesuai dengan kriteria pencarian.</p>
            </div>
          )}

        </div>
      </section>


      {/* ================= GITHUB ACTIVITY & REPOSITORIES SECTION ================= */}
      <section id="github" className="py-20 relative z-10 border-t border-slate-800/80 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">
                <GithubIcon className="w-4 h-4" />
                <span>$ git log --author=MohammadKevin --stat --graph</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
                Aktivitas & Repositori GitHub
              </h2>
            </div>
            <a
              href="https://github.com/MohammadKevin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-semibold border border-slate-800 hover:border-amber-400/40 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <GithubIcon className="w-4 h-4" />
              <span>@MohammadKevin di GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Activity Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0d1117] flex items-center gap-4 shadow-lg">
              <div className="p-3 rounded-lg bg-amber-400/10 border border-amber-500/20 text-amber-400">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white">{githubRepos.length > 0 ? githubRepos.length : "66+"}</span>
                <span className="text-xs text-slate-400 block font-sans">Repositori Publik Aktif</span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-[#0d1117] flex items-center gap-4 shadow-lg">
              <div className="p-3 rounded-lg bg-emerald-400/10 border border-emerald-500/20 text-emerald-400">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white">Fullstack & Backend</span>
                <span className="text-xs text-slate-400 block font-sans">Fokus Utama Pengembang</span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-[#0d1117] flex items-center gap-4 shadow-lg">
              <div className="p-3 rounded-lg bg-cyan-400/10 border border-cyan-500/20 text-cyan-400">
                <GitCommit className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white">Continuous Dev</span>
                <span className="text-xs text-slate-400 block font-sans">Aktivitas Commit & Open Source</span>
              </div>
            </div>
          </div>

          {/* Contribution Heatmap Container */}
          <div className="rounded-xl border border-slate-800 bg-[#0d1117] p-6 mb-10 shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <GitBranch className="w-4 h-4 text-amber-400" />
                <span>Peta Kontribusi Commit GitHub (Contribution Heatmap)</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">● LIVE ACTIVITY</span>
            </div>
            
            {/* Heatmap Image Widget */}
            <div className="overflow-x-auto py-2 flex justify-center">
              <img
                src="https://ghchart.rshah.org/451a03/MohammadKevin"
                alt="MohammadKevin's GitHub Contribution Graph"
                className="max-w-full h-auto min-w-[650px] filter contrast-125 brightness-110"
              />
            </div>
          </div>

          {/* GitHub Repositories Grid Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white font-sans">Repositori GitHub Terbaru</h3>
            <span className="text-xs text-slate-400 font-mono">Diperbarui secara otomatis via GitHub API</span>
          </div>

          {githubLoading ? (
            <div className="text-center py-12 bg-[#0d1117] rounded-xl border border-slate-800">
              <p className="text-xs text-amber-400 animate-pulse">$ loading --github-repos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {githubRepos.slice(0, 6).map((repo) => (
                <div
                  key={repo.id}
                  className="rounded-xl border border-slate-800 bg-[#0d1117] hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between p-5 group h-full"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:text-amber-400 transition-colors">
                        <Code2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="truncate max-w-[180px]">{repo.name}</span>
                      </div>
                      {repo.language && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-mono">
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {repo.description || "Repositori proyek pengembangan backend / fullstack oleh Mohammad Kevin."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400" />
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-slate-400" />
                          {repo.forks}
                        </span>
                      )}
                    </div>

                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline font-bold"
                    >
                      <span>Lihat Repo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>


      {/* ================= CERTIFICATES & CREDENTIALS SECTION ================= */}
      <section id="certificates" className="py-20 relative z-10 border-t border-slate-800/80 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">
                <Award className="w-4 h-4" />
                <span>$ cat /sys/credentials --verified</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
                Sertifikasi & Kredensial Professional
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificatesList.map((cert) => (
              <div
                key={cert.id}
                className="rounded-xl border border-slate-800 bg-[#0d1117] hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between p-6 shadow-xl group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                      {cert.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans group-hover:text-amber-400 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans">
                    {cert.issuer}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skills.map((s) => (
                      <span key={s} className="text-[10px] text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {cert.credentialUrl && (
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-bold"
                    >
                      <span>Verifikasi Kredensial</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================= TIMELINE / EXPERIENCE SECTION ================= */}
      <section id="timeline" className="py-20 relative z-10 border-t border-slate-800/80 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-2 mb-12">
            <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>$ git log --graph --oneline --timeline</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Timeline Pengalaman & Reamur Karir
            </h2>
          </div>

          <div className="flex flex-col gap-6 relative">
            
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-6 top-4 bottom-4 w-0.5 bg-slate-800 z-0" />

            {timelineLogs.map((log) => (
              <div
                key={log.commitHash}
                className="relative z-10 pl-10 sm:pl-14 flex flex-col gap-2 group"
              >
                {/* Node Commit Icon */}
                <div className="absolute left-2.5 sm:left-4.5 top-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 transition-transform" />

                <div className="rounded-xl border border-slate-800 bg-[#0d1117] p-5 sm:p-6 flex flex-col gap-3 shadow-lg">
                  
                  {/* Log Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold text-xs">{log.commitHash}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-xs text-slate-300 font-bold font-sans">{log.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">{log.period}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                        log.tag === "PRODUCTION"
                          ? "bg-emerald-400/10 border-emerald-500/30 text-emerald-400"
                          : "bg-blue-400/10 border-blue-500/30 text-blue-400"
                      }`}>
                        {log.tag}
                      </span>
                    </div>
                  </div>

                  {/* Summary & Achievements */}
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {log.summary}
                  </p>

                  <ul className="flex flex-col gap-1.5 font-sans text-xs text-slate-400 mt-1">
                    {log.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-mono font-bold text-[10px] mt-0.5">&gt;</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {log.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="py-20 relative z-10 border-t border-slate-800/80 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>$ ./contact.sh</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
                  Hubungi Saya
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-sans mt-2 leading-relaxed">
                  Tertarik untuk bekerja sama membangun sistem POS, pengarsipan digital, atau integrasi API backend? Kirim pesan langsung via terminal ini atau melalui kontak sosial berikut.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="flex flex-col gap-3 font-mono text-xs">
                
                {/* Email */}
                <div className="p-3.5 rounded bg-[#0d1117] border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">EMAIL:</span>
                      <a href="mailto:kvn4.200581@gmail.com" className="text-white hover:text-amber-400 font-bold">
                        kvn4.200581@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmailToClipboard}
                    className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 focus-visible:ring-1 focus-visible:ring-amber-400"
                    title="Salin Email"
                  >
                    {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/6282131588846"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded bg-[#0d1117] border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">WHATSAPP:</span>
                      <span className="text-white font-bold">+62 821-3158-8846</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs">&gt; Send WA</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/mohammad-kevin-arif-rudianto-945733347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded bg-[#0d1117] border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">LINKEDIN:</span>
                      <span className="text-white font-bold">mohammad-kevin-arif-rudianto</span>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-bold text-xs">&gt; Connect</span>
                </a>

              </div>
            </div>

            {/* Right: Terminal Form */}
            <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#0d1117] p-6 sm:p-8 shadow-2xl">
              
              <div className="pb-4 border-b border-slate-800 flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">EXECUTE: ./send-message.py</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase">INTERACTIVE STDIN</span>
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-mono text-xs">
                
                <div>
                  <label className="text-[11px] text-amber-400 font-bold block mb-1.5">
                    $ set INPUT_NAME =
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama Lengkap Anda..."
                    className="w-full px-4 py-2.5 rounded bg-slate-950 border border-slate-800 focus:outline-none focus:border-amber-400 text-white font-sans text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] text-amber-400 font-bold block mb-1.5">
                    $ set INPUT_EMAIL =
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@domain.com..."
                    className="w-full px-4 py-2.5 rounded bg-slate-950 border border-slate-800 focus:outline-none focus:border-amber-400 text-white font-sans text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] text-amber-400 font-bold block mb-1.5">
                    $ set INPUT_MESSAGE =
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Jelaskan kebutuhan proyek atau pertanyaan Anda..."
                    className="w-full px-4 py-2.5 rounded bg-slate-950 border border-slate-800 focus:outline-none focus:border-amber-400 text-white font-sans text-xs resize-none"
                    required
                  />
                </div>

                {/* Status Alerts */}
                {formStatus === "error" && (
                  <div className="p-3 rounded bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {formStatus === "success" && (
                  <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Pesan berhasil terkirim! Saya akan segera merespons email Anda.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/10 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"
                >
                  {formStatus === "loading" ? (
                    <span>[RUNNING SYSTEM SCRIPT...]</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>$ ./send-message.py --submit</span>
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* ================= RESUME / CV DOWNLOAD MODAL ================= */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-mono">
          <div className="bg-[#0d1117] border border-slate-800 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>$ cat /usr/kevin/resume.pdf</span>
              </div>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 flex flex-col gap-6 text-xs text-slate-300 font-sans leading-relaxed">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                <div>
                  <h3 className="text-base font-bold text-white font-sans">Mohammad Kevin Arif Rudianto</h3>
                  <p className="text-xs text-amber-400 font-mono mt-0.5">Backend & Fullstack Developer | SMK Telkom Malang</p>
                </div>
                <a
                  href="/resume.pdf"
                  download="CV_Mohammad_Kevin_Backend_Developer.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md focus-visible:ring-2 focus-visible:ring-white shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ringkasan Kualifikasi Utama</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-1 font-sans">
                  <li>2+ tahun pengalaman intensif membangun RESTful API & arsitektur sistem backend.</li>
                  <li>Menguasai Next.js, NestJS, Express.js, Prisma ORM, PostgreSQL, dan MySQL.</li>
                  <li>Spesialisasi dalam pengarsipan dokumen digital, sistem kasir (POS), dan optimasi query database.</li>
                  <li>Siswa SMK Telkom Malang dengan rekam jejak pengerjaan proyek real-world terstruktur.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono flex items-center justify-between">
                <span className="text-slate-400">Hubungi langsung untuk penawaran proyek / karir:</span>
                <a href="#contact" onClick={() => setIsResumeModalOpen(false)} className="text-amber-400 font-bold hover:underline">
                  $ ./contact.sh &rarr;
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}