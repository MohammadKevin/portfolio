"use client";

import { useState, useRef, useEffect } from "react";
import * as emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_rmat5kp";
const TEMPLATE_ID = "template_zt9llkk";
const PUBLIC_KEY  = "q_nuzyb4WLIy6kboy";

const stats = [
  { value: "2 Tahun", label: "Pengalaman Kerja" },
  { value: "35+", label: "Proyek Selesai" },
];

const skillCategories = [
  {
    id: "backend",
    name: "Backend Development",
    icon: "⚙️",
    skills: [
      { name: "Node.js & Express.js", level: 90 },
      { name: "Laravel (PHP)", level: 65 },
      { name: "RESTful API Design", level: 92 },
      { name: "Autentikasi (JWT, OAuth)", level: 88 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "💻",
    skills: [
      { name: "React.js & Next.js", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "Responsive Design", level: 95 },
    ],
  },
  {
    id: "database",
    name: "Database Management",
    icon: "🗄️",
    skills: [
      { name: "MySQL", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "Prisma ORM", level: 85 },
      { name: "Query Optimization", level: 80 },
    ],
  },
  {
    id: "tools",
    name: "Development Tools",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Postman & API Testing", level: 90 },
      { name: "Figma (UI Design)", level: 65 },
    ],
  },
];

const services = [
  {
    title: "Backend API Architecture",
    desc: "Mendesain dan memprogram RESTful & GraphQL API yang aman, modular, dan cepat dengan integrasi JWT/OAuth, rate limiting, dan dokumentasi OpenAPI.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Fullstack Web Apps",
    desc: "Membangun sistem web interaktif berkinerja tinggi menggunakan React.js dan Next.js yang terhubung mulus dengan database dan server eksternal.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Database Optimization",
    desc: "Merancang skema database relasional (normalization), optimasi indeks query SQL, caching, dan manajemen ORM (Prisma/Sequelize) untuk data skala menengah.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "System Integration",
    desc: "Menghubungkan layanan pihak ketiga (payment gateway, mailer, SMS), integrasi file storage cloud, serta mendeploy aplikasi ke Linux VPS.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
  },
];

const timelineItems = [
  {
    period: "2024 - Sekarang",
    role: "Fullstack & Backend Developer (Freelance)",
    company: "Klien & Usaha Lokal",
    desc: "Mendesain dan mengembangkan solusi web kustom seperti Point of Sale offline-first dengan sinkronisasi otomatis, aplikasi pengarsipan digital tingkat instansi, dan manajemen logistik.",
    tech: ["Next.js", "Laravel", "MySQL", "PostgreSQL", "Tailwind CSS"],
  },
  {
    period: "2023 - 2024",
    role: "Backend Specialist Partner",
    company: "Kolaborasi Tim Proyek",
    desc: "Fokus pada arsitektur API backend yang scalable, mengimplementasikan sistem multi-warehouse inventory tracker, merancang keamanan JWT auth, dan mempercepat respons query SQL hingga 40%.",
    tech: ["Node.js", "Express.js", "Prisma ORM", "MySQL", "Postman"],
  },
  {
    period: "2022 - 2023",
    role: "Self-Taught Developer Study",
    company: "Eksplorasi Mandiri",
    desc: "Mempelajari rekayasa perangkat lunak dasar, struktur algoritma pemrograman web terstruktur (PHP & JavaScript), serta konfigurasi server database lokal.",
    tech: ["PHP", "JavaScript", "Bootstrap", "MySQL", "Git"],
  },
];

const portfolioItems = [
  {
    title: "InvDocs",
    category: "Document Management System",
    type: "Fullstack",
    color: "from-blue-600 to-cyan-500",
    desc: "Sistem berkinerja tinggi yang dirancang untuk pengarsipan dan manajemen dokumentasi digital perusahaan dengan enkripsi file.",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma"],
  },
  {
    title: "Kasir App",
    category: "Point of Sale System",
    type: "Fullstack",
    color: "from-indigo-600 to-blue-500",
    desc: "Sistem kasir offline-first lengkap dengan pembuatan faktur, pemantauan stok, dan laporan keuangan komprehensif.",
    tech: ["React.js", "Laravel", "MySQL", "Tailwind CSS"],
  },
  {
    title: "Digital Archive",
    category: "Web Application",
    type: "Fullstack",
    color: "from-cyan-600 to-blue-600",
    desc: "Platform pengarsipan data publik dan catatan administratif, dibangun dengan fokus pada kecepatan respon dan keamanan berkas.",
    tech: ["Next.js", "Tailwind CSS", "Prisma", "MySQL"],
  },
  {
    title: "Inventory Management System",
    category: "Backend Development",
    type: "Backend",
    color: "from-blue-700 to-indigo-600",
    desc: "RESTful API backend yang mendukung pelacakan barang real-time, peringatan batas stok otomatis, dan multi-warehouse logs.",
    tech: ["Node.js", "Express", "JWT", "PostgreSQL"],
  },
  {
    title: "Portfolio Website",
    category: "Frontend Development",
    type: "Frontend",
    color: "from-blue-500 to-cyan-400",
    desc: "Website portofolio interaktif dengan desain gelap modern dan dynamic accent theme untuk menampilkan karya dengan representasi premium.",
    tech: ["Next.js", "Tailwind CSS v4", "TypeScript"],
  },
  {
    title: "School Project Dashboard",
    category: "Dashboard UI",
    type: "Frontend",
    color: "from-slate-800 to-blue-900",
    desc: "Antarmuka dashboard kaya data untuk visualisasi metrik performa sekolah, statistik siswa, dan penjadwalan kelas.",
    tech: ["React.js", "Chart.js", "Tailwind CSS"],
  },
];

type ToastType = "success" | "error" | null;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export default function Home() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType }>({ msg: "", type: null });
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("backend");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const physicsRef = useRef({
    offsetX: 0,
    offsetY: 0,
    vx: 0,
    vy: 0,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    lastTime: 0,
  });

  const animationFrameId = useRef<number | null>(null);

  const animatePhysics = (time: number) => {
    const state = physicsRef.current;
    if (state.isDragging) return;
    
    if (!state.lastTime) {
      state.lastTime = time;
      animationFrameId.current = requestAnimationFrame(animatePhysics);
      return;
    }
    
    let dt = (time - state.lastTime) / 1000;
    state.lastTime = time;
    
    if (dt <= 0) dt = 0.016;
    if (dt > 0.03) dt = 0.03;

    if (isNaN(state.offsetX) || isNaN(state.offsetY)) {
      state.offsetX = 0;
      state.offsetY = 0;
      state.vx = 0;
      state.vy = 0;
      setOffsetX(0);
      setOffsetY(0);
      state.lastTime = 0;
      animationFrameId.current = null;
      return;
    }

    const k = 150;
    const c = 7;

    const ax = -k * state.offsetX - c * state.vx;
    const ay = -k * state.offsetY - c * state.vy;

    state.vx += ax * dt;
    state.vy += ay * dt;
    state.offsetX += state.vx * dt;
    state.offsetY += state.vy * dt;

    setOffsetX(state.offsetX);
    setOffsetY(state.offsetY);

    if (
      Math.abs(state.offsetX) < 0.05 && Math.abs(state.vx) < 0.05 &&
      Math.abs(state.offsetY) < 0.05 && Math.abs(state.vy) < 0.05
    ) {
      state.offsetX = 0;
      state.offsetY = 0;
      state.vx = 0;
      state.vy = 0;
      setOffsetX(0);
      setOffsetY(0);
      state.lastTime = 0;
      animationFrameId.current = null;
      return;
    }

    animationFrameId.current = requestAnimationFrame(animatePhysics);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    physicsRef.current.isDragging = true;
    physicsRef.current.dragStart = { x: e.clientX, y: e.clientY };
    physicsRef.current.vx = 0;
    physicsRef.current.vy = 0;
    setIsDragging(true);
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!physicsRef.current.isDragging) return;
    const dx = e.clientX - physicsRef.current.dragStart.x;
    const dy = e.clientY - physicsRef.current.dragStart.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxLength = 200;

    let targetX = dx;
    let targetY = dy;

    if (distance > maxLength && distance > 0) {
      targetX = (dx / distance) * maxLength;
      targetY = (dy / distance) * maxLength;
    }

    if (targetY < -120) {
      targetY = -120;
    }

    physicsRef.current.offsetX = targetX;
    physicsRef.current.offsetY = targetY;

    setOffsetX(targetX);
    setOffsetY(targetY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!physicsRef.current.isDragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    physicsRef.current.isDragging = false;
    setIsDragging(false);
    
    physicsRef.current.lastTime = 0;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(animatePhysics);
  };

  const lanyardLength = Math.sqrt(offsetX * offsetX + (335 + offsetY) * (335 + offsetY));
  const lanyardAngle = -Math.atan2(offsetX, 335 + offsetY) * (180 / Math.PI);
  const cardRotation = lanyardAngle * 0.9 + (isDragging ? 0 : -offsetX * 0.05);

  useEffect(() => {
    fetch("/api/visit", { method: "POST" }).catch(console.error);
  }, []);

  const showToast = (msg: string, type: ToastType) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): boolean => {
    const required: (keyof FormState)[] = ["firstName", "email", "subject", "message"];
    for (const key of required) {
      if (!form[key].trim()) {
        showToast("⚠️ Mohon isi semua bidang wajib.", "error");
        return false;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      showToast("⚠️ Format email tidak valid.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  `${form.firstName}${form.lastName ? " " + form.lastName : ""}`,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   "kvn4.200581@gmail.com",
        },
        PUBLIC_KEY
      );
      showToast("✅ Pesan berhasil dikirim!", "success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      showToast("❌ Gagal mengirim. Cek konfigurasi EmailJS.", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("kvn4.200581@gmail.com");
    showToast("📋 Email berhasil disalin ke clipboard!", "success");
  };


  const filteredProjects = portfolioItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.type === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const inputClass =
    "px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm text-white bg-white/5 focus:bg-white/10 transition-all w-full";

  return (
    <main className="relative min-h-screen overflow-hidden">

      <div className="absolute top-[5%] left-[-15%] w-[35rem] h-[35rem] bg-primary/20 glow-blob animate-glow-1" />
      <div className="absolute top-[35%] right-[-15%] w-[40rem] h-[40rem] bg-secondary/15 glow-blob animate-glow-2" />
      <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[35rem] h-[35rem] bg-primary/20 glow-blob animate-glow-3" />


      <div
        className={`fixed bottom-6 right-6 z-55 px-6 py-4 rounded-2xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 flex items-center gap-3 ${
          toastVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-90 pointer-events-none"
        } ${toast.type === "success" ? "bg-primary border border-primary/30" : "bg-rose-600 border border-rose-500/30"}`}
      >
        <span>{toast.msg}</span>
      </div>


      <section
        id="home"
        className="relative min-h-screen flex items-center pt-28 pb-16 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4.5 py-2 rounded-full w-fit border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Tersedia Untuk Pekerjaan Lepas (Freelance)
            </div>

            <h1 className="text-5xl lg:text-7.5xl font-extrabold text-white leading-tight tracking-tight">
              Backend &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Fullstack
              </span>{" "}
              Developer
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Halo, saya <span className="text-white font-semibold">Mohammad Kevin</span>. Saya membangun arsitektur web service yang aman, handal, dan berkinerja tinggi, berspesialisasi dalam Node.js, Laravel, dan optimalisasi database.
            </p>


            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-gray-950 font-bold rounded-full shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                Hubungi Saya 🚀
              </a>
              <a
                href="#about"
                className="px-8 py-4 border border-white/10 hover:border-primary text-white hover:text-primary font-semibold rounded-full hover:-translate-y-0.5 transition-all duration-300"
              >
                Tentang Saya
              </a>
            </div>


            <div className="flex items-center gap-10 mt-8 pt-8 border-t border-white/5">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-4xl font-extrabold text-white">{s.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end w-full font-sans">
            <div className="relative w-full max-w-sm h-[480px] flex justify-center items-start overflow-visible select-none">
              
              <div className="absolute top-10 left-2 p-3 bg-slate-900/90 border border-white/10 rounded-2xl flex items-center gap-2 shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 select-none z-10">
                <span className="text-xl">⚙️</span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">NodeJS Expert</span>
              </div>

              <div className="absolute bottom-16 right-2 p-3 bg-slate-900/90 border border-white/10 rounded-2xl flex items-center gap-2 shadow-lg hover:border-secondary/40 hover:-translate-y-1 transition-all duration-300 select-none z-10">
                <span className="text-xl">🗄️</span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">DB Optimizer</span>
              </div>

              <div
                className="absolute origin-top bg-gradient-to-r from-slate-500 via-slate-300 to-slate-600 shadow-lg"
                style={{
                  left: "50%",
                  top: "-300px",
                  width: "8px",
                  height: `${lanyardLength}px`,
                  transform: `translateX(-50%) rotate(${lanyardAngle}deg)`,
                  transition: isDragging ? "none" : "height 0.05s ease-out, transform 0.05s ease-out",
                  zIndex: 20,
                  borderRadius: "9999px"
                }}
              >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,rgba(0,0,0,0.15)_1px,rgba(0,0,0,0.15)_2px)] rounded-full" />

                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%] w-5 h-7 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border border-white/20 rounded-md shadow-md flex flex-col items-center justify-between py-1 animate-pulse"
                  style={{ zIndex: 35 }}
                >
                  <div className="w-full h-[2px] bg-slate-500/50" />
                  <div className="w-[10px] h-[10px] bg-slate-900 border border-white/10 rounded-full" />
                </div>
              </div>

              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`absolute w-[310px] h-[450px] origin-top rounded-[28px] bg-gradient-to-br from-slate-900/95 via-blue-950/85 to-slate-950/95 border-2 border-sky-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(14,165,233,0.15)] flex flex-col p-4.5 cursor-grab active:cursor-grabbing select-none ${
                  isDragging ? "" : "transition-transform duration-75 ease-out"
                }`}
                style={{
                  left: "50%",
                  top: "35px",
                  transform: `translate(calc(-50% + ${offsetX}px), ${offsetY}px) rotate(${cardRotation}deg)`,
                  transformOrigin: "50% 0%",
                  touchAction: "none",
                  zIndex: 30
                }}
              >
                <div className="absolute inset-0 rounded-[26px] bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />

                <div className="w-10 h-2.5 bg-slate-950 rounded-full mx-auto mb-4 border border-white/5 shadow-inner opacity-20" />

                <div className="flex items-center gap-3.5 mb-4 px-1">
                  <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-sky-400/50 flex items-center justify-center shadow-lg shadow-sky-950/50 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 skew-y-12" />
                    <span className="text-sky-400 font-black text-lg italic tracking-tighter">KV</span>
                  </div>

                  <div className="flex flex-col text-left justify-center">
                    <span className="text-[9px] font-black text-white/90 tracking-wider">KEVIN'S</span>
                    <span className="text-[9px] font-black text-white/90 tracking-wider -mt-0.5">PROFESSIONAL ID</span>
                    <span className="text-[7.5px] font-extrabold text-sky-400 tracking-wider mt-0.5 leading-none">
                      SENIOR BACKEND &<br />FULLSTACK DEVELOPER
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 px-1 items-start">
                  
                  <div className="w-[42%] flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-center text-white/40 font-bold text-sm shadow-inner">
                      M
                    </div>

                    <div className="flex items-center justify-center px-1.5 py-0.5 bg-sky-950/60 border border-sky-400/30 rounded-full text-[6px] font-bold text-sky-300 w-fit gap-1 shadow-sm">
                      <span className="text-[8px] leading-none">⚙️</span>
                      <span className="tracking-wider">NODEJS EXPERT</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/60 border border-white/5 rounded-lg text-[7px] font-extrabold text-slate-300 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                        NODE.JS
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/60 border border-white/5 rounded-lg text-[7px] font-extrabold text-slate-300 shadow-sm">
                        <span className="text-[8px] font-black text-white leading-none">▲</span>
                        NEXT.JS
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/60 border border-white/5 rounded-lg text-[7px] font-extrabold text-slate-300 shadow-sm">
                        <span className="text-[8px] text-sky-400 leading-none">♒</span>
                        TAILWIND
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/60 border border-white/5 rounded-lg text-[7px] font-extrabold text-slate-300 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                        LARAVEL
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/60 border border-white/5 rounded-lg text-[7px] font-extrabold text-slate-300 shadow-sm">
                        <span className="text-[8px] text-sky-400 leading-none">🗄️</span>
                        DATABASE OPT.
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/60 border border-white/5 rounded-lg text-[7px] font-extrabold text-slate-300 shadow-sm">
                        <span className="text-[8px] text-sky-400 leading-none">🧪</span>
                         QA & TESTING
                      </div>
                    </div>
                  </div>

                  <div className="w-[58%] flex flex-col items-stretch">
                    <div className="relative w-[140px] h-[140px] mx-auto rounded-[20px] overflow-hidden border-2 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.2)] bg-slate-950 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.12)_1px,transparent_1px)] bg-[size:5px_5px] pointer-events-none" />
                      
                      <img
                        src="/images/logo.png"
                        alt="Mohammad Kevin"
                        onError={(e) => {
                          e.currentTarget.src = "/images/foto.png";
                        }}
                        className="w-full h-full object-cover z-10 select-none pointer-events-none grayscale"
                      />
                      
                      <div className="absolute inset-0 border border-sky-400/20 rounded-[18px] pointer-events-none z-20" />
                    </div>

                    <div className="mt-2.5 flex flex-col text-left gap-0.5 px-1">
                      <h4 className="text-[10.5px] font-black text-white uppercase tracking-wide">
                        MOHAMMAD KEVIN
                      </h4>
                      <span className="text-[7.5px] font-bold text-white/60 leading-none">
                        Backend & Fullstack Developer
                      </span>
                      <span className="text-[6.5px] font-extrabold text-sky-400 leading-none mt-0.5">
                        Exp: 2 Years | Projects: 35+
                      </span>
                    </div>

                    <div className="mt-3.5 flex justify-end px-1">
                      <div className="bg-white p-0.5 rounded shadow-lg shadow-sky-950/20">
                        <svg className="w-[42px] h-[42px]" viewBox="0 0 29 29" shapeRendering="crispEdges">
                          <path fill="#000" d="M0 0h7v7H0zm2 2h3v3H2zm8-2h1v1h-1zm1 1h1v1h-1zm-1 1h1v1h-1zm3-3h7v7h-7zm2 2h3v3H20zm-8 4h1v1h-1zm1 1h1v1h-1zm4-1h3v1h-3zm0 2h1v1h-1zm2 0h1v1h-1zm-7 2v1h1v-1zm1 1h1v1h-1zm1-2h1v1h-1zm2 1h1v1h-1zm3-1h1v1h-1zm1 1h1v1h-1zm-5 2h1v1h-1zm1 1h1v1h-1zm4-1h1v1h-1zm-10 2h7v7H0zm2 2h3v3H2zm11-2h1v1h-1zm2 1h1v1h-1zm-1-1h1v1h-1zm3 2h1v1h-1zm1-1h1v1h-1zm-4 3h3v1h-3zm0 2h1v1h-1zm2 0h1v1h-1zm4-5h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-auto flex items-end justify-between px-1 mb-0.5">
                  <div className="w-[100px] h-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-white/5 rounded-md flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute left-1 top-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute right-1 top-1" />
                  </div>

                  <div className="w-[110px] h-3 bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 via-cyan-500 to-blue-500 rounded border border-white/10 opacity-75 relative overflow-hidden shadow-[0_0_10px_rgba(168,85,247,0.15)] mb-1">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_4px)]" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="about" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row gap-16 items-center">

            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 border border-primary/15 rounded-2xl translate-x-2.5 translate-y-2.5 transition-transform" />
              <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/[0.02]">
                <img
                  src="/images/logo.png"
                  alt="Mohammad Kevin"
                  onError={(e) => {
                    e.currentTarget.src = "/images/foto.png";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>
            </div>


            <div className="flex flex-col gap-6">
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
                  Tentang Saya
                </p>
                <h2 className="text-4xl font-extrabold text-white leading-tight">
                  Merancang Backend Skalabel & <br />
                  <span className="text-primary">Berkinerja Tinggi</span>
                </h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-base">
                Saya adalah seorang Fullstack Developer dengan minat mendalam pada arsitektur API dan efisiensi database. Selama 2 tahun terakhir, saya telah mengembangkan berbagai sistem transaksi keuangan, aplikasi kasir (Point of Sale), serta arsip digital untuk organisasi. Saya senang memecahkan tantangan integrasi, mengoptimalkan query SQL, dan menerjemahkan logika backend yang rumit ke dalam visual dashboard frontend yang responsif dan mudah digunakan.
              </p>


              <div className="flex flex-wrap items-center gap-4 mt-2">
                <a
                  href="#portfolio"
                  className="px-6 py-3 bg-primary hover:opacity-90 text-gray-955 text-sm font-bold rounded-full transition-all duration-300"
                >
                  Lihat Karya Saya
                </a>
                <a
                  href="/CV%20Mohammad%20Kevin.pdf"
                  download
                  className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-primary hover:text-primary text-white text-sm font-semibold rounded-full transition-all duration-300"
                >
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Unduh CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="services" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Layanan Saya
            </p>
            <h2 className="text-4xl font-extrabold text-white">Apa Yang Saya Tawarkan</h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Membantu bisnis dan produk digital Anda berkembang melalui implementasi solusi arsitektur web modern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col gap-5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-2xl w-fit">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="process" className="py-28 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Keahlian
            </p>
            <h2 className="text-4xl font-extrabold text-white">Teknologi & Kemampuan</h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Keahlian teknis yang saya kuasai dan aplikasikan langsung dalam pengembangan proyek skala riil.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-4 flex flex-col gap-3">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                    activeTab === cat.id
                      ? "bg-white/5 border-primary text-primary shadow-lg shadow-primary/5"
                      : "bg-[#082a2e]/20 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-2xl p-2 bg-white/5 rounded-xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm text-white">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{cat.skills.length} keahlian utama</p>
                  </div>
                </button>
              ))}
            </div>


            <div className="lg:col-span-8 bg-slate-950/20 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-xl">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Metrik Kemampuan {skillCategories.find((c) => c.id === activeTab)?.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Prosentase di bawah mewakili intensitas penggunaan dalam deployment proyek produksi.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {skillCategories
                    .find((c) => c.id === activeTab)
                    ?.skills.map((skill) => {
                      const radius = 35;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDashoffset = circumference - (skill.level / 100) * circumference;

                      return (
                        <div
                          key={skill.name}
                          className="flex flex-col items-center justify-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300 group"
                        >
                          <div className="relative w-20 h-20 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <svg className="w-20 h-20 transform -rotate-90">
                              <circle
                                cx="40"
                                cy="40"
                                r={radius}
                                className="stroke-current text-white/5"
                                strokeWidth="5"
                                fill="transparent"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r={radius}
                                className="stroke-current text-primary transition-all duration-1000 ease-out"
                                strokeWidth="5"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                              />
                            </svg>
                            <span className="absolute text-sm font-extrabold text-white">{skill.level}%</span>
                          </div>
                          <span className="text-[11px] font-semibold text-gray-300 mt-4 text-center group-hover:text-primary transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="experience" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Perjalanan Karir
            </p>
            <h2 className="text-4xl font-extrabold text-white">Garis Waktu Pengalaman</h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Ringkasan jejak profesional dan studi kasus kontribusi teknis saya selama ini.
            </p>
          </div>

          <div className="relative border-l border-white/10 max-w-4xl mx-auto pl-6 sm:pl-10 flex flex-col gap-12">
            {timelineItems.map((item, index) => (
              <div key={index} className="relative group">

                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-background border border-primary flex items-center justify-center transition-all duration-300 group-hover:scale-125">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping absolute" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>


                <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-primary/20 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        {item.period}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-3">{item.role}</h3>
                    </div>
                    <span className="text-sm font-semibold text-gray-400">{item.company}</span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mt-2">{item.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tech.map((t) => (
                      <span key={t} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="portfolio" className="py-28 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Karya Saya
            </p>
            <h2 className="text-4xl font-extrabold text-white">Proyek Terbaru</h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Koleksi sistem kustom yang saya rancang dan selesaikan untuk memecahkan masalah klien.
            </p>
          </div>


          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 max-w-5xl mx-auto">

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {["All", "Backend", "Frontend", "Fullstack"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-primary text-gray-950 shadow-md shadow-primary/20 scale-102"
                      : "bg-white/5 border border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>


            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Cari nama proyek atau teknologi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-11 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-xs text-white bg-white/5 transition-all"
              />
              <svg className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>


          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((item, i) => (
                <div
                  key={i}
                  className="portfolio-card-hover group bg-slate-900/40 border border-white/5 rounded-3xl shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-96"
                >

                  <div className={`h-full bg-gradient-to-br ${item.color} p-8 flex flex-col justify-between overflow-hidden relative z-0`}>
                    <div className="absolute inset-0 bg-background/45 backdrop-blur-[1px]" />

                    <span className="relative z-10 text-xs font-bold text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/10 uppercase tracking-wider">
                      {item.category}
                    </span>

                    <div className="relative z-10 flex flex-col gap-2">
                      <h3 className="text-2xl font-extrabold text-white leading-tight">{item.title}</h3>
                      <span className="text-[11px] text-primary font-semibold flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        Hover untuk detail info
                        <svg className="w-3.5 h-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </span>
                    </div>
                  </div>


                  <div className="portfolio-drawer-hover p-6 flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.category}</span>
                        <h4 className="text-lg font-bold text-white mt-1">{item.title}</h4>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>


                      <div className="flex flex-wrap gap-1.5">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] text-gray-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>


                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-colors mt-4 w-fit"
                    >
                      Hubungi Detail
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5 max-w-lg mx-auto">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-white mt-4">Proyek Tidak Ditemukan</h3>
              <p className="text-gray-400 text-sm mt-2 px-6">
                Tidak ada proyek yang cocok dengan kata kunci "{searchQuery}" di kategori ini. Coba kata kunci atau kategori lain.
              </p>
            </div>
          )}
        </div>
      </section>


      <section
        id="contact"
        className="py-28 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Kolaborasi
            </p>
            <h2 className="text-4xl font-extrabold text-white">Mari Diskusikan Proyek Anda</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-5 flex flex-col gap-8">
              <p className="text-gray-400 leading-relaxed text-sm">
                Saya aktif mencari peran backend developer kustom, perancangan API aman, atau fullstack engineer. Jika Anda memiliki kebutuhan proyek atau ingin berpartner, silakan isi formulir di sebelah kanan. Saya akan menghubungi Anda kembali dalam kurun waktu 24 jam.
              </p>

              <div className="flex flex-col gap-4">

                <div className="flex items-center gap-4 p-4.5 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/5 shadow-sm transition-colors duration-300">
                  <span className="text-2xl w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">📍</span>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Lokasi</p>
                    <p className="text-sm font-semibold text-white mt-0.5">Malang, Jawa Timur, Indonesia</p>
                  </div>
                </div>


                <button
                  onClick={copyEmailToClipboard}
                  className="w-full text-left flex items-center justify-between p-4.5 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/5 shadow-sm transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">📧</span>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email (Klik untuk Salin)</p>
                      <p className="text-sm font-semibold text-white mt-0.5">kvn4.200581@gmail.com</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>


                <a
                  href="https://wa.me/6282131588846?text=Halo%20Mohammad%20Kevin,%20saya%20tertarik%20untuk%20berkolaborasi%20mengenai%20proyek%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4.5 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/5 shadow-sm transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">📞</span>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Hubungi WhatsApp (Chat Langsung)</p>
                      <p className="text-sm font-semibold text-white mt-0.5">+62 821-3158-8846</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>


            <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Nama Depan <span className="text-primary">*</span>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Masukkan nama depan"
                    value={form.firstName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Nama Belakang</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Masukkan nama belakang"
                    value={form.lastName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Alamat Email <span className="text-primary">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email.anda@contoh.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Subjek <span className="text-primary">*</span>
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Hal apa yang ingin didiskusikan?"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Deskripsi Pesan <span className="text-primary">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tuliskan ringkasan proyek atau pesan Anda di sini..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4.5 bg-gradient-to-r from-primary to-secondary disabled:opacity-60 disabled:cursor-not-allowed text-gray-950 font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-gray-950"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <span>Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <span>Kirim Pesan</span>
                    <span>🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}