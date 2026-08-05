import type { LocalizedString } from "./projects";

export interface Certificate {
  id: string;
  category: string;
  title: LocalizedString | string;
  issuer: LocalizedString | string;
  date: string;
  url?: string;
  skills?: string[];
}

export const certificatesData: Certificate[] = [
  {
    id: "cert-1",
    category: "Professional Certification",
    title: { id: "Belajar Dasar Pemrograman Web", en: "Learn Web Programming Basics" },
    issuer: { id: "Dicoding Indonesia", en: "Dicoding Indonesia" },
    date: "2023",
    url: "https://www.dicoding.com/certificates/NVP790V2RPR0"
  },
  {
    id: "cert-2",
    category: "Course",
    title: { id: "Belajar Dasar Pemrograman JavaScript", en: "Learn JavaScript Programming Basics" },
    issuer: { id: "Dicoding Indonesia", en: "Dicoding Indonesia" },
    date: "2023",
    url: "https://www.dicoding.com/certificates/6MQ26RVE8ZQG"
  },
  {
    id: "cert-3",
    category: "Course",
    title: { id: "Belajar Membuat Front-End Web untuk Pemula", en: "Learn to Build Web Front-End for Beginners" },
    issuer: { id: "Dicoding Indonesia", en: "Dicoding Indonesia" },
    date: "2023",
    url: "https://www.dicoding.com/certificates/2VX3N0KDDZYQ"
  },
  {
    id: "cert-4",
    category: "Course",
    title: { id: "Belajar Membuat Aplikasi Web dengan React", en: "Learn to Build Web Applications with React" },
    issuer: { id: "Dicoding Indonesia", en: "Dicoding Indonesia" },
    date: "2023",
    url: "https://www.dicoding.com/certificates/81P28E7NWZOY"
  },
  {
    id: "cert-5",
    category: "Course",
    title: { id: "Belajar Fundamental Aplikasi Web dengan React", en: "Learn Web Application Fundamentals with React" },
    issuer: { id: "Dicoding Indonesia", en: "Dicoding Indonesia" },
    date: "2023",
    url: "https://www.dicoding.com/certificates/L4PQ4D7ERPO1"
  }
];
