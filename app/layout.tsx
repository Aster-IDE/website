import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <nav className="mx-auto flex max-w-5xl items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              AsterIDE
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:underline">
                Home
              </Link>
              <Link href="/download" className="text-sm font-medium hover:underline">
                Download
              </Link>
              <Link href="https://github.com/Aster-IDE/AsterIDE" className="text-sm font-medium hover:underline">
                GitHub
              </Link>
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
