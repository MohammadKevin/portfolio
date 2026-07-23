export interface TimelineLog {
  commitHash: string;
  period: string;
  title: string;
  role: string;
  tag: "PRODUCTION" | "EDUCATION" | "PROJECT";
  branch: string;
  summary: string;
  achievements: string[];
  techStack: string[];
}

export const timelineLogs: TimelineLog[] = [
  {
    commitHash: "commit c7d9a10",
    period: "2024 - Sekarang",
    title: "Freelance Backend & Fullstack Developer",
    role: "Independent System Developer",
    tag: "PRODUCTION",
    branch: "main/production",
    summary: "Mengembangkan aplikasi sistem transaksi kasir (POS), arsip digital dokumen, dan API microservices untuk berbagai klien bisnis dan UMKM.",
    achievements: [
      "Merancang dan mendepoy sistem POS toko dengan modul cetak faktur & pemotongan stok otomatis.",
      "Membangun API RESTful scalable menggunakan NestJS, Express, Prisma ORM, dan database PostgreSQL.",
      "Mengintegrasikan dashboard manajemen berkas digital dengan enkripsi dokumen."
    ],
    techStack: ["Next.js", "NestJS", "Express", "Prisma", "PostgreSQL", "MySQL"]
  },
  {
    commitHash: "commit 4f12e8b",
    period: "2023 - 2024",
    title: "Siswa Rekayasa Perangkat Lunak (RPL)",
    role: "SMK Telkom Malang",
    tag: "EDUCATION",
    branch: "feature/academic-core",
    summary: "Memperdalam fondasi ilmu komputer, arsitektur database relasional, pemrograman berorientasi objek, serta pengembangan aplikasi web modern.",
    achievements: [
      "Memimpin tim pengembangan project tugas akhir sistem sistem informasi sekolah.",
      "Mempelajari optimasi struktur data, algoritma, serta query SQL tingkat lanjut.",
      "Membangun portofolio project fullstack berbasis Node.js & React."
    ],
    techStack: ["Node.js", "React.js", "MySQL", "Git", "Tailwind CSS"]
  },
  {
    commitHash: "commit 10a9c4d",
    period: "2022 - 2023",
    title: "Eksplorasi Web Development & Open Source",
    role: "Self-Driven Explorer",
    tag: "PROJECT",
    branch: "init/learning-curve",
    summary: "Memulai perjalanan pemrograman web dengan membuat berbagai utility scripts, manipulasi DOM, dan arsitektur server dasar.",
    achievements: [
      "Mempelajari sintaks TypeScript dasar hingga penerapan strict type safety.",
      "Melakukan eksperimen perancangan skema database MySQL & PostgreSQL.",
      "Mengembangkan kebiasaan dokumentasi kode dan version control menggunakan Git & GitHub."
    ],
    techStack: ["JavaScript", "TypeScript", "HTML5/CSS3", "Git"]
  }
];
