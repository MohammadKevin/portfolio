# Panduan Konfigurasi Database Supabase

Untuk menggunakan penyimpanan cloud gratis yang aman dan persisten (agar data Anda tidak hilang saat dideploy di Vercel), silakan ikuti panduan berikut untuk membuat tabel di Supabase.

---

## 1. Buat Tabel di Dashboard Supabase
1. Masuk ke dashboard **[Supabase](https://supabase.com/)** Anda.
2. Buka proyek Anda, lalu navigasikan ke menu **SQL Editor** di bilah sisi kiri.
3. Klik tombol **New Query** untuk membuat lembar editor baru.
4. Salin kode SQL berikut dan tempelkan ke dalam editor tersebut:

```sql
-- ----------------------------------------------------
-- 1. PEMBUATAN TABEL PROYEK (projects)
-- ----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id text PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  color text NOT NULL,
  "desc" text NOT NULL,
  tech jsonb NOT NULL,
  "demoUrl" text DEFAULT '',
  "repoUrl" text DEFAULT '',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- JIKA TABEL SUDAH ADA, JALANKAN SQL INI DI SUPABASE SQL EDITOR:
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS "demoUrl" text DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS "repoUrl" text DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS demo_url text DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS repo_url text DEFAULT '';

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Buat Kebijakan Keamanan (Policies) agar API Route Next.js Anda bisa mengakses data
CREATE POLICY "Allow public read and write projects" 
ON public.projects 
FOR ALL 
USING (true) 
WITH CHECK (true);


-- ----------------------------------------------------
-- 2. PEMBUATAN TABEL ANALITIK PENGUNJUNG (visitors)
-- ----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visitors (
  id text PRIMARY KEY,
  timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  ip text NOT NULL,
  device text NOT NULL,
  os text NOT NULL,
  browser text NOT NULL,
  user_agent text NOT NULL
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Buat Kebijakan Keamanan (Policies) agar API Route Next.js Anda bisa mengakses data
CREATE POLICY "Allow public read and write visitors" 
ON public.visitors 
FOR ALL 
USING (true) 
WITH CHECK (true);
```

5. Klik tombol **Run** di pojok kanan bawah editor untuk mengeksekusi perintah SQL tersebut. Anda akan melihat pesan sukses.

---

## 2. Hubungkan ke Next.js (Local & Production)

### A. Pengujian Lokal (Localhost)
1. Buat file bernama `.env.local` di folder root project Anda (jika belum ada).
2. Salin nilai dari `.env.example` ke dalam `.env.local` dan isi dengan nilai API Key Anda yang diperoleh dari dashboard Supabase Anda (**Project Settings** -> **API**):

```env
SUPABASE_URL=https://proyek-anda.supabase.co
SUPABASE_ANON_KEY=ey... (masukkan public anon key Anda)
```

3. Restart server pengembangan lokal Anda (`npm run dev`). Backend akan mendeteksi Supabase secara otomatis dan mulai menggunakannya sebagai database utama.

### B. Deployment Production (Vercel)
1. Buka dashboard **Vercel** Anda dan pilih proyek portofolio Anda.
2. Buka tab **Settings** -> **Environment Variables**.
3. Tambahkan dua variabel lingkungan baru dengan nilai yang sama seperti di lokal:
   * Nama: `SUPABASE_URL` | Nilai: `https://proyek-anda.supabase.co`
   * Nama: `SUPABASE_ANON_KEY` | Nilai: `ey...` (public anon key Anda)
4. Klik **Save**.
5. Deploy ulang (Redeploy) aplikasi Anda di Vercel agar perubahan variabel lingkungan tersebut diterapkan.

*Catatan: Sistem backend didesain secara **hybrid**. Jika Anda belum mengonfigurasi variabel Supabase di atas, aplikasi Next.js Anda akan secara otomatis menggunakan fallback file JSON lokal di komputer Anda tanpa menyebabkan error.*
