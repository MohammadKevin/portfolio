import Link from "next/link";

const footerLinks = {
    Services: ["UI/UX Design", "Web Development", "Mobile App", "Branding", "Consulting"],
    Company: ["About Me", "Portfolio", "Blog", "Process", "Testimonials"],
    Support: ["FAQ", "Privacy Policy", "Terms of Service", "Sitemap"],
};

const socials = [
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.952-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.39 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 12.35 2.077 12.6 1.675 12.604c-.014.073-.025.15-.025.228 0 3.576 1.362 6.836 3.73 9.27zm11.48-15.73c-2.24-1.988-5.2-3.26-8.47-3.26-.97 0-1.92.12-2.83.34 1.36 2.042 3.7 4.53 5.51 6.57l.006-.01c.99-.61 2.84-1.69 5.78-3.64z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-9 h-9 bg-[#6FD1D7] rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:bg-[#5fbfc4] transition-all duration-300">
                                M
                            </div>
                            <span className="font-extrabold text-white text-lg tracking-tight">Mohammad Kevin</span>
                        </Link>

                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            A Freelance UI/UX Designer & Developer based in London. I build immersive and beautiful web applications through creative design.
                        </p>

                        <div className="flex items-center gap-3 mt-1">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#6FD1D7] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <a href="mailto:kvn4.200581@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#6FD1D7] transition-colors duration-200">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                kvn4.200581@gmail.com
                            </a>
                            <a href="https://wa.link/tjp6xq" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#6FD1D7] transition-colors duration-200">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +62 821-3158-8846
                            </a>
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="flex flex-col gap-4">
                            <h4 className="text-white font-semibold text-sm tracking-wide">{title}</h4>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-400 hover:text-[#6FD1D7] transition-colors duration-200 hover:translate-x-0.5 inline-block"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Brooklyn Gilbert. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-gray-500 hover:text-[#6FD1D7] transition-colors duration-200">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-[#6FD1D7] transition-colors duration-200">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
