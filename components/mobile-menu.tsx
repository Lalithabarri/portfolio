"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { mailto, navLinks, profile } from "@/content/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes the menu and returns focus to the toggle; so does a click
  // outside the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="ml-auto shrink-0 lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-periwinkle bg-paper/70 px-4 text-sm font-semibold text-navy"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? "close" : "menu"} className="size-4" />
        {open ? "Close" : "Menu"}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="animate-fade-up absolute inset-x-0 top-full border-b border-line bg-ivory/97 shadow-paper backdrop-blur"
      >
        <nav aria-label="Main" className="site-container py-4">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex min-h-12 items-center border-b border-line/70 font-serif text-xl text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex min-h-12 items-center gap-2 border-b border-line/70 font-serif text-xl text-navy"
              >
                Résumé <span className="font-sans text-sm text-muted">(PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <a href={mailto} onClick={close} className="btn btn-primary mt-5 w-full">
            <Icon name="mail" className="size-4" />
            Let&apos;s connect
          </a>
        </nav>
      </div>
    </div>
  );
}
