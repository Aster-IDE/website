"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={toggleMenu}
          />
          
          <div className="absolute top-0 right-0 h-full w-64 bg-background border-l border-border shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <nav className="flex-1 p-4">
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="text-sm font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary py-2"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                  <Link
                    href="/download"
                    className="text-sm font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary py-2"
                    onClick={toggleMenu}
                  >
                    Download
                  </Link>
                  <Link
                    href="https://github.com/Aster-IDE/AsterIDE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary py-2"
                    onClick={toggleMenu}
                  >
                    GitHub
                  </Link>
                  <Link
                    href="/credits"
                    className="text-sm font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary py-2"
                    onClick={toggleMenu}
                  >
                    Credits
                  </Link>
                  <Link
                    href="/team"
                    className="text-sm font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary py-2"
                    onClick={toggleMenu}
                  >
                    Team
                  </Link>
                  <Link
                    href="/faq"
                    className="text-sm font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary py-2"
                    onClick={toggleMenu}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="https://docs.asteride.dev"
                    className="text-sm font-mono uppercase tracking-[0.09em] text-muted-foreground transition-colors hover:text-primary py-2"
                    onClick={toggleMenu}
                  >
                    Docs
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
