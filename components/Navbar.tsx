"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "./hero", href: "#hero" },
  { label: "./whoami", href: "#whoami" },
  { label: "./stack", href: "#stack" },
  { label: "./projects", href: "#projects" },
  { label: "./github", href: "#github" },
  { label: "./certificates", href: "#certificates" },
  { label: "./timeline", href: "#timeline" },
  { label: "./contact", href: "#contact" },
];

const themes = [
  { name: "amber", label: "Amber CRT", color: "bg-amber-400" },
  { name: "cyan", label: "Cyan CLI", color: "bg-cyan-400" },
  { name: "emerald", label: "Emerald Matrix", color: "bg-emerald-400" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentTheme, setCurrentTheme] = useState("amber");

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("kevin-portfolio-theme") || "amber";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    localStorage.setItem("kevin-portfolio-theme", themeName);
    document.documentElement.setAttribute("data-theme", themeName);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 max-w-7xl mx-auto font-mono">
      <nav
        className={`w-full rounded-xl border border-slate-800 bg-[#0d1117]/90 backdrop-blur-md transition-all duration-300 px-4 sm:px-6 ${
          scrolled ? "py-2.5 shadow-2xl shadow-black/80 border-slate-700" : "py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[var(--primary)] font-bold transition-colors">kevin@dev:~$</span>
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-300 group-hover:text-[var(--primary)] transition-colors">
              sys.profile
            </span>
          </Link>


          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {navItems.map((item) => {
              const secId = item.href.replace("#", "");
              const isActive = activeSection === secId;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 font-bold shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>


          <div className="hidden md:flex items-center gap-4">
            
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider mr-1">THEME:</span>
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => changeTheme(t.name)}
                  title={`Tema ${t.label}`}
                  className={`w-3.5 h-3.5 rounded-sm ${t.color} cursor-pointer transition-transform hover:scale-125 focus-visible:ring-1 focus-visible:ring-white ${
                    currentTheme === t.name ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[var(--primary)] text-slate-950 text-xs font-bold rounded shadow-md hover:brightness-110 transition-all focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>$ ./contact.sh</span>
            </a>
          </div>


          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2 pb-2">
            {navItems.map((item) => {
              const secId = item.href.replace("#", "");
              const isActive = activeSection === secId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 text-xs font-mono rounded transition-colors ${
                    isActive
                      ? "text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 font-bold"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="border-t border-slate-800 mt-2 pt-3 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">CLI Theme:</span>
                <div className="flex items-center gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => changeTheme(t.name)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono border transition-all ${
                        currentTheme === t.name
                          ? "bg-slate-800 border-[var(--primary)] text-[var(--primary)]"
                          : "border-slate-800 text-slate-400"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="w-full py-2 bg-[var(--primary)] text-slate-950 text-xs font-bold rounded text-center"
              >
                $ ./contact.sh
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
