"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
];

const themes = [
    { name: "blue", label: "Blue", color: "bg-[#3b82f6]" },
    { name: "indigo", label: "Indigo", color: "bg-[#6366f1]" },
    { name: "emerald", label: "Emerald", color: "bg-[#10b981]" },
    { name: "rose", label: "Rose", color: "bg-[#f43f5e]" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [currentTheme, setCurrentTheme] = useState("blue");

    useEffect(() => {
        const savedTheme = localStorage.getItem("kevin-portfolio-theme") || "blue";
        setCurrentTheme(savedTheme);
        if (savedTheme === "blue") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", savedTheme);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navItems.map((item) => item.href.replace("#", ""));
            for (const section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el && window.scrollY >= el.offsetTop - 140) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const changeTheme = (themeName: string) => {
        setCurrentTheme(themeName);
        localStorage.setItem("kevin-portfolio-theme", themeName);
        if (themeName === "blue") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", themeName);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 floating-nav-container max-w-7xl mx-auto">
            <nav
                className={`floating-nav w-full transition-all duration-500 px-6 lg:px-8 ${
                    scrolled
                        ? "py-2 bg-background/80 shadow-lg"
                        : "py-3.5 bg-background/50"
                }`}
            >
                <div className="flex items-center justify-between h-14">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-gray-950 font-extrabold text-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:rotate-3 transition-all duration-300">
                            M
                        </div>
                        <span className="font-extrabold text-white text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
                            Mohammad Kevin
                        </span>
                    </Link>


                    <ul className="hidden md:flex items-center gap-2 list-none m-0 p-0">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative ${activeSection === item.href.replace("#", "")
                                            ? "text-primary font-semibold bg-white/5"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {item.label}
                                    {activeSection === item.href.replace("#", "") && (
                                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>


                    <div className="hidden md:flex items-center gap-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-full">
                            {themes.map((t) => (
                                <button
                                    key={t.name}
                                    onClick={() => changeTheme(t.name)}
                                    title={`Tema ${t.label}`}
                                    className={`w-4 h-4 rounded-full ${t.color} cursor-pointer transition-all duration-300 hover:scale-120 hover:shadow-md ${
                                        currentTheme === t.name
                                            ? "ring-2 ring-white scale-110 shadow-sm"
                                            : "opacity-50 hover:opacity-100"
                                    }`}
                                />
                            ))}
                        </div>

                        <a
                            href="#contact"
                            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-gray-950 hover:text-black text-sm font-bold rounded-full shadow-lg shadow-primary/10 hover:shadow-primary/30 hover:scale-102 active:scale-98 transition-all duration-300"
                        >
                            Let's Talk
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu (Floating just below pill) */}
            {menuOpen && (
                <div className="md:hidden mt-2 bg-background/95 border border-white/8 backdrop-blur-lg px-6 py-6 flex flex-col gap-2 rounded-3xl shadow-2xl animate-fade-in">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${activeSection === item.href.replace("#", "")
                                    ? "text-primary bg-white/5 font-semibold"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                    <div className="border-t border-white/10 mt-4 pt-4 flex flex-col gap-4">
                        {/* Mobile Theme Switcher */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Aksen Warna</span>
                            <div className="flex items-center gap-3">
                                {themes.map((t) => (
                                    <button
                                        key={t.name}
                                        onClick={() => changeTheme(t.name)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-2 border transition-all duration-300 ${
                                            currentTheme === t.name
                                                ? "bg-white/10 border-primary"
                                                : "bg-white/5 border-transparent opacity-60"
                                        }`}
                                    >
                                        <span className={`w-3 h-3 rounded-full ${t.color}`} />
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            className="block px-5 py-3.5 bg-gradient-to-r from-primary to-secondary text-gray-950 text-base font-bold rounded-xl text-center shadow-lg shadow-primary/10"
                        >
                            Let's Talk
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}


