import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import HeaderBreadcrumb from "@/components/HeaderBreadcrumb";
import MobileMenu from "@/components/MobileMenu";
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
  other: {
    "theme-color": "#c33769",
  },
};

const themeInitScript = `
(function() {
  const key = "theme-mode";
  const root = document.documentElement;
  
  const saved = localStorage.getItem(key);
  const mode = saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "system" ? (prefersDark ? "dark" : "light") : mode;
  
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.dataset.theme = mode;
  
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    const currentMode = localStorage.getItem(key);
    if (currentMode === "system") {
      if (e.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  });
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const key = "theme-mode";
                const root = document.documentElement;
                const saved = localStorage.getItem(key);
                const mode = saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const resolved = mode === "system" ? (prefersDark ? "dark" : "light") : mode;
                if (resolved === "dark") {
                  root.classList.add("dark");
                } else {
                  root.classList.remove("dark");
                }
                root.dataset.theme = mode;
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <header className="border-b border-border px-4 py-5">
          <nav className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 sm:items-center">
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                aria-hidden
              />
              <HeaderBreadcrumb />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
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
                  href="/team"
                  className="text-[11px] font-mono uppercase tracking-[0.09em] text-[#FF82B4] transition-colors hover:text-[#FF82B4]/80 font-semibold"
                >
                  Team
                </Link>
                <Link
                  href="https://github.com/Aster-IDE/AsterIDE"
                  className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
                >
                  GitHub
                </Link>
                <Link
                  href="https://docs.asteride.dev"
                  className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
                >
                  Docs
                </Link>
                <ThemeToggle />
              </div>
              
              <div className="flex items-center gap-4 md:hidden">
                <ThemeToggle />
                <MobileMenu />
              </div>
            </div>
          </nav>
        </header>
        {children}
        <footer className="mt-auto border-t border-border px-4 py-5">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-3 text-sm sm:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-center justify-center gap-2 sm:justify-self-start">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                aria-hidden
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground">
                Made with 💝 and Rust
              </span>
            </div>
            <div className="text-center text-xs text-muted-foreground sm:justify-self-center sm:whitespace-nowrap">
              &copy; 2026 AsterIDE. This software follows all principles of the{" "}
              <a
                href="https://www.fsf.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Free Software Foundation
              </a>
              .
            </div>
            <div className="flex text-xs flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-self-end">
              <Link
                href="https://github.com/Aster-IDE/AsterIDE/releases"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Releases
              </Link>
              <Link
                href="/credits"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Credits
              </Link>
              <Link
                href="/team"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Team
              </Link>
              <Link
                href="/faq"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                FAQ
              </Link>
              <Link
                href="https://blog.asteride.dev"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
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
