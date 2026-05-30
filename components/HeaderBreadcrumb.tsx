"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderBreadcrumb() {
  const pathname = usePathname();
  
  const teamMemberMatch = pathname.match(/^\/team\/([^\/]+)$/);
  const downloadPlatformMatch = pathname.match(/^\/download\/([^\/]+)$/);
  
  // this probably isnt the best way to do this but whatever
  // i will kill myself if someone decides to fix this code
  const crumbMap: Record<string, { href: string; label: string }> = {
    "/download": { href: "/download", label: "Download" },
    "/roadmap": { href: "/roadmap", label: "Roadmap" },
    "/credits": { href: "/credits", label: "Credits" },
    "/team": { href: "/team", label: "Team" },
    "/faq": { href: "/faq", label: "FAQ" }
  };
  
  const crumb = crumbMap[pathname];
  let breadcrumbs: { href: string; label: string }[] = [];
  
  if (teamMemberMatch) {
    const username = teamMemberMatch[1];
    breadcrumbs = [
      { href: "/team", label: "Team" },
      { href: pathname, label: username }
    ];
  } else if (downloadPlatformMatch) {
    const platform = downloadPlatformMatch[1];
    breadcrumbs = [
      { href: "/download", label: "Download" },
      { href: pathname, label: platform }
    ];
  } else if (crumb) {
    breadcrumbs = [crumb];
  }

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground min-w-0">
      <Link href="/" className="transition-colors hover:text-primary flex-shrink-0">
        AsterIDE
      </Link>
      {breadcrumbs.map((item) => (
        <span key={item.href} className="flex items-center gap-2 min-w-0">
          <span className="text-border flex-shrink-0"> / </span>
          <Link href={item.href} className="transition-colors hover:text-primary truncate">
            {item.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
