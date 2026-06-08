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

const isStaging = process.env.NEXT_PUBLIC_IS_STAGING === "true";
const isLocal = process.env.NODE_ENV === "development";

function getEnvironmentLabel(): string {
  if (isStaging) return "(Staging)";
  if (isLocal) return "(Local)";
  return "";
}

const envLabel = getEnvironmentLabel();

export const metadata: Metadata = {
  title: envLabel ? `AsterIDE ${envLabel}` : "AsterIDE",
  description: "A Simple Text Editor written in Rust.",
  other: {
    "theme-color": "#c33769",
  },
};

export function getPageTitle(baseTitle: string): string {
  return envLabel ? `${baseTitle} ${envLabel}` : baseTitle;
}


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
      <body className="min-h-full flex flex-col pt-20 pb-20 relative">
        <ReadingProgressBar />
        <DarkReaderDetector />
        <CommandPalette />
        <header className="fixed left-1/2 -translate-x-1/2 top-4 z-50 border border-border px-10 py-3 rounded-lg bg-background/80 backdrop-blur-sm">
          <nav className="flex items-center justify-between gap-17 sm:items-center">
            <div className="flex items-center gap-3 flex-1 sm:flex-initial">
              <svg
                className="w-5 h-5 text-primary"
                style={{ filter: "drop-shadow(0 0 3px var(--primary))" }}
                viewBox="0 0 36 36"
                fill="currentColor"
                aria-hidden
              >
                <path d="M31.298 20.807c4.197-1.363 5.027-3.182 4.191-6.416-.952.308-2.105-.001-2.272-.518-.168-.513.581-1.443 1.533-1.753-1.223-3.107-2.964-4.089-7.161-2.727-1.606.522-3.238 1.492-4.655 2.635C23.582 10.327 24 8.475 24 6.786c0-4.412-1.473-5.765-4.807-5.968 0 1-.652 2-1.193 2s-1.194-1-1.194-2C13.472 1.021 12 2.374 12 6.786c0 1.689.417 3.541 1.066 5.241-1.416-1.142-3.049-2.111-4.655-2.633-4.197-1.364-5.938-.381-7.162 2.727.951.31 1.701 1.238 1.534 1.753-.167.515-1.32.826-2.271.518-.837 3.233-.005 5.052 4.19 6.415 1.606.521 3.497.697 5.314.605-1.524.994-2.95 2.247-3.943 3.613-2.594 3.57-2.197 5.53.381 7.654.588-.809 1.703-1.235 2.142-.917.438.317.378 1.511-.21 2.32 2.816 1.795 4.803 1.565 7.396-2.003.993-1.366 1.743-3.111 2.218-4.867.475 1.757 1.226 3.501 2.218 4.867 2.594 3.57 4.58 3.798 7.397 2.003-.587-.81-.649-2.002-.21-2.321.437-.317 1.553.107 2.142.917 2.577-2.123 2.973-4.083.381-7.653-.993-1.366-2.42-2.619-3.943-3.613 1.816.092 3.706-.084 5.313-.605zM18 20.337c-.162-.292-.353-.538-.588-.709-.234-.171-.528-.276-.856-.341.228-.244.403-.502.493-.778.09-.275.1-.587.059-.919.302.141.602.228.892.228s.59-.087.894-.229c-.041.332-.031.644.059.919.09.276.265.534.492.778-.327.065-.621.17-.855.341-.236.172-.428.418-.59.71z"/>
                <circle cx="18" cy="18.818" r="4" fill="currentColor"/>
              </svg>
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
              <div className="relative group flex items-center">
                <Link
                  href="/download"
                  className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
                >
                  Download
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-background border border-border shadow-md py-1">
                    <Link
                      href="/download/windows"
                      className="block px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary hover:bg-accent/50"
                    >
                      Windows
                    </Link>
                    <Link
                      href="/download/macos"
                      className="block px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary hover:bg-accent/50"
                    >
                      macOS
                    </Link>
                    <Link
                      href="/download/linux"
                      className="block px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary hover:bg-accent/50"
                    >
                      Linux
                    </Link>
                    <Link
                      href="/download/freebsd"
                      className="block px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary hover:bg-accent/50"
                    >
                      FreeBSD
                    </Link>
                    <Link
                      href="/download/nix"
                      className="block px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary hover:bg-accent/50"
                    >
                      Nix
                    </Link>
                  </div>
                </div>
              </div>
              <span className="text-muted-foreground/30">|</span>
              <Link
                href="/team"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
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
              <svg
                className="w-5 h-5 text-primary"
                style={{ filter: "drop-shadow(0 0 3px var(--primary))" }}
                viewBox="0 0 36 36"
                fill="currentColor"
                aria-hidden
              >
                <path d="M31.298 20.807c4.197-1.363 5.027-3.182 4.191-6.416-.952.308-2.105-.001-2.272-.518-.168-.513.581-1.443 1.533-1.753-1.223-3.107-2.964-4.089-7.161-2.727-1.606.522-3.238 1.492-4.655 2.635C23.582 10.327 24 8.475 24 6.786c0-4.412-1.473-5.765-4.807-5.968 0 1-.652 2-1.193 2s-1.194-1-1.194-2C13.472 1.021 12 2.374 12 6.786c0 1.689.417 3.541 1.066 5.241-1.416-1.142-3.049-2.111-4.655-2.633-4.197-1.364-5.938-.381-7.162 2.727.951.31 1.701 1.238 1.534 1.753-.167.515-1.32.826-2.271.518-.837 3.233-.005 5.052 4.19 6.415 1.606.521 3.497.697 5.314.605-1.524.994-2.95 2.247-3.943 3.613-2.594 3.57-2.197 5.53.381 7.654.588-.809 1.703-1.235 2.142-.917.438.317.378 1.511-.21 2.32 2.816 1.795 4.803 1.565 7.396-2.003.993-1.366 1.743-3.111 2.218-4.867.475 1.757 1.226 3.501 2.218 4.867 2.594 3.57 4.58 3.798 7.397 2.003-.587-.81-.649-2.002-.21-2.321.437-.317 1.553.107 2.142.917 2.577-2.123 2.973-4.083.381-7.653-.993-1.366-2.42-2.619-3.943-3.613 1.816.092 3.706-.084 5.313-.605zM18 20.337c-.162-.292-.353-.538-.588-.709-.234-.171-.528-.276-.856-.341.228-.244.403-.502.493-.778.09-.275.1-.587.059-.919.302.141.602.228.892.228s.59-.087.894-.229c-.041.332-.031.644.059.919.09.276.265.534.492.778-.327.065-.621.17-.855.341-.236.172-.428.418-.59.71z"/>
                <circle cx="18" cy="18.818" r="4" fill="currentColor"/>
              </svg>
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
                href="/legal"
                className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary"
              >
                Legal
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
