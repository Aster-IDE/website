"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderBreadcrumb() {
  const pathname = usePathname();
  
  const teamMemberMatch = pathname.match(/^\/team\/([^\/]+)$/);
  
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
  } else if (crumb) {
    breadcrumbs = [crumb];
  }

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground">
      <Link href="/" className="transition-colors hover:text-primary">
        AsterIDE
      </Link>
      {breadcrumbs.map((item) => (
        <span key={item.href}>
          <span className="text-border"> / </span>
          <Link href={item.href} className="transition-colors hover:text-primary">
            {item.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
