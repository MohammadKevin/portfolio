"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Palette } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

const themes = [
  { id: "indigo",  label: "Indigo",  color: "#6366f1" },
  { id: "rose",    label: "Rose",    color: "#f43f5e" },
  { id: "amber",   label: "Amber",   color: "#f59e0b" },
  { id: "emerald", label: "Emerald", color: "#10b981" },
  { id: "cyan",    label: "Cyan",    color: "#06b6d4" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  const [menuOpen,  setMenuOpen]  = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentTheme,  setCurrentTheme]  = useState("indigo");

  const n = translations.nav;

  const navItems = [
    { label: n.home[lang],     href: "#hero"         },
    { label: n.about[lang],    href: "#whoami"        },
    { label: n.skills[lang],   href: "#stack"         },
    { label: n.projects[lang], href: "#projects"      },
    { label: n.github[lang],   href: "#github"        },
    { label: n.certs[lang],    href: "#certificates"  },
    { label: n.timeline[lang], href: "#timeline"      },
    { label: n.contact[lang],  href: "#contact"       },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("kv-theme") || "indigo";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ["hero","whoami","stack","projects","github","certificates","timeline","contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyTheme = (id: string) => {
    setCurrentTheme(id);
    localStorage.setItem("kv-theme", id);
    document.documentElement.setAttribute("data-theme", id);
    setThemeOpen(false);
  };

  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080f1e]/95 backdrop-blur-md border-b border-white/6 shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* ── Brand ─────────────────────────── */}
        <Link href="/" id="navbar-brand" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20
            group-hover:border-[var(--accent-border)] transition-all">
            <Image
              src="/images/icon.png"
              alt="Kevin"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden sm:block">
            Mohammad Kevin
          </span>
        </Link>

        {/* ── Desktop Nav ─────────────────── */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const active = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? "text-[var(--accent-light)] bg-[var(--accent-muted)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* ── Right Controls ──────────────── */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* ── Language Toggle ──── */}
          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => setLang("id")}
              className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-bold transition-all ${
                lang === "id" 
                  ? "bg-[var(--accent-muted)] text-[var(--accent-light)] border border-[var(--accent-border)]" 
                  : "text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-bold transition-all ${
                lang === "en" 
                  ? "bg-[var(--accent-muted)] text-[var(--accent-light)] border border-[var(--accent-border)]" 
                  : "text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              EN
            </button>
          </div>

          {/* ── Theme Switcher ───── */}
          <div className="relative">
            <button
              id="theme-toggle-btn"
              onClick={() => setThemeOpen(!themeOpen)}
              title="Ganti tema warna"
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-[var(--accent-light)] bg-white/5 hover:bg-[var(--accent-muted)] border border-white/10 hover:border-[var(--accent-border)] transition-all"
              aria-label="Theme switcher"
            >
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {themeOpen && (
              <div
                id="theme-panel"
                className="absolute right-0 top-full mt-2 card-flat p-3 flex flex-col gap-2 min-w-[160px] shadow-2xl shadow-black/50 border border-white/8"
              >
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-1">
                  {n.themeLabel[lang]}
                </p>
                <div className="flex flex-col gap-0.5">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      id={`theme-${t.id}`}
                      onClick={() => applyTheme(t.id)}
                      className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm
                        transition-all cursor-pointer text-left ${
                        currentTheme === t.id
                          ? "bg-white/8 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                        style={{ background: t.color }}
                      />
                      {t.label}
                      {currentTheme === t.id && (
                        <span className="ml-auto text-[10px] text-[var(--accent-light)]">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Hire Me CTA ────── */}
          <a
            href="#contact"
            id="navbar-cta"
            className="hidden sm:inline-flex btn-accent text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg"
          >
            {n.hireMe[lang]}
          </a>

          {/* ── Mobile Menu Toggle ── */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-[var(--accent-light)] bg-white/5 hover:bg-[var(--accent-muted)] border border-white/10 hover:border-[var(--accent-border)] transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────── */}
      {menuOpen && (
        <div className="lg:hidden mx-3 mb-3 card-flat p-3 flex flex-col gap-1 border border-white/8">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const active = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "text-[var(--accent-light)] bg-[var(--accent-muted)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="mt-1 pt-2 border-t border-white/6 sm:hidden">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-accent w-full justify-center text-sm py-2.5 rounded-lg"
            >
              {n.hireMe[lang]}
            </a>
          </div>
        </div>
      )}

      {/* Close theme panel on outside click */}
      {themeOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setThemeOpen(false)} />
      )}
    </header>
  );
}
