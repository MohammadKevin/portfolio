import type { LocalizedString } from "./projects";

export interface SkillItem {
  name: string;
  level: number; // 1-100
  levelTag: string;
  desc: LocalizedString;
  achievements: LocalizedString[];
  icon?: string; 
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & Database",
    skills: [
      {
        name: "NestJS / Express",
        level: 90,
        levelTag: "Advanced",
        desc: {
          id: "Framework backend Node.js andalan untuk membangun arsitektur API modular.",
          en: "Primary Node.js backend frameworks for building modular API architectures."
        },
        achievements: [
          { id: "Membangun API Management Inventory", en: "Built Inventory Management API" },
          { id: "Mengembangkan Digital Archive Engine", en: "Developed Digital Archive Engine" }
        ],
      },
      {
        name: "PostgreSQL & MySQL",
        level: 85,
        levelTag: "Advanced",
        desc: {
          id: "Manajemen relasional database, indexing, dan optimasi query kompleks.",
          en: "Relational database management, indexing, and complex query optimization."
        },
        achievements: [
          { id: "Optimasi Query Inventory 40% lebih cepat", en: "Optimized Inventory Query 40% faster" },
          { id: "Skema relasi database Kasir POS", en: "Designed POS Cashier database schema relations" }
        ],
      },
      {
        name: "Prisma ORM",
        level: 85,
        levelTag: "Advanced",
        desc: {
          id: "Pemodelan database, migrasi aman, dan type-safe database client di ekosistem Node.",
          en: "Database modeling, safe migrations, and type-safe database client in the Node ecosystem."
        },
        achievements: [
          { id: "Integrasi menyeluruh di Next & NestJS", en: "Comprehensive integration in Next & NestJS" }
        ],
      },
      {
        name: "Laravel (PHP)",
        level: 70,
        levelTag: "Intermediate",
        desc: {
          id: "Pengembangan sistem MVC monolith legacy (kemampuan sekunder / maintainer).",
          en: "Legacy monolithic MVC system development (secondary/maintainer capability)."
        },
        achievements: [
          { id: "Memahami struktur MVC tradisional", en: "Understanding traditional MVC structures" }
        ],
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    skills: [
      {
        name: "Next.js (App Router)",
        level: 88,
        levelTag: "Advanced",
        desc: {
          id: "Fullstack web framework untuk Server-Side Rendering & SEO-friendly React apps.",
          en: "Fullstack web framework for Server-Side Rendering & SEO-friendly React apps."
        },
        achievements: [
          { id: "Membangun Portfolio (Lighthouse 100%)", en: "Built Portfolio (100% Lighthouse)" },
          { id: "Sistem Arsip Publik berbasis SSR", en: "SSR-based Public Archive System" }
        ],
      },
      {
        name: "React & Tailwind CSS",
        level: 85,
        levelTag: "Advanced",
        desc: {
          id: "Pembuatan antarmuka dinamis, state management (Zustand/Context), dan utility-first CSS.",
          en: "Dynamic interface creation, state management (Zustand/Context), and utility-first CSS."
        },
        achievements: [
          { id: "Dashboard Admin Sekolah yang responsif", en: "Responsive School Admin Dashboard" },
          { id: "UI Sistem Kasir POS (Point of Sale)", en: "POS (Point of Sale) Cashier System UI" }
        ],
      },
      {
        name: "TypeScript",
        level: 85,
        levelTag: "Advanced",
        desc: {
          id: "Pengetikan statis yang kuat (Strong-typing) untuk mencegah bug sejak masa kompilasi.",
          en: "Strong static typing to prevent bugs during compilation time."
        },
        achievements: [
          { id: "Type-safety end-to-end (Client & Server)", en: "End-to-end type-safety (Client & Server)" }
        ],
      },
    ],
  },
  {
    id: "tooling",
    title: "Tooling & Environment",
    skills: [
      {
        name: "Git & GitHub",
        level: 85,
        levelTag: "Advanced",
        desc: {
          id: "Version control (Branching, Merge, Resolve conflict) untuk kolaborasi pengembangan.",
          en: "Version control (Branching, Merge, Resolve conflict) for collaborative development."
        },
        achievements: [
          { id: "Manajemen source-code proyek tim", en: "Team project source-code management" }
        ],
      },
      {
        name: "Linux (Debian/Ubuntu)",
        level: 75,
        levelTag: "Intermediate",
        desc: {
          id: "Operasi environment server dasar, bash scripting, dan manajemen VPS ringan.",
          en: "Basic server environment operations, bash scripting, and light VPS management."
        },
        achievements: [
          { id: "Setup & deploy runtime backend di Linux", en: "Setup & deploy backend runtime on Linux" }
        ],
      },
      {
        name: "Postman / REST API Tooling",
        level: 90,
        levelTag: "Advanced",
        desc: {
          id: "Desain, dokumentasi, testing, dan mock-up arsitektur endpoint API.",
          en: "Design, documentation, testing, and mockup of API endpoint architectures."
        },
        achievements: [
          { id: "Testing >50 endpoint sistem Inventory", en: "Tested >50 Inventory system endpoints" }
        ],
      },
    ],
  },
];
