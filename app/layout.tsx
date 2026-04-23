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
            <div className="mx-auto max-w-5xl text-center text-sm text-zinc-500">
              © 2026 Aster IDE. This software follows the principles of the{" "}
              <a
                href="https://www.fsf.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                Free Software Foundation
              </a>.
            </div>
          </footer>
      </body>
    </html>
  );
}
