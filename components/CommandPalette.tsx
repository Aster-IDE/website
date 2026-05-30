"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ExternalLink } from "lucide-react";

interface Page {
  name: string;
  href: string;
  description?: string;
  external?: boolean;
}

const pages: Page[] = [
  { name: "Home", href: "/", description: "Main landing page" },
  { name: "Download", href: "/download", description: "Download AsterIDE" },
  { name: "Team", href: "/team", description: "Meet the team" },
  { name: "FAQ", href: "/faq", description: "Frequently asked questions" },
  { name: "Credits", href: "/credits", description: "Credits and acknowledgments" },
  { name: "Roadmap", href: "/roadmap", description: "Project roadmap and plans" },
  { name: "GitHub", href: "https://github.com/Aster-IDE/AsterIDE", description: "View source code", external: true },
  { name: "Documentation", href: "https://docs.asteride.dev", description: "Official documentation", external: true },
  { name: "Discord", href: "https://discord.gg/wQHPEAgfTE", description: "Join our Discord community", external: true },
  { name: "Blog", href: "https://blog.asteride.dev", description: "Latest news and updates", external: true },
  { name: "Releases", href: "https://github.com/Aster-IDE/AsterIDE/releases", description: "Latest releases", external: true },
  { name: "Matrix", href: "https://matrix.to/#/#asteride:matrix.org", description: "Join our Matrix community", external: true },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    (window as Window & { openCommandPalette?: () => void }).openCommandPalette = () => setIsOpen(true);
    return () => {
      delete (window as Window & { openCommandPalette?: () => void }).openCommandPalette;
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const filteredPages = pages.filter(
    (page) =>
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredPages.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredPages.length) % filteredPages.length);
        }
        if (e.key === "Enter" && filteredPages.length > 0) {
          e.preventDefault();
          const selectedPage = filteredPages[selectedIndex];
          if (selectedPage.href.startsWith("http")) {
            window.open(selectedPage.href, "_blank");
          } else {
            router.push(selectedPage.href);
          }
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredPages, selectedIndex, router]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSelectedIndex(0);
    }, 0);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handlePageClick = (page: Page) => {
    if (page.href.startsWith("http")) {
      window.open(page.href, "_blank");
    } else {
      router.push(page.href);
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-xl rounded-xl border-2 border-[#c33769] bg-background/95 backdrop-blur-sm shadow-2xl overflow-hidden">
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors ml-2"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-1">
          {filteredPages.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No pages found
            </div>
          ) : (
            <ul ref={listRef} className="space-y-1">
              {filteredPages.map((page, index) => (
                <li key={page.href}>
                  <button
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    onClick={() => handlePageClick(page)}
                    className={`w-full text-left rounded-lg px-3 py-2 transition-colors flex items-center gap-3 ${
                      index === selectedIndex
                        ? "bg-accent/50"
                        : "hover:bg-accent/30"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {page.name}
                      </div>
                      {page.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {page.description}
                        </div>
                      )}
                    </div>
                    {page.external && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-border text-[10px] font-mono">↑↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-border text-[10px] font-mono">Enter</kbd>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-border text-[10px] font-mono">ESC</kbd>
              <span>to close</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
