"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Visitor {
  id: string;
  timestamp: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  userAgent: string;
}

export default function Analytics() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {

    if (sessionStorage.getItem("kevin-analytics-auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    fetch("/api/visit")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVisitors(data.visitors);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshKey, isAuthenticated]);

  const totalVisits = visitors.length;
  const desktopCount = visitors.filter((v) => v.device === "Desktop").length;
  const mobileCount = visitors.filter((v) => v.device === "Mobile").length;
  const tabletCount = visitors.filter((v) => v.device === "Tablet").length;

  const desktopPct = totalVisits ? Math.round((desktopCount / totalVisits) * 100) : 0;
  const mobilePct = totalVisits ? Math.round((mobileCount / totalVisits) * 100) : 0;
  const tabletPct = totalVisits ? Math.round((tabletCount / totalVisits) * 100) : 0;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch (e) {
      return isoString;
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device === "Desktop") return "💻";
    if (device === "Mobile") return "📱";
    return "📟";
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "kevin" && password === "kevin135") {
      sessionStorage.setItem("kevin-analytics-auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Username atau password salah!");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">

        <div className="absolute top-[15%] left-[-10%] w-[30rem] h-[30rem] bg-primary/10 glow-blob animate-glow-1" />
        <div className="absolute bottom-[15%] right-[-10%] w-[30rem] h-[30rem] bg-secondary/10 glow-blob animate-glow-2" />

        <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-white/5 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary mb-4 transition-colors group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Portfolio
            </Link>
            <h1 className="text-2xl font-black text-white">Area Terbatas</h1>
            <p className="text-xs text-gray-400 mt-1">Masukkan kredensial untuk melihat analitik pengunjung.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Username</label>
              <input
                type="text"
                required
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm text-white bg-white/5 focus:bg-white/10 transition-all w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Password</label>
              <input
                type="password"
                required
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm text-white bg-white/5 focus:bg-white/10 transition-all w-full"
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl">
                ⚠️ {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4.5 bg-gradient-to-r from-primary to-secondary text-gray-955 font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer text-center"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-16 relative overflow-hidden">

      <div className="absolute top-[5%] left-[-15%] w-[35rem] h-[35rem] bg-primary/10 glow-blob animate-glow-1" />
      <div className="absolute bottom-[10%] right-[-15%] w-[40rem] h-[40rem] bg-secondary/10 glow-blob animate-glow-2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary mb-3 transition-colors group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Portfolio
            </Link>
            <h1 className="text-4xl font-extrabold text-white">Analitik Pengunjung</h1>
            <p className="text-xs text-gray-400 mt-1">Data kunjungan yang terekam secara lokal di server website.</p>
          </div>

          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-white/10 hover:border-primary hover:text-primary rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50 cursor-pointer w-fit"
          >
            <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18v3" />
            </svg>
            Segarkan Data
          </button>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Total Kunjungan</span>
            <div className="text-4xl font-black text-white mt-2">{totalVisits}</div>
            <p className="text-[11px] text-gray-500 mt-1">Jumlah tayangan halaman utama</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Desktop</span>
            <div className="text-4xl font-black text-white mt-2">
              {desktopCount} <span className="text-lg font-normal text-gray-400">({desktopPct}%)</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Komputer & Laptop</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Mobile</span>
            <div className="text-4xl font-black text-white mt-2">
              {mobileCount} <span className="text-lg font-normal text-gray-400">({mobilePct}%)</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Smartphone / HP</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Tablet & Lainnya</span>
            <div className="text-4xl font-black text-white mt-2">
              {tabletCount} <span className="text-lg font-normal text-gray-400">({tabletPct}%)</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">iPad, Tablet, & Device lainnya</p>
          </div>
        </div>


        <div className="glass-card p-6 rounded-2xl border border-white/5 mb-10">
          <h3 className="text-sm font-bold text-white mb-4">Rasio Distribusi Perangkat</h3>
          <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden flex">
            <div className="h-full bg-primary transition-all" style={{ width: `${desktopPct}%` }} title={`Desktop: ${desktopPct}%`} />
            <div className="h-full bg-indigo-500 transition-all" style={{ width: `${mobilePct}%` }} title={`Mobile: ${mobilePct}%`} />
            <div className="h-full bg-amber-500 transition-all" style={{ width: `${tabletPct}%` }} title={`Lainnya: ${tabletPct}%`} />
          </div>
          <div className="flex flex-wrap gap-6 mt-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-primary" />
              <span className="text-gray-300">Desktop ({desktopPct}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-500" />
              <span className="text-gray-300">Mobile ({mobilePct}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500" />
              <span className="text-gray-300">Tablet / Lainnya ({tabletPct}%)</span>
            </div>
          </div>
        </div>


        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Log Aktivitas Terbaru</h3>
            <span className="text-xs text-gray-500">Maks. 1000 data kunjungan terakhir</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-bold text-gray-400 uppercase bg-white/[0.01]">
                  <th className="p-4 pl-6">Waktu Kunjungan</th>
                  <th className="p-4">Perangkat</th>
                  <th className="p-4">Sistem Operasi (OS)</th>
                  <th className="p-4">Browser</th>
                  <th className="p-4">Alamat IP</th>
                  <th className="p-4 pr-6">User Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Memuat riwayat kunjungan...
                      </div>
                    </td>
                  </tr>
                ) : visitors.length > 0 ? (
                  visitors.map((visitor) => (
                    <tr key={visitor.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 pl-6 font-semibold text-white whitespace-nowrap">
                        {formatDate(visitor.timestamp)}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded-lg font-medium text-white">
                          <span>{getDeviceIcon(visitor.device)}</span>
                          {visitor.device}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-gray-200">{visitor.os}</td>
                      <td className="p-4 font-medium text-gray-200">{visitor.browser}</td>
                      <td className="p-4 font-mono text-[11px] text-gray-400">{visitor.ip}</td>
                      <td className="p-4 pr-6 font-mono text-[10px] text-gray-500 max-w-xs truncate" title={visitor.userAgent}>
                        {visitor.userAgent}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-500">
                      Belum ada data kunjungan yang terekam.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
