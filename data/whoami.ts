export interface SystemInfo {
  user: string;
  host: string;
  role: string;
  location: string;
  school: string;
  uptime: string;
  shell: string;
  status: string;
  bio: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
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
  role: "Backend & Fullstack Developer",
  location: "Malang, Indonesia",
  school: "SMK Telkom Malang",
  uptime: "2+ Tahun Pengalaman",
  shell: "zsh / bash (developer-tooling)",
  status: "ONLINE | Ready for Freelance & Systems Collaboration",
  bio: "Saya adalah seorang Fullstack & Backend Developer berspesialisasi dalam ekosistem Next.js, NestJS, Express, Prisma ORM, serta manajemen database relasional PostgreSQL & MySQL. Saya berfokus memecahkan masalah integrasi arsitektur API, performa query SQL, serta membangun solusi sistem transaksi Kasir (POS) & Arsip Digital yang andal.",
  stats: [
    { label: "PROYEK SELESAI", value: "6+", subtext: "Sistem POS, Arsip Digital, Admin" },
    { label: "PENGALAMAN", value: "2+ Thn", subtext: "Backend & Fullstack Web Dev" },
    { label: "MAIN STACK", value: "6 Tech", subtext: "Next, Nest, Express, Prisma, PG, MySQL" },
    { label: "SKILL SEKUNDER", value: "Laravel", subtext: "Pengalaman monolith legacy PHP" },
  ],
  contactLinks: {
    email: "mohammadkevin@example.com",
    whatsapp: "https://wa.me/6281234567890",
    linkedin: "https://linkedin.com/in/mohammad-kevin-arif-rudianto-945733347",
    github: "https://github.com/MohammadKevin",
  },
};
