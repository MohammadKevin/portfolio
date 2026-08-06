"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { whoamiData } from "@/data/whoami";
import { timelineLogs } from "@/data/timeline";
import { skillCategories } from "@/data/skills";
import { Mail, Phone, MapPin, Printer, ArrowLeft, Github, Linkedin } from "lucide-react";

export default function CVPage() {
  const { lang } = useLanguage();
  const tr = translations;
  
  // Filter timeline for experience and academic
  const experiences = timelineLogs.filter(t => t.type === "experience");
  const academics = timelineLogs.filter(t => t.type === "academic");

  return (
    <div className="min-h-screen bg-[#080f1e] text-slate-300 font-sans print:bg-white print:text-black py-10 print:py-0">
      
      {/* Controls (Hidden on Print) */}
      <div className="max-w-4xl mx-auto px-6 mb-6 flex items-center justify-between print:hidden">
        <Link href="/" className="btn-ghost px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>
        <button 
          onClick={() => window.print()}
          className="btn-accent px-4 py-2 rounded-xl text-sm flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          {lang === "id" ? "Cetak PDF" : "Print PDF"}
        </button>
      </div>

      {/* CV Paper */}
      <div className="max-w-4xl mx-auto bg-[#0a132b] print:bg-white print:shadow-none shadow-2xl rounded-2xl overflow-hidden print:rounded-none">
        
        {/* Header Section */}
        <div className="px-8 py-10 border-b border-white/10 print:border-black/20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white print:text-black tracking-tight mb-2">
            Mohammad <span className="text-[var(--accent-light)] print:text-blue-700">Kevin</span> Arif Rudianto
          </h1>
          <p className="text-xl font-medium text-[var(--accent-light)] print:text-gray-700 font-mono mb-6">
            {whoamiData.role[lang]}
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400 print:text-black/70">
            <a href={`mailto:${whoamiData.contactLinks.email}`} className="flex items-center gap-2 hover:text-white print:hover:text-black transition-colors">
              <Mail className="w-4 h-4" />
              {whoamiData.contactLinks.email}
            </a>
            <a href={whoamiData.contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white print:hover:text-black transition-colors">
              <Phone className="w-4 h-4" />
              +62 821-3158-8846
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {whoamiData.location}
            </span>
            <a href={whoamiData.contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white print:hover:text-black transition-colors">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href={whoamiData.contactLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white print:hover:text-black transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-[2.5fr_1.5fr] gap-12">
          
          {/* Left Column (Main) */}
          <div className="flex flex-col gap-10">
            
            {/* Summary */}
            <section>
              <h2 className="text-lg font-bold text-white print:text-black uppercase tracking-widest border-b border-white/10 print:border-black/20 pb-2 mb-4 flex items-center gap-2">
                {tr.about.label[lang]}
              </h2>
              <p className="text-slate-400 print:text-black/80 leading-relaxed text-sm">
                {whoamiData.bio[lang]}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-lg font-bold text-white print:text-black uppercase tracking-widest border-b border-white/10 print:border-black/20 pb-2 mb-6 flex items-center gap-2">
                {lang === "id" ? "Pengalaman" : "Experience"}
              </h2>
              <div className="flex flex-col gap-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="font-bold text-white print:text-black text-base">
                          {typeof exp.role === "string" ? exp.role : exp.role[lang]}
                        </h3>
                        <p className="text-[var(--accent-light)] print:text-blue-700 text-sm font-medium">
                          {exp.org}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-500 print:text-gray-500 whitespace-nowrap bg-white/5 print:bg-gray-100 px-2 py-1 rounded-md">
                        {exp.year}
                      </span>
                    </div>
                    {exp.summary && (
                      <p className="text-sm text-slate-400 print:text-black/80">
                        {typeof exp.summary === "string" ? exp.summary : exp.summary[lang]}
                      </p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-sm text-slate-400 print:text-black/80 space-y-1">
                        {exp.achievements.map((ach, j) => (
                          <li key={j}>{typeof ach === "string" ? ach : ach[lang]}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Academic / Education */}
            <section>
              <h2 className="text-lg font-bold text-white print:text-black uppercase tracking-widest border-b border-white/10 print:border-black/20 pb-2 mb-6 flex items-center gap-2">
                {tr.about.education[lang]}
              </h2>
              <div className="flex flex-col gap-8">
                {academics.map((edu, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="font-bold text-white print:text-black text-base">
                          {edu.org}
                        </h3>
                        <p className="text-[var(--accent-light)] print:text-blue-700 text-sm font-medium">
                          {typeof edu.role === "string" ? edu.role : edu.role[lang]}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-500 print:text-gray-500 whitespace-nowrap bg-white/5 print:bg-gray-100 px-2 py-1 rounded-md">
                        {edu.year}
                      </span>
                    </div>
                    {edu.summary && (
                      <p className="text-sm text-slate-400 print:text-black/80">
                        {typeof edu.summary === "string" ? edu.summary : edu.summary[lang]}
                      </p>
                    )}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-sm text-slate-400 print:text-black/80 space-y-1">
                        {edu.achievements.map((ach, j) => (
                          <li key={j}>{typeof ach === "string" ? ach : ach[lang]}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
            
          </div>

          {/* Right Column (Sidebar) */}
          <div className="flex flex-col gap-10">
            
            {/* Skills */}
            <section>
              <h2 className="text-lg font-bold text-white print:text-black uppercase tracking-widest border-b border-white/10 print:border-black/20 pb-2 mb-6 flex items-center gap-2">
                {tr.skills.label[lang]}
              </h2>
              <div className="flex flex-col gap-6">
                {skillCategories.map(cat => (
                  <div key={cat.id}>
                    <h3 className="text-sm font-bold text-white print:text-black mb-3 opacity-90">{cat.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map(sk => (
                        <span key={sk.name} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300 text-slate-300 print:text-black font-medium">
                          {sk.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Quick Info */}
            <section>
              <h2 className="text-lg font-bold text-white print:text-black uppercase tracking-widest border-b border-white/10 print:border-black/20 pb-2 mb-6 flex items-center gap-2">
                {tr.about.quickInfoLabel[lang]}
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: tr.about.location[lang], value: tr.about.locationVal[lang] },
                  { label: tr.about.primaryStack[lang], value: "Next.js · NestJS · Prisma" },
                  { label: tr.about.database[lang], value: "PostgreSQL & MySQL" },
                ].map(item => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 print:text-gray-500 font-bold uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm text-slate-300 print:text-black/90 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}
