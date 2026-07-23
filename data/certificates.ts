export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
  category: "Backend" | "Fullstack" | "Database" | "General";
}

export const certificatesData: Certificate[] = [
  {
    id: "cert-1",
    title: "Backend Developer & RESTful API Engineering",
    issuer: "SMK Telkom Malang / Industry Credential",
    date: "2024",
    credentialUrl: "https://github.com/MohammadKevin",
    skills: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
    category: "Backend"
  },
  {
    id: "cert-2",
    title: "Fullstack Web Application Development",
    issuer: "Kemendikbudristek / Vocational Certification",
    date: "2024",
    credentialUrl: "https://github.com/MohammadKevin",
    skills: ["Next.js", "React.js", "MySQL", "Tailwind CSS"],
    category: "Fullstack"
  },
  {
    id: "cert-3",
    title: "Database Design & Performance Tuning",
    issuer: "Developer Academy Certificate",
    date: "2023",
    credentialUrl: "https://github.com/MohammadKevin",
    skills: ["PostgreSQL", "MySQL", "Indexing", "Query Optimization"],
    category: "Database"
  }
];
