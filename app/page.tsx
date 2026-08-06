"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { send as sendEmail } from "@emailjs/browser";
import {
  MapPin, Mail, Phone, Send, Download, ExternalLink,
  CheckCircle2, XCircle, Copy, Check, Code2, Database,
  Server, Wrench, Award, Activity, GitBranch, GitCommit,
  Star, GitFork, ShieldCheck, Search, FileText,
  ChevronRight, ArrowUpRight, Zap, Terminal,
} from "lucide-react";

import { whoamiData }           from "@/data/whoami";
import { skillCategories }      from "@/data/skills";
import { projectsData, Project }from "@/data/projects";
import { timelineLogs }         from "@/data/timeline";
import { certificatesData, Certificate } from "@/data/certificates";
import { translations }         from "@/data/translations";
import { useLanguage }          from "@/contexts/LanguageContext";

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "service_rmat5kp";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_zt9llkk";
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || "3qW5e407vXhAIdlX5";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const catIcons: Record<string, React.ReactNode> = {
  backend:           <Server   className="w-4 h-4" />,
  database:          <Database className="w-4 h-4" />,
  frontend:          <Code2    className="w-4 h-4" />,
  tooling:           <Wrench   className="w-4 h-4" />,
  "tools-secondary": <Wrench   className="w-4 h-4" />,
};

function LevelBadge({ tag }: { tag: string }) {
  const cls =
    tag === "CORE STACK" ? "badge-core"
    : tag === "PRIMARY"  ? "badge-primary"
    :                      "badge-secondary";
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${cls}`}>{tag}</span>
  );
}

/* ── Scroll Reveal ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => obs.observe(el));
    };
    observeAll();

    // Re-observe when new .reveal elements are added (tab switches, async data)
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { obs.disconnect(); mo.disconnect(); };
  }, []);
}

/* ── Typewriter ── */
function useTypewriter(words: readonly string[], speed = 75, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
          setCharIdx(0);
        } else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

interface GithubRepo {
  id: number;
  name: string;
  fullName: string;
  repoUrl: string;
  description: string;
  homepage: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  isPrivate: boolean;
}

export default function Home() {
  const { lang } = useLanguage();
  const tr = translations;

  /* local shortcuts */
  const h   = tr.hero;
  const ab  = tr.about;
  const sk  = tr.skills;
  const pr  = tr.projects;
  const gh  = tr.github;
  const ce  = tr.certs;
  const tl  = tr.timeline;
  const co  = tr.contact;
  const cv  = tr.cv;

  const [projectsList,   setProjectsList]   = useState<Project[]>(projectsData);
  const [githubRepos,    setGithubRepos]    = useState<GithubRepo[]>([]);
  const [githubLoading,  setGithubLoading]  = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeTab,      setActiveTab]      = useState("backend");
  const [copiedEmail,    setCopiedEmail]    = useState(false);
  const [resumeOpen,     setResumeOpen]     = useState(false);
  const [certs,          setCerts]          = useState<Certificate[]>(certificatesData);
  const [form,           setForm]           = useState({ name: "", email: "", message: "" });
  const [formStatus,     setFormStatus]     = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg,       setErrorMsg]       = useState("");

  useReveal();

  const typeWords = h.typewriterWords[lang];
  const typeword  = useTypewriter(typeWords, 75, 2200);

  useEffect(() => {
    fetch("/api/certificates").then(r=>r.json())
      .then(d => {
        if(d.success && d.certificates?.length) {
          // Normalize credentialUrl → url for frontend rendering
          const normalized = d.certificates.map((c: Record<string, unknown>) => ({
            ...c,
            url: c.url || c.credentialUrl || c.credential_url || "",
            skills: Array.isArray(c.skills) ? c.skills : [],
          }));
          setCerts(normalized);
        }
      })
      .catch(()=>{});
  }, []);
  useEffect(() => {
    fetch("/api/projects").then(r=>r.json())
      .then(d => {
        if(d.success && d.projects?.length) {
          // Normalize & safety-check fields from API/Supabase
          const normalized = d.projects.map((p: Record<string, unknown>) => ({
            ...p,
            tech: Array.isArray(p.tech) ? p.tech : [],
            demoUrl: (p.demoUrl || p.demo_url || "") as string,
            repoUrl: (p.repoUrl || p.repo_url || "") as string,
            type: p.type || "Fullstack",
          }));
          setProjectsList(normalized);
        }
      })
      .catch(()=>{});
  }, []);
  useEffect(() => {
    fetch("/api/github/repos?username=MohammadKevin").then(r=>r.json())
      .then(d => { if(d.success && d.repos) setGithubRepos(d.repos); })
      .catch(()=>{}).finally(() => setGithubLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFormStatus("error"); setErrorMsg(co.errorFill[lang]); return;
    }
    setFormStatus("loading");
    try {
      await sendEmail(SERVICE_ID, TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message }, PUBLIC_KEY);
      setFormStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
      setErrorMsg(co.errorSend[lang]);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("kvn4.200581@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filterLabels = ["All", "Backend", "Frontend", "Fullstack"];
  const filtered = projectsList.filter(p => {
    if (!p.title) return false; // skip incomplete projects from API
    const pType = (p.type || "").toLowerCase();
    const matchCat = activeCategory === "All" || pType === activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const descStr = typeof p.desc === "string" ? p.desc : (p.desc?.[lang] || "");
    const probStr = typeof p.problem === "string" ? p.problem : (p.problem?.[lang] || "");
    const techArr = Array.isArray(p.tech) ? p.tech : [];
    const matchQ = !q || p.title.toLowerCase().includes(q)
      || descStr.toLowerCase().includes(q)
      || probStr.toLowerCase().includes(q)
      || techArr.some(t => t.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  /* ─── RENDER ─────────────────────────────────────────────────── */
  return (
    <main className="min-h-screen bg-[#080f1e] text-slate-300 relative overflow-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <section id="hero" className="relative z-10 hero-bg bg-grid pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            {/* Photo */}
            <div className="order-first lg:order-last shrink-0 relative flex items-center justify-center">
              <div className="photo-wrap">
                <div className="absolute inset-[-18px] rounded-full animate-pulse-glow opacity-60 pointer-events-none" />
                <div className="photo-ring w-56 h-56 md:w-64 md:h-64 relative animate-float">
                  <Image
                    src="/images/logo.png" alt="Mohammad Kevin" fill
                    sizes="(max-width: 768px) 224px, 256px"
                    className="object-cover" priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10
                flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d1628]
                border border-white/10 text-xs font-semibold text-white whitespace-nowrap
                shadow-xl shadow-black/40">
                <span className="status-dot" />{h.available[lang]}
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col gap-5 text-center lg:text-left">
              <div className="section-label mx-auto lg:mx-0 animate-fade-up">
                {h.badge[lang]}
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight animate-fade-up delay-100">
                {h.greeting[lang]}<br />
                <span className="accent-word">Kevin</span>.
              </h1>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed animate-fade-up delay-200">
                {h.typewriterPrefix[lang]}{" "}
                <span className="font-semibold text-white font-mono">
                  {typeword}
                  <span className="animate-blink text-[var(--accent-light)]">|</span>
                </span>
              </p>

              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-up delay-300">
                {lang === "id"
                  ? <>Siswa <strong className="text-slate-300">SMK Telkom Malang</strong> dengan 2+ tahun pengalaman nyata. Stack: <span className="text-[var(--accent-light)] font-mono text-sm">Next.js · NestJS · Prisma · PostgreSQL</span>.</>
                  : <>Student at <strong className="text-slate-300">SMK Telkom Malang</strong> with 2+ years of real-world experience. Stack: <span className="text-[var(--accent-light)] font-mono text-sm">Next.js · NestJS · Prisma · PostgreSQL</span>.</>
                }
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 justify-center lg:justify-start animate-fade-up delay-300">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[var(--accent-light)]"/>{h.locMalang[lang]}</span>
                <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4 text-[var(--accent-light)]"/>{h.school2[lang]}</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[var(--accent-light)]"/>{h.exp[lang]}</span>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-up delay-400">
                <a href="#contact" id="hero-contact-btn" className="btn-accent rounded-xl text-sm">
                  <Mail className="w-4 h-4" />{h.contactBtn[lang]}
                </a>
                <button id="hero-cv-btn" onClick={() => setResumeOpen(true)} className="btn-ghost rounded-xl text-sm">
                  <Download className="w-4 h-4" />{h.cvBtn[lang]}
                </button>
                <a href="https://github.com/MohammadKevin" target="_blank" rel="noopener noreferrer"
                  id="hero-github-btn" className="btn-ghost rounded-xl text-sm px-3.5">
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-white/6 animate-fade-up delay-500">
                {whoamiData.stats.map((st) => (
                  <div key={st.label} className="flex flex-col gap-0.5">
                    <span className="text-2xl font-black" style={{color:"var(--accent-light)"}}>{st.value}</span>
                    <span className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold leading-tight">{st.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="whoami" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="mb-12 reveal">
            <div className="section-label mb-4">{ab.label[lang]}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {ab.heading[lang]} <span className="accent-word">{ab.headingAccent[lang]}</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 flex flex-col gap-5 reveal">
              <div className="card-flat rounded-2xl p-7 flex flex-col gap-5">

                <div className="flex items-center gap-4">
                  <div className="photo-ring w-14 h-14 relative shrink-0">
                    <Image src="/images/logo.png" alt="Kevin" fill sizes="56px" className="object-cover"/>
                  </div>
                  <div>
                    <p className="font-bold text-white">Mohammad Kevin Arif Rudianto</p>
                    <p className="text-sm text-[var(--accent-light)] font-mono">@MohammadKevin · Malang, ID</p>
                  </div>
                </div>

                <div className="divider"/>

                <div className="flex flex-col gap-4 text-[15px] text-slate-400 leading-relaxed">
                  <p>{lang === "id"
                    ? <>Halo! Nama saya <strong className="text-white">Mohammad Kevin</strong> — seorang developer yang masih duduk di bangku <strong className="text-white">SMK Telkom Malang</strong>, tapi sudah terjun langsung ke dunia pengembangan software nyata selama 2 tahun lebih.</>
                    : <>Hey! I&apos;m <strong className="text-white">Mohammad Kevin</strong> — a developer still studying at <strong className="text-white">SMK Telkom Malang</strong>, but I&apos;ve been building real-world software for over 2 years.</>
                  }</p>
                  <p>{lang === "id"
                    ? <>Saya percaya bahwa kode yang baik adalah kode yang <em className="text-slate-300">menyelesaikan masalah nyata</em> — bukan sekadar terlihat keren. Karena itu saya fokus pada arsitektur API yang benar-benar scalable, query database yang efisien, dan antarmuka yang intuitif.</>
                    : <>I believe great code is code that <em className="text-slate-300">solves real problems</em> — not just looks cool. That&apos;s why I focus on truly scalable API architecture, efficient database queries, and intuitive interfaces.</>
                  }</p>
                  <p>{lang === "id"
                    ? <>Dari membangun sistem kasir untuk UMKM, arsip digital, hingga backend API enterprise — saya menikmati setiap tantangan yang membuat saya menjadi developer yang lebih baik.</>
                    : <>From building cashier systems for small businesses, digital archives, to enterprise backend APIs — I enjoy every challenge that makes me a better developer.</>
                  }</p>
                </div>

                <div className="callout">{ab.quote[lang]}</div>

                <div className="p-4 rounded-xl bg-[#060912] border border-white/5 font-mono text-xs text-slate-400 leading-loose">
                  <p className="text-slate-600">{ab.codeComment[lang]}</p>
                  <p><span className="text-[var(--accent-light)]">const</span> kevin = {"{"}</p>
                  <p className="pl-4">stack: <span className="text-emerald-400">[&quot;Next.js&quot;, &quot;NestJS&quot;, &quot;Prisma&quot;, &quot;PostgreSQL&quot;]</span>,</p>
                  <p className="pl-4">loves: <span className="text-sky-400">{ab.codeLoves[lang]}</span>,</p>
                  <p className="pl-4">goal: <span className="text-purple-400">{ab.codeGoal[lang]}</span>,</p>
                  <p className="pl-4">status: <span className="text-emerald-400">{ab.codeStatus[lang]}</span></p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4 reveal reveal-delay-2">
              <div className="card-flat rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">{ab.quickInfoLabel[lang]}</p>
                {[
                  { label: ab.location[lang],      value: ab.locationVal[lang] },
                  { label: ab.education[lang],     value: ab.educationVal[lang] },
                  { label: ab.primaryStack[lang],  value: "Next.js · NestJS · Prisma" },
                  { label: ab.database[lang],      value: "PostgreSQL & MySQL" },
                  { label: ab.extra[lang],         value: ab.extraVal[lang] },
                ].map(item => (
                  <div key={item.label} className="py-2 border-b border-white/5 last:border-0">
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5 font-semibold">{item.label}</p>
                    <p className="text-sm text-slate-300 font-medium">{item.value}</p>
                  </div>
                ))}
                <div className="pt-2 flex items-center gap-2">
                  <span className="status-dot"/><span className="text-sm text-emerald-400 font-semibold">{ab.openFreelance[lang]}</span>
                </div>
              </div>

              <div className="card-flat rounded-2xl p-5 flex flex-col gap-3">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">{ab.stackLabel[lang]}</p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js","NestJS","Express","Prisma","PostgreSQL","MySQL","TypeScript","Redis","Tailwind CSS"].map(t => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SKILLS ══════════════ */}
      <section id="stack" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="mb-12 reveal">
            <div className="section-label mb-4">{sk.label[lang]}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {sk.heading[lang]} <span className="accent-word">{sk.headingAccent[lang]}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md">{sk.subtext[lang]}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-7 reveal">
            {skillCategories.map(cat => {
              const active = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`skill-tab-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                    cursor-pointer transition-all duration-200 ${
                    active
                      ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]"
                      : "card-flat text-slate-400 hover:text-white"
                  }`}
                >
                  <span className={active ? "text-white/70" : "text-[var(--accent-light)]"}>{catIcons[cat.id]}</span>
                  {cat.title}
                </button>
              );
            })}
          </div>

          {skillCategories.filter(c => c.id === activeTab).map(cat => (
            <div key={cat.id} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="card-flat rounded-2xl p-6 reveal">
                <h3 className="font-bold text-white text-sm mb-5">{cat.title}</h3>
                <div className="flex flex-col divide-y divide-white/5">
                  {cat.skills.map(sk => (
                    <div key={sk.name} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                      <div>
                        <h3 className="font-bold text-white text-sm leading-snug">{sk.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">{sk.desc[lang]}</p>
                      </div>
                      <LevelBadge tag={sk.levelTag}/>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-flat rounded-2xl p-6 reveal reveal-delay-2">
                <h3 className="font-bold text-white text-sm mb-5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
                  {translations.skills.achievementsHeader[lang]}
                </h3>
                <div className="flex flex-col gap-5">
                  {cat.skills.flatMap(sk => sk.achievements).map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-border)]
                        flex items-center justify-center text-[10px] font-bold text-[var(--accent-light)] shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{a[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ PROJECTS ══════════════ */}
      <section id="projects" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div className="reveal">
              <div className="section-label mb-4">{pr.label[lang]}</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {pr.heading[lang]} <span className="accent-word">{pr.headingAccent[lang]}</span>
              </h2>
              <p className="text-slate-500 text-sm mt-2">{pr.subtext[lang]}</p>
            </div>
            <div className="flex flex-wrap gap-2 reveal">
              {filterLabels.map(cat => (
                <button
                  key={cat}
                  id={`proj-filter-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                    activeCategory === cat
                      ? "bg-[var(--accent)] text-white shadow-md"
                      : "card-flat text-slate-400 hover:text-white"
                  }`}
                >
                  {cat === "All" ? pr.filterAll[lang] : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-8 max-w-sm reveal">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2"/>
            <input
              id="project-search"
              type="text" placeholder={pr.searchPlaceholder[lang]}
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl card-flat text-sm text-white
                placeholder-slate-600 focus:outline-none border border-white/6
                focus:border-[var(--accent-border)] transition-all"
            />
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <div key={item.id} className={`card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden reveal reveal-delay-${Math.min(i+1,4)}`}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)] opacity-50"/>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--accent-light)] uppercase tracking-widest">{item.category}</span>
                    <span className="tech-pill">{item.type}</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {typeof item.desc === "string" ? item.desc : item.desc?.[lang] || ""}
                  </p>

                  {item.problem && (
                    <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/12">
                      <p className="text-rose-400 font-bold text-[10px] mb-1 uppercase tracking-wider">{pr.labelProblem[lang]}</p>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {typeof item.problem === "string" ? item.problem : item.problem?.[lang] || ""}
                      </p>
                    </div>
                  )}
                  {item.impact && (
                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/12">
                      <p className="text-emerald-400 font-bold text-[10px] mb-1 uppercase tracking-wider">{pr.labelImpact[lang]}</p>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {typeof item.impact === "string" ? item.impact : item.impact?.[lang] || ""}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {Array.isArray(item.tech) && item.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
                  </div>

                  {(item.demoUrl || item.repoUrl) && (
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      {item.demoUrl && item.demoUrl.length > 0 && (
                        <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-accent text-xs px-3 py-1.5 rounded-lg">
                          <ExternalLink className="w-3.5 h-3.5"/> {pr.demo[lang]}
                        </a>
                      )}
                      {item.repoUrl && item.repoUrl.length > 0 && (
                        <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs px-3 py-1.5 rounded-lg">
                          <GithubIcon className="w-3.5 h-3.5"/> {pr.repo[lang]}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 card-flat rounded-2xl reveal">
              <Search className="w-9 h-9 text-slate-700 mx-auto mb-3"/>
              <p className="text-slate-500">{pr.empty[lang]}</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ GITHUB ══════════════ */}
      <section id="github" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div className="reveal">
              <div className="section-label mb-4">{gh.label[lang]}</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {gh.heading[lang]} <span className="accent-word">{gh.headingAccent[lang]}</span>
              </h2>
            </div>
            <a href="https://github.com/MohammadKevin" target="_blank" rel="noopener noreferrer"
              id="github-profile-link" className="btn-ghost rounded-xl text-sm reveal">
              <GithubIcon className="w-4 h-4"/>
              @MohammadKevin
              <ArrowUpRight className="w-4 h-4"/>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
            {[
              { icon: <Code2 className="w-5 h-5"/>, val: githubRepos.length > 0 ? `${githubRepos.length}+` : "66+", label: gh.publicRepos[lang], color: "text-[var(--accent-light)]" },
              { icon: <Activity className="w-5 h-5"/>, val: gh.focus[lang], label: gh.focusLabel[lang], color: "text-emerald-400" },
              { icon: <GitCommit className="w-5 h-5"/>, val: gh.statusActive[lang], label: gh.statusLabel[lang], color: "text-sky-400" },
            ].map((s, i) => (
              <div key={i} className={`card-flat rounded-2xl p-5 flex items-center gap-4 reveal reveal-delay-${i+1}`}>
                <div className="p-2.5 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-border)]">
                  <span className="text-[var(--accent-light)]">{s.icon}</span>
                </div>
                <div>
                  <p className={`font-bold text-sm ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card-flat rounded-2xl p-6 mb-7 reveal">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <GitBranch className="w-4 h-4 text-[var(--accent-light)]"/>
                {gh.graphTitle[lang]}
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                <span className="status-dot" style={{width:"6px",height:"6px"}}/> LIVE
              </span>
            </div>
            <div className="overflow-x-auto flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://ghchart.rshah.org/6366f1/MohammadKevin" alt="GitHub Contribution"
                className="max-w-full h-auto min-w-[600px] opacity-90"/>
            </div>
          </div>

          <h3 className="text-base font-bold text-white mb-5 reveal">{gh.recentRepos[lang]}</h3>
          {githubLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({length:6}).map((_,i) => <div key={i} className="card-flat rounded-2xl h-32 animate-pulse"/>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {githubRepos.slice(0,6).map((repo, i) => (
                <div key={repo.id} className={`card rounded-2xl p-5 flex flex-col justify-between gap-3 reveal reveal-delay-${Math.min(i+1,4)}`}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-white font-semibold text-sm truncate">
                        <Code2 className="w-4 h-4 text-[var(--accent-light)] shrink-0"/>
                        <span className="truncate">{repo.name}</span>
                      </div>
                      {repo.language && <span className="tech-pill shrink-0">{repo.language}</span>}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {repo.description || gh.defaultDesc[lang]}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <div className="flex items-center gap-3 text-slate-600">
                      {repo.stars > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400"/>{repo.stars}</span>}
                      {repo.forks > 0 && <span className="flex items-center gap-1"><GitFork className="w-3 h-3"/>{repo.forks}</span>}
                    </div>
                    <a href={repo.repoUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[var(--accent-light)] hover:underline font-semibold">
                      {gh.view[lang]} <ArrowUpRight className="w-3 h-3"/>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ CERTIFICATES ══════════════ */}
      <section id="certificates" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="mb-12 reveal">
            <div className="section-label mb-4">{ce.label[lang]}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {ce.heading[lang]} <span className="accent-word">{ce.headingAccent[lang]}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((cert, i) => (
              <div key={cert.id} className={`card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden reveal reveal-delay-${Math.min(i+1,4)}`}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)] opacity-40"/>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[var(--accent-light)] uppercase tracking-widest">{cert.category}</span>
                  <span className="text-[10px] text-slate-600 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400"/>{cert.date}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-border)] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[var(--accent-light)]"/>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {typeof cert.title === "string" ? cert.title : cert.title?.[lang] || ""}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {typeof cert.issuer === "string" ? cert.issuer : cert.issuer?.[lang] || ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(cert.skills) && cert.skills.map((s:string) => (
                    <span key={s} className="tech-pill">{s}</span>
                  ))}
                </div>
                {cert.url && (
                  <div className="pt-2 border-t border-white/5">
                    <a href={cert.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--accent-light)] hover:underline font-semibold">
                      {ce.verify[lang]} <ExternalLink className="w-3 h-3"/>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TIMELINE ══════════════ */}
      <section id="timeline" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="mb-12 reveal">
            <div className="section-label mb-4">{tl.label[lang]}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {tl.heading[lang]} <span className="accent-word">{tl.headingAccent[lang]}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md">{tl.subtext[lang]}</p>
          </div>

          <div className="flex flex-col gap-6 relative">
            <div className="timeline-line"/>
            {timelineLogs.map((log, i) => (
              <div key={log.id} className={`relative pl-12 sm:pl-14 reveal reveal-delay-${Math.min(i+1,3)}`}>
                <div className="absolute left-3.5 top-5 flex items-center justify-center">
                  <div className="timeline-dot"/>
                </div>
                <div className="card-flat rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-mono text-[var(--accent-light)] mb-0.5">{log.id}</p>
                      <h3 className="text-base font-bold text-white">{log.org}</h3>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">{log.role[lang]}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500 font-mono">
                        {lang === "en" ? log.year.replace(/sekarang/i, "Present") : log.year}
                      </span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                        log.type === "academic"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                      }`}>{log.type}</span>
                    </div>
                  </div>
                  <div className="callout text-sm">{log.summary[lang]}</div>
                  <ul className="flex flex-col gap-2">
                    {log.achievements.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-400">
                        <ChevronRight className="w-4 h-4 text-[var(--accent-light)] shrink-0 mt-0.5"/>{a[lang]}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {log.tech?.map((t: string) => <span key={t} className="tech-pill">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section id="contact" className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-14 reveal">
            <div className="section-label mb-4 justify-center">{co.label[lang]}</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              {co.heading[lang]} <span className="accent-word">{co.headingAccent[lang]}</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              {co.subtext[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-4 reveal">
              <div className="card-flat rounded-2xl p-5 flex items-center gap-4">
                <div className="photo-ring w-14 h-14 relative shrink-0">
                  <Image src="/images/icon.png" alt="Kevin" fill sizes="56px" className="object-cover"/>
                </div>
                <div>
                  <p className="font-bold text-white">Mohammad Kevin</p>
                  <p className="text-sm text-[var(--accent-light)]">{co.role[lang]}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="status-dot" style={{width:"6px",height:"6px"}}/>
                    <span className="text-xs text-slate-500">{co.openNew[lang]}</span>
                  </div>
                </div>
              </div>

              {/* Contact links */}
              {[
                {
                  label: co.labelEmail[lang], value: "kvn4.200581@gmail.com",
                  href: "mailto:kvn4.200581@gmail.com",
                  icon: <Mail className="w-4 h-4 text-[var(--accent-light)]"/>,
                  extra: (
                    <button onClick={copyEmail} className="text-slate-600 hover:text-white transition-colors p-1">
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400"/> : <Copy className="w-4 h-4"/>}
                    </button>
                  ),
                },
                {
                  label: co.labelWA[lang], value: "+62 821-3158-8846",
                  href: "https://wa.me/6282131588846",
                  icon: <Phone className="w-4 h-4 text-emerald-400"/>,
                  cta: co.chatArrow[lang], ctaColor: "text-emerald-400",
                },
                {
                  label: co.labelLI[lang], value: "mohammad-kevin-arif-rudianto",
                  href: "https://linkedin.com/in/mohammad-kevin-arif-rudianto-945733347",
                  icon: (
                    <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                  cta: co.connectArrow[lang], ctaColor: "text-sky-400",
                },
              ].map(c => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="card-flat rounded-xl p-4 flex items-center gap-3
                    border border-white/5 hover:border-[var(--accent-border)] transition-all group">
                  {c.icon}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">{c.label}</p>
                    <p className="text-sm text-white font-medium truncate group-hover:text-[var(--accent-light)] transition-colors">{c.value}</p>
                  </div>
                  {c.extra || (c.cta && <span className={`text-xs font-bold shrink-0 ${c.ctaColor}`}>{c.cta}</span>)}
                </a>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 card-flat rounded-2xl p-7 reveal reveal-delay-2">
              <h3 className="font-bold text-white mb-1.5 flex items-center gap-2">
                <Send className="w-4 h-4 text-[var(--accent-light)]"/>{co.formTitle[lang]}
              </h3>
              <p className="text-slate-500 text-xs mb-6">{co.formSubtext[lang]}</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { id:"contact-name",  label: co.fieldName[lang],  name:"name",  type:"text",  ph: co.phName[lang] },
                  { id:"contact-email", label: co.fieldEmail[lang],  name:"email", type:"email", ph: co.phEmail[lang] },
                ].map(f => (
                  <div key={f.name}>
                    <label className="text-xs text-slate-500 font-semibold block mb-1.5">{f.label}</label>
                    <input
                      id={f.id} type={f.type} name={f.name}
                      value={form[f.name as keyof typeof form]} onChange={handleChange}
                      placeholder={f.ph}
                      className="w-full px-4 py-3 rounded-xl bg-[#060912] border border-white/8
                        focus:outline-none focus:border-[var(--accent-border)]
                        text-white text-sm placeholder-slate-700 transition-all"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs text-slate-500 font-semibold block mb-1.5">{co.fieldMsg[lang]}</label>
                  <textarea
                    id="contact-message" name="message" rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder={co.phMsg[lang]}
                    className="w-full px-4 py-3 rounded-xl bg-[#060912] border border-white/8
                      focus:outline-none focus:border-[var(--accent-border)]
                      text-white text-sm placeholder-slate-700 transition-all resize-none"
                    required
                  />
                </div>

                {formStatus === "error" && (
                  <div className="p-4 rounded-xl bg-rose-500/6 border border-rose-500/18 text-rose-300 text-sm flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 shrink-0"/>{errorMsg}
                    </div>
                    {form.name && form.message && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        <a href={`https://wa.me/6282131588846?text=${encodeURIComponent(`Halo Kevin, saya ${form.name}:\n\n${form.message}`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="btn-ghost text-xs px-3 py-1.5 rounded-lg text-emerald-300">
                          <Phone className="w-3.5 h-3.5"/>{co.viaWA[lang]}
                        </a>
                        <a href={`mailto:kvn4.200581@gmail.com?subject=Pesan dari ${form.name}&body=${encodeURIComponent(form.message)}`}
                          className="btn-ghost text-xs px-3 py-1.5 rounded-lg text-[var(--accent-light)]">
                          <Mail className="w-3.5 h-3.5"/>{co.viaEmail[lang]}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {formStatus === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-500/6 border border-emerald-500/18 text-emerald-300 text-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5"/>
                    <span>{co.successMsg[lang]}</span>
                  </div>
                )}

                <button
                  id="contact-submit" type="submit"
                  disabled={formStatus === "loading"}
                  className="btn-accent w-full justify-center py-3.5 rounded-xl text-sm disabled:opacity-50"
                >
                  {formStatus === "loading" ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"/>
                      {co.sending[lang]}
                    </span>
                  ) : (
                    <><Send className="w-4 h-4"/>{co.sendBtn[lang]}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CV MODAL ══════════════ */}
      {resumeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setResumeOpen(false)}
        >
          <div className="card-flat rounded-2xl max-w-md w-full border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-border)] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[var(--accent-light)]"/>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{cv.title[lang]}</p>
                  <p className="text-[10px] text-slate-600">Mohammad Kevin Arif Rudianto</p>
                </div>
              </div>
              <button onClick={() => setResumeOpen(false)}
                className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                <XCircle className="w-5 h-5"/>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="photo-ring w-14 h-14 relative shrink-0">
                  <Image src="/images/logo.png" alt="Kevin" fill sizes="56px" className="object-cover"/>
                </div>
                <div>
                  <p className="font-bold text-white">Mohammad Kevin Arif Rudianto</p>
                  <p className="text-sm text-[var(--accent-light)]">{cv.role[lang]}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{cv.school[lang]}</p>
                </div>
              </div>

              <div className="divider"/>

              <div className="flex flex-col gap-2.5">
                {[cv.item1[lang], cv.item2[lang], cv.item3[lang], cv.item4[lang]].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"/>{item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a href="/CV%20Mohammad%20Kevin.pdf" target="_blank" rel="noopener noreferrer"
                  download="CV Mohammad Kevin.pdf"
                  className="btn-accent flex-1 justify-center text-sm py-2.5 rounded-xl">
                  <Download className="w-4 h-4"/>{cv.downloadBtn[lang]}
                </a>
                <a href="#contact" onClick={() => setResumeOpen(false)}
                  className="btn-ghost flex-1 justify-center text-sm py-2.5 rounded-xl">
                  {cv.contactBtn[lang]}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}