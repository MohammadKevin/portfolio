export interface SkillItem {
  name: string;
  levelTag: string; // e.g., "CORE STACK", "PRIMARY", "SECONDARY"
  desc: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  cmd: string; // e.g. "cat backend.config"
  iconName: string;
  skills: SkillItem[];
  achievements: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & API Architecture",
    cmd: "cat .config/backend.json",
    iconName: "Settings",
    skills: [
      { name: "NestJS", levelTag: "CORE STACK", desc: "Framework TypeScript modular untuk enterprise backend" },
      { name: "Next.js (App Router)", levelTag: "CORE STACK", desc: "Fullstack React framework dengan API routes" },
      { name: "Express.js", levelTag: "CORE STACK", desc: "Microservices & RESTful API lightweight server" },
      { name: "RESTful API", levelTag: "PRIMARY", desc: "Desain spesifikasi Swagger/OpenAPI & JWT Auth" },
    ],
    achievements: [
      "Merancang arsitektur RESTful API modular berbasis NestJS & Express dengan otentikasi JWT & Role-Based Access Control (RBAC).",
      "Membuat middleware validasi skema data terpusat menggunakan Zod & Class-Validator untuk mencegah error payload runtime.",
      "Mengembangkan backend aplikasi kasir (POS) yang mampu menangani kalkulasi transaksi multi-item secara presisi."
    ]
  },
  {
    id: "database",
    title: "Database & ORM Layer",
    cmd: "cat .config/database.json",
    iconName: "Database",
    skills: [
      { name: "Prisma ORM", levelTag: "CORE STACK", desc: "Type-safe database client untuk TypeScript" },
      { name: "PostgreSQL", levelTag: "CORE STACK", desc: "Relational DB dengan pengindeksan advanced" },
      { name: "MySQL", levelTag: "CORE STACK", desc: "Relational DB untuk sistem POS & inventaris" },
      { name: "Redis", levelTag: "PRIMARY", desc: "In-memory caching untuk respons API super cepat" },
    ],
    achievements: [
      "Mempercepat response time query SQL hingga 40% pada project inventory tracker melalui penerapan index & query optimization.",
      "Merancang migrasi skema database relasional kompleks dengan Prisma ORM tanpa downtime data.",
      "Mengimplementasikan transaksi atomic (ACID) untuk mencegah race condition pada pemotongan stok kasir."
    ]
  },
  {
    id: "frontend",
    title: "Frontend & Admin Dashboards",
    cmd: "cat .config/frontend.json",
    iconName: "Code2",
    skills: [
      { name: "Next.js 16", levelTag: "CORE STACK", desc: "React framework dengan Server Components & SSR" },
      { name: "Tailwind CSS", levelTag: "CORE STACK", desc: "Utility-first styling untuk UI dark terminal" },
      { name: "TypeScript", levelTag: "CORE STACK", desc: "Strict type safety di seluruh layer frontend" },
      { name: "React.js", levelTag: "PRIMARY", desc: "Komponen interaktif & state management" },
    ],
    achievements: [
      "Membangun dashboard admin responsif dengan statistik visual real-time dan zero layout shift.",
      "Mengintegrasikan UI bertema developer tools/terminal dengan aksen yang tajam dan kontras tinggi.",
      "Mengoptimalkan bundle size dan mempercepat First Contentful Paint (FCP) di Next.js App Router."
    ]
  },
  {
    id: "tools-secondary",
    title: "Tools & Skill Sekunder",
    cmd: "cat .config/tooling.json",
    iconName: "Wrench",
    skills: [
      { name: "Git & GitHub", levelTag: "TOOLS", desc: "Branching workflow & code review" },
      { name: "Postman", levelTag: "TOOLS", desc: "API testing automation & documentation" },
      { name: "Linux CLI", levelTag: "TOOLS", desc: "Bash scripts, server config, log analysis" },
      { name: "Laravel (PHP)", levelTag: "SECONDARY", desc: "Riwayat pengalaman monolith legacy PHP" },
    ],
    achievements: [
      "Menggunakan Git branching strategy (feature-branching) secara disiplin dalam kolaborasi tim.",
      "Membuat automated collection Postman untuk pengujian regresi API otomatis sebelum deployment.",
      "Memiliki pemahaman dasar Laravel/PHP untuk pemeliharaan atau migrasi sistem legacy ke stack TypeScript modern."
    ]
  }
];
