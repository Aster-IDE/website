import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import HeaderBreadcrumb from "@/components/HeaderBreadcrumb";
import MobileMenu from "@/components/MobileMenu";
import DarkReaderDetector from "@/components/DarkReaderDetector";
import CommandPalette from "@/components/CommandPalette";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import SearchButton from "@/components/SearchButton";
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
      <body className="min-h-full flex flex-col pt-20 pb-20">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ReadingProgressBar />
        <DarkReaderDetector />
        <CommandPalette />
        <header className="fixed left-1/2 -translate-x-1/2 top-4 z-50 border border-border px-10 py-3 rounded-lg bg-background/80 backdrop-blur-sm">
          <nav className="flex items-center justify-between gap-17 sm:items-center">
            <div className="flex items-center gap-3 flex-1 sm:flex-initial">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                aria-hidden
              />
              <HeaderBreadcrumb />
            </div>
            <div className="hidden md:flex items-center justify-end gap-x-4">
              <Link
                href="/"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <span className="text-muted-foreground/30">|</span>
              <Link
                href="/download"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Download
              </Link>
              <span className="text-muted-foreground/30">|</span>
              <Link
                href="/team"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-[#FF82B4] transition-colors hover:text-[#FF82B4]/80 font-semibold"
              >
                Team
              </Link>
              <span className="text-muted-foreground/30">|</span>
              <Link
                href="https://github.com/Aster-IDE/AsterIDE"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                GitHub
              </Link>
              <span className="text-muted-foreground/30">|</span>
              <Link
                href="https://docs.asteride.dev"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Docs
              </Link>
              <span className="text-muted-foreground/30">|</span>
              <SearchButton />
              <span className="text-muted-foreground/30">|</span>
              <ThemeToggle />
            </div>
            
            <div className="flex items-center gap-4 md:hidden">
              <SearchButton />
              <ThemeToggle />
              <MobileMenu />
            </div>
          </nav>
        </header>
        {children}
        <footer className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 border border-border px-10 py-3 rounded-lg bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                aria-hidden
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground whitespace-nowrap">
                Made with 💝 and Rust
              </span>
            </div>
            <div className="text-center text-xs text-muted-foreground whitespace-nowrap">
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
            <div className="flex items-center justify-center gap-x-4">
              <Link
                href="https://github.com/Aster-IDE/AsterIDE/releases"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Releases
              </Link>
              <span className="text-muted-foreground/30">|</span>
              <Link
                href="/credits"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Credits
              </Link>
              <span className="text-muted-foreground/30">|</span>
              <Link
                href="/faq"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                FAQ
              </Link>
              <span className="text-muted-foreground/30">|</span>
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
