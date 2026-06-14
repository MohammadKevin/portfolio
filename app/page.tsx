"use client";

import { useState, useRef } from "react";
import * as emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_rmat5kp";
const TEMPLATE_ID = "template_zt9llkk";
const PUBLIC_KEY  = "q_nuzyb4WLIy6kboy";

const stats = [
  { value: "2 Years", label: "Experience" },
  { value: "45+", label: "Projects Completed" },
];

const skillCategories = [
  {
    id: "backend",
    name: "Backend Development",
    icon: "⚙️",
    skills: [
      { name: "Node.js & Express.js", level: 90 },
      { name: "Laravel (PHP)", level: 85 },
      { name: "RESTful API Design", level: 92 },
      { name: "Authentication (JWT, OAuth)", level: 88 },
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
      { name: "Linux / VPS Deployment", level: 78 },
      { name: "Figma (UI design translation)", level: 82 },
    ],
  },
];

const portfolioItems = [
  {
    title: "InvDocs",
    category: "Document Management System",
    color: "from-teal-600 to-cyan-500",
    desc: "A high-performance system designed for archiving and managing company digital documentation.",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma"],
  },
  {
    title: "Kasir App",
    category: "Point of Sale System",
    color: "from-teal-700 to-emerald-500",
    desc: "A complete offline-first cashier system with invoice generation, stock monitoring, and financial reporting.",
    tech: ["React.js", "Laravel", "MySQL", "Tailwind CSS"],
  },
  {
    title: "Digital Archive",
    category: "Web Application",
    color: "from-cyan-600 to-teal-500",
    desc: "Archiving platform for public and administrative records, built with focus on speed and file security.",
    tech: ["Next.js", "Tailwind CSS", "Prisma", "MySQL"],
  },
  {
    title: "Inventory Management System",
    category: "Backend Development",
    color: "from-emerald-600 to-cyan-600",
    desc: "RESTful API backend supporting real-time tracking, automatic replenishment alerts, and multi-warehouse logs.",
    tech: ["Node.js", "Express", "JWT", "PostgreSQL"],
  },
  {
    title: "Portfolio Website",
    category: "Frontend Development",
    color: "from-teal-500 to-sky-500",
    desc: "This modern dark-themed creative portfolio designed and coded to showcase works with maximum flair.",
    tech: ["Next.js", "Tailwind CSS v4", "TypeScript"],
  },
  {
    title: "School Project Dashboard",
    category: "Dashboard UI",
    color: "from-slate-700 to-teal-800",
    desc: "A beautiful, data-rich interface visualizing school metrics, student performance, and scheduling.",
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
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        showToast("⚠️ Mohon isi semua field wajib.", "error");
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

  const inputClass =
    "px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-sm text-white bg-white/5 focus:bg-white/10 transition-all w-full";

  return (
    <main className="min-h-screen">
      {/* Toast Alert */}
      <div
        className={`fixed bottom-6 right-6 z-55 px-6 py-4 rounded-2xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 flex items-center gap-3 ${
          toastVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-90 pointer-events-none"
        } ${toast.type === "success" ? "bg-teal-600 border border-teal-500/30" : "bg-rose-600 border border-rose-500/30"}`}
      >
        <span>{toast.msg}</span>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Intro Column */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-[#14b8a6]/10 text-[#14b8a6] text-xs font-semibold px-4.5 py-2 rounded-full w-fit border border-[#14b8a6]/20">
              <span className="w-2 h-2 bg-[#14b8a6] rounded-full" />
              Available for Freelance Work
            </div>

            <h1 className="text-5xl lg:text-7.5xl font-extrabold text-white leading-tight tracking-tight">
              Backend &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9]">
                Fullstack
              </span>{" "}
              Developer
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Hello, I'm <span className="text-white font-semibold">Mohammad Kevin</span>. I build secure, reliable, and performant web services, specializing in Node.js, Laravel, and database architectures.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] text-gray-950 font-bold rounded-full shadow-lg shadow-[#14b8a6]/10 hover:shadow-[#14b8a6]/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                Hire Me 🚀
              </a>
              <a
                href="#about"
                className="px-8 py-4 border border-white/10 hover:border-[#14b8a6] text-white hover:text-[#14b8a6] font-semibold rounded-full hover:-translate-y-0.5 transition-all duration-300"
              >
                About Me
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 mt-8 pt-8 border-t border-white/5">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-4xl font-extrabold text-white">{s.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Geometric Profile Showcase */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group w-80 h-96 lg:w-96 lg:h-[450px]">
              {/* Decorative clean borders */}
              <div className="absolute inset-0 border border-[#14b8a6]/20 rounded-3xl translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#08262a]">
                <img
                  src="/images/logo.png"
                  alt="Mohammad Kevin"
                  onError={(e) => {
                    e.currentTarget.src = "/images/foto.png";
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                
                {/* Clean non-AI floating details tags */}
                <div className="absolute bottom-6 left-6 right-6 p-4.5 bg-[#051a1d]/90 backdrop-blur-md rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#14b8a6] font-bold uppercase tracking-wider">Expertise Focus</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-lg">REST APIs</span>
                    <span className="text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-lg">Secure Auth</span>
                    <span className="text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-lg">DB Tuning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row gap-16 items-center">
            {/* Image Box */}
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 border border-[#14b8a6]/15 rounded-2xl translate-x-2.5 translate-y-2.5 transition-transform" />
              <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#08262a]">
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

            {/* Info Box */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[#14b8a6] text-xs font-bold uppercase tracking-widest mb-2">
                  About Me
                </p>
                <h2 className="text-4xl font-extrabold text-white leading-tight">
                  Crafting Scalable and <br />
                  <span className="text-[#14b8a6]">High-Performance</span> Backends
                </h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-base">
                I am a dedicated fullstack developer with a deep focus on API architectures and database performance. Over the past 2 years, I have engineered robust transaction platforms, Point of Sale cashier structures, and administrative archive services. I love solving scaling challenges, optimizing SQL queries, and translating complex logic into seamless front-end dashboards.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <a
                  href="#portfolio"
                  className="px-6 py-3 bg-[#14b8a6] hover:bg-[#0d9488] text-gray-955 hover:text-black text-sm font-bold rounded-full transition-all duration-300"
                >
                  View My Work
                </a>
                <a
                  href="/images/logo.png"
                  download
                  className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-[#14b8a6] hover:text-[#14b8a6] text-white text-sm font-semibold rounded-full transition-all duration-300"
                >
                  <svg className="w-4 h-4 text-[#14b8a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills / Process Section */}
      <section id="process" className="py-28 relative bg-[#031417]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#14b8a6] text-xs font-bold uppercase tracking-widest mb-2">
              Capabilities
            </p>
            <h2 className="text-4xl font-extrabold text-white">Skills & Technologies</h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              My technical expertise is categorised below. Click on a category to explore specific tool efficiencies and levels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Tabs Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                    activeTab === cat.id
                      ? "bg-white/5 border-[#14b8a6] text-[#14b8a6] shadow-lg shadow-[#14b8a6]/5"
                      : "bg-[#082a2e]/60 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-2xl p-2 bg-white/5 rounded-xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm text-white">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{cat.skills.length} core tools</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Details */}
            <div className="lg:col-span-8 bg-[#082a2e]/60 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-xl">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {skillCategories.find((c) => c.id === activeTab)?.name} Proficiency
                  </h3>
                  <p className="text-xs text-gray-500">
                    Calculated based on projects successfully deployed in production.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {skillCategories
                    .find((c) => c.id === activeTab)
                    ?.skills.map((skill) => (
                      <div key={skill.name} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span className="text-gray-200">{skill.name}</span>
                          <span className="text-[#14b8a6]">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#14b8a6] text-xs font-bold uppercase tracking-widest mb-2">
              My Work
            </p>
            <h2 className="text-4xl font-extrabold text-white">Recent Projects</h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Explore custom systems I've developed, ranging from document databases to rich point-of-sale platforms.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, i) => (
              <div
                key={i}
                className="group relative bg-[#082a2e]/60 border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:border-[#14b8a6]/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
              >
                {/* Visual Header */}
                <div className={`h-40 bg-gradient-to-br ${item.color} relative p-6 flex flex-col justify-end overflow-hidden`}>
                  <div className="absolute inset-0 bg-[#051a1d]/30 backdrop-blur-[2px]" />
                  <span className="relative z-10 text-xs font-bold text-white/80 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-2 border border-white/10 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="relative z-10 text-xl font-extrabold text-white">{item.title}</h3>
                </div>

                {/* Details Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Case Study Link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#14b8a6] hover:text-[#0ea5e9] transition-colors mt-auto w-fit"
                  >
                    Inquire Details
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-28 relative bg-[#031417]/40"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#14b8a6] text-xs font-bold uppercase tracking-widest mb-2">
              Collaborations
            </p>
            <h2 className="text-4xl font-extrabold text-white">Let's Discuss Your Project</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <p className="text-gray-400 leading-relaxed text-sm">
                I am actively taking on backend development, custom API architectures, and fullstack roles. If you have an inquiry or would like to partner on a product, please complete the form. I'll get back to you within 24 hours.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: "📍", label: "Based In", value: "Malang, Indonesia" },
                  { icon: "📧", label: "Direct Email", value: "kvn4.200581@gmail.com" },
                  { icon: "📞", label: "WhatsApp Chat", value: "+62 821-3158-8846" },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-4 p-4.5 bg-[#082a2e]/60 rounded-2xl border border-white/5 shadow-sm"
                  >
                    <span className="text-2xl w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">{info.icon}</span>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{info.label}</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#082a2e]/60 border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    First Name <span className="text-[#14b8a6]">*</span>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Email Address <span className="text-[#14b8a6]">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Subject <span className="text-[#14b8a6]">*</span>
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="What is this regarding?"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Message Description <span className="text-[#14b8a6]">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Brief summary of your project or details..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4.5 bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] disabled:opacity-60 disabled:cursor-not-allowed text-gray-950 font-bold rounded-xl shadow-lg shadow-[#14b8a6]/10 hover:shadow-[#14b8a6]/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
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
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
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