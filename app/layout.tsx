import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import HeaderBreadcrumb from "@/components/HeaderBreadcrumb";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AsterIDE",
  description: "A Simple Text Editor written in Rust.",
};

const themeInitScript = `
(() => {
  const key = "theme-mode";
  const root = document.documentElement;
  const saved = localStorage.getItem(key);
  const mode = saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "system" ? (prefersDark ? "dark" : "light") : mode;
  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = mode;
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border px-4 py-5">
          <nav className="mx-auto flex w-full max-w-5xl flex-wrap items-start justify-between gap-3 sm:items-center">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                aria-hidden
              />
              <HeaderBreadcrumb />
            </div>
            <div className="ml-auto flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
              <Link
                href="/"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/download"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Download
              </Link>
              <Link
                href="https://github.com/Aster-IDE/AsterIDE"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                GitHub
              </Link>
              <Link
                href="/credits"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Credits
              </Link>
              <Link
                href="https://docs.asteride.dev"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Docs
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>
        {children}
        <footer className="mt-auto border-t border-zinc-200 px-4 py-6 dark:border-zinc-800">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 text-sm sm:grid-cols-[1fr_auto_1fr]">
            <div className="text-center text-muted-foreground sm:justify-self-start sm:text-left">
              Made with 💝 and Rust.
            </div>
            <div className="text-center text-zinc-500 sm:justify-self-center sm:whitespace-nowrap">
              &copy; 2026 AsterIDE. This software follows the principles of the{" "}
              <a
                href="https://www.fsf.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                Free Software Foundation
              </a>
              .
            </div>
            <div className="flex justify-center gap-6 sm:justify-self-end sm:justify-end">
              <Link
                href="/download"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Download
              </Link>
              <Link
                href="https://github.com/Aster-IDE/AsterIDE"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </Link>
              <Link
                href="https://github.com/Aster-IDE/AsterIDE/releases"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Releases
              </Link>
                            <Link
                href="https://blog.asteride.dev"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
