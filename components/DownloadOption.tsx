"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { useState } from "react";

interface DownloadOptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: "commands" | "file";
  disabled?: boolean;
  disabledLabel?: string;
  fileType?: string;
  downloadUrl?: string;
  instructions?: React.ReactNode;
}

export default function DownloadOption({
  title,
  description,
  icon,
  type,
  disabled = false,
  disabledLabel = "Coming Soon",
  fileType,
  downloadUrl,
  instructions,
}: DownloadOptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (type === "file") {
    return (
      <div
        className={`group rounded-md border bg-card shadow-sm transition-all duration-200 ${
          disabled
            ? "border-border/70 opacity-60"
            : "border-border/80 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md"
        }`}
      >
        <div className="flex min-h-24 items-center justify-between gap-4 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/70 text-foreground transition-colors group-hover:border-primary/30">
              {icon}
            </span>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold text-foreground">{title}</div>
              <div className="mt-1 truncate text-sm text-muted-foreground">{description}</div>
            </div>
          </div>
          {disabled ? (
            <button
              className="inline-flex shrink-0 cursor-not-allowed items-center justify-center rounded-md border border-border bg-background/60 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              disabled
            >
              {disabledLabel}
            </button>
          ) : (
            <a
              href={downloadUrl || "#"}
              className="btn-ide shrink-0 gap-2 px-3 py-2 text-xs"
            >
              <Download className="h-4 w-4" />
              <span>{fileType ?? "Download"}</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group overflow-hidden rounded-md border bg-card shadow-sm transition-all duration-200 ${
        disabled
          ? "border-border/70 opacity-60"
          : "border-border/80 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md"
      }`}
    >
      <button
        onClick={disabled ? undefined : () => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex min-h-24 w-full items-center justify-between gap-4 px-4 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-accent/25"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/70 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-colors group-hover:border-primary/30">
            {icon}
          </span>
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-foreground">{title}</div>
            <div className="mt-1 truncate text-sm text-muted-foreground">{description}</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {disabled && (
            <span className="rounded-md border border-border bg-background/70 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {disabledLabel}
            </span>
          )}
          {!disabled && (
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && !disabled && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/70 bg-background/35 p-4">
              {instructions}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
