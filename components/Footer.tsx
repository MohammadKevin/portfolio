"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerNav = [
  { label: "./hero", href: "#hero" },
  { label: "./whoami", href: "#whoami" },
  { label: "./stack", href: "#stack" },
  { label: "./projects", href: "#projects" },
  { label: "./timeline", href: "#timeline" },
  { label: "./contact", href: "#contact" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mohammad-kevin-arif-rudianto-945733347",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/MohammadKevin",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mhmdkevin_1/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#060911] text-slate-400 border-t border-slate-800 font-mono">
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-amber-400 font-bold text-sm">kevin@dev-machine:~$</span>
            </div>
            
            <h3 className="text-white font-bold text-base font-sans">
              Mohammad Kevin — Backend & Fullstack Developer
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-md font-sans">
              Siswa SMK Telkom Malang yang berfokus membangun REST API scalable, optimasi skema database relasional (PostgreSQL & MySQL), serta antarmuka web modern dengan Next.js, NestJS, Express, Prisma, dan Tailwind CSS.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="text-amber-400">LOC:</span> Malang, ID
              </span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="text-amber-400">STACK:</span> TypeScript & SQL
              </span>
            </div>
          </div>

          
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">SYSTEM LINKS</span>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0 text-xs">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400 rounded px-1 -ml-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">CONNECT TERMINAL</span>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded bg-slate-900 border border-slate-800 hover:border-amber-400 hover:text-amber-400 text-slate-300 flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-1 mt-2 text-xs">
              <a href="mailto:kvn4.200581@gmail.com" className="text-slate-400 hover:text-amber-400 transition-colors">
                kvn4.200581@gmail.com
              </a>
              <a href="https://wa.me/6282131588846" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
                +62 821-3158-8846
              </a>
            </div>
          </div>

        </div>
      </div>

      
      <div className="border-t border-slate-800/80 bg-[#04060c] py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>SYS_STATUS: 200 OK</span>
            <span className="text-slate-700">|</span>
            <span>BUILD: Next.js 16 (Turbopack)</span>
          </div>
          <div>
            © {new Date().getFullYear()} Mohammad Kevin. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
