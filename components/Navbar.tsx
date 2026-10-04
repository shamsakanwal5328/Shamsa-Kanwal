"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { NAV_LINKS, isActivePath } from "@/lib/navigation";

interface NavbarProps {
  name: string;
  title: string;
}

export default function Navbar({ name, title }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass = (href: string) =>
    isActivePath(pathname, href)
      ? "text-primary font-semibold bg-accent-soft"
      : "text-ink hover:text-primary hover:bg-subtle";

  return (
    <header className="print-hidden sticky top-0 z-40 border-b border-border bg-surface">
      <a
        href="#main-content"
        className="sr-only rounded bg-primary px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
      >
        Skip to main content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="truncate font-serif text-lg font-semibold text-primary">{name}</span>
          <span className="hidden truncate text-xs text-muted sm:block">{title}</span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActivePath(pathname, href) ? "page" : undefined}
                className={`rounded-md px-2.5 py-2 text-[15px] transition-colors ${linkClass(href)}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-2xl text-primary hover:bg-subtle xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-border bg-surface xl:hidden">
        <ul className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:grid-cols-2 sm:px-6">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActivePath(pathname, href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-3 text-base ${linkClass(href)}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
