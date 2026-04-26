"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderBreadcrumb() {
  const pathname = usePathname();
  // this probably isnt the best way to do this but whatever
  // i will kill myself if someone decides to fix this code
  const crumbMap: Record<string, { href: string; label: string }> = {
    "/download": { href: "/download", label: "Download" },
    "/roadmap": { href: "/roadmap", label: "Roadmap" },
  };
  const crumb = crumbMap[pathname];

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.11em] text-muted-foreground">
      <Link href="/" className="transition-colors hover:text-primary">
        AsterIDE
      </Link>
      <span className="text-border">/</span>
      {crumb ? (
        <Link href={crumb.href} className="transition-colors hover:text-primary">
          {crumb.label}
        </Link>
      ) : null}
    </div>
  );
}
