import type { LocalizedString } from "./projects";

export interface SystemInfo {
  user: string;
  host: string;
  role: LocalizedString;
  location: string;
  school: string;
  uptime: LocalizedString;
  shell: string;
  status: LocalizedString;
  bio: LocalizedString;
  stats: {
    label: string;
    value: string;
    subtext: LocalizedString;
  }[];
  contactLinks: {
    email: string;
    whatsapp: string;
    linkedin: string;
    github: string;
  };
}

export const whoamiData: SystemInfo = {
  user: "kevin",
  host: "dev-machine",
  role: {
    id: "Backend & Fullstack Developer",
    en: "Backend & Fullstack Developer"
  },
  location: "Malang, Indonesia",
  school: "SMK Telkom Malang",
  uptime: {
    id: "2+ Tahun Pengalaman",
    en: "2+ Years Experience"
  },
  shell: "zsh / bash (developer-tooling)",
  status: {
    id: "ONLINE | Ready for Freelance & Systems Collaboration",
    en: "ONLINE | Ready for Freelance & Systems Collaboration"
  },
  bio: {
    id: "Saya adalah seorang Fullstack & Backend Developer berspesialisasi dalam ekosistem Next.js, NestJS, Express, Prisma ORM, serta manajemen database relasional PostgreSQL & MySQL. Saya berfokus memecahkan masalah integrasi arsitektur API, performa query SQL, serta membangun solusi sistem transaksi Kasir (POS) & Arsip Digital yang andal.",
    en: "I am a Fullstack & Backend Developer specializing in the Next.js, NestJS, Express, and Prisma ORM ecosystem, along with PostgreSQL & MySQL relational database management. I focus on solving API architecture integration issues, optimizing SQL query performance, and building reliable POS & Digital Archive systems."
  },
  stats: [
    { 
      label: "PROYEK SELESAI", 
      value: "6+", 
      subtext: { id: "Sistem POS, Arsip Digital, Admin", en: "POS Systems, Digital Archives, Admin" }
    },
    { 
      label: "PENGALAMAN", 
      value: "2+ Thn", 
      subtext: { id: "Backend & Fullstack Web Dev", en: "Backend & Fullstack Web Dev" } 
    },
    { 
      label: "MAIN STACK", 
      value: "6 Tech", 
      subtext: { id: "Next, Nest, Express, Prisma, PG, MySQL", en: "Next, Nest, Express, Prisma, PG, MySQL" }
    },
    { 
      label: "SKILL SEKUNDER", 
      value: "Node.js", 
      subtext: { id: "Pengalaman runtime JavaScript", en: "JavaScript runtime experience" }
    },
  ],
  contactLinks: {
    email: "mohammadkevin@example.com",
    whatsapp: "https://wa.me/6281234567890",
    linkedin: "https://linkedin.com/in/mohammad-kevin-arif-rudianto-945733347",
    github: "https://github.com/MohammadKevin",
  },
};
