"use client";

import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <div
      className={`border border-border bg-card rounded-md overflow-hidden ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <button
        onClick={disabled ? undefined : () => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex w-full items-center justify-between px-4 py-3 text-left ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <div className="font-medium text-foreground">{title}</div>
            <div className="text-sm text-muted-foreground">{description}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {disabled && (
            <span className="text-xs text-muted-foreground">{disabledLabel}</span>
          )}
          {!disabled && (
            <svg
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
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
            <div className="border-t border-border p-4">
              {type === "commands" && instructions}
              {type === "file" && fileType && (
                <a
                  href={downloadUrl || "#"}
                  className="btn-ide gap-2 px-4 py-2 text-sm"
                >
                  Download .{fileType.toLowerCase()}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
