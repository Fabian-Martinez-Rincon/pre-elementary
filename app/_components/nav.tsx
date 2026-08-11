"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Resumen" },
  { href: "/repasar", label: "Repasar" },
  { href: "/practicar", label: "Practicar" },
  { href: "/gramatica", label: "Gramática" },
  { href: "/tarjetas", label: "Tarjetas" },
  { href: "/clases", label: "Clases" },
  { href: "/progreso", label: "Progreso" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto">
      {LINKS.map((link) => {
        const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-(--brand) text-(--brand-foreground)"
                : "text-(--ink-dim) hover:bg-(--bg-sunken) hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
