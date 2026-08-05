import type { LocalizedString } from "./projects";

export interface TimelineLog {
  id: string;
  year: string;
  role: LocalizedString;
  org: string;
  type: "academic" | "project" | "achievement";
  summary: LocalizedString;
  achievements: LocalizedString[];
  tech?: string[];
  icon?: string;
}

export const timelineLogs: TimelineLog[] = [
  {
    id: "log-1",
    year: "2024 - Sekarang",
    role: { id: "Freelance & Backend Developer", en: "Freelance & Backend Developer" },
    org: "Independent",
    type: "project",
    summary: { 
      id: "Membangun sistem dan API RESTful untuk kebutuhan bisnis skala kecil hingga menengah.", 
      en: "Building systems and RESTful APIs for small to medium-scale business needs." 
    },
    achievements: [
      { id: "Mendeploy sistem Kasir POS full-stack (Next.js & MySQL).", en: "Deployed full-stack POS Cashier system (Next.js & MySQL)." },
      { id: "Mengembangkan API manajemen stok gudang (NestJS & Prisma).", en: "Developed warehouse stock management API (NestJS & Prisma)." }
    ],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
  },
  {
    id: "log-2",
    year: "2021 - 2024",
    role: { id: "Siswa Rekayasa Perangkat Lunak", en: "Software Engineering Student" },
    org: "SMK Telkom Malang",
    type: "academic",
    summary: { 
      id: "Mempelajari dasar-dasar algoritma, pengembangan perangkat lunak, dan arsitektur basis data.", 
      en: "Learned fundamentals of algorithms, software development, and database architecture." 
    },
    achievements: [
      { id: "Membangun proyek sistem arsip digital berbasis web.", en: "Built a web-based digital archive system project." },
      { id: "Lulus dengan nilai kompetensi sangat baik.", en: "Graduated with excellent competency scores." }
    ],
    tech: ["PHP", "Laravel", "MySQL", "JavaScript"],
  },
];
