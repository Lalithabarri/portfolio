"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";

type View = { label: string; href: string; icon: IconName; count: number };

// Switches between the two Notebook views. Each view is its own page, so
// it works without JavaScript and can be linked to directly.
export function NotebookSwitcher({ photoCount, noteCount }: { photoCount: number; noteCount: number }) {
  const pathname = usePathname();
  const views: View[] = [
    { label: "Photography", href: "/notebook", icon: "camera", count: photoCount },
    { label: "Notes", href: "/notebook/notes", icon: "pen", count: noteCount },
  ];

  return (
    <nav aria-label="Notebook views">
      <ul className="inline-flex flex-wrap rounded-[1.75rem] border border-line bg-paper/80 p-1 shadow-paper">
        {views.map((view) => {
          const active = pathname === view.href;
          return (
            <li key={view.href}>
              <Link
                href={view.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 flex-wrap items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${
                  active ? "bg-navy text-paper" : "text-navy hover:bg-wash"
                }`}
              >
                <Icon name={view.icon} className="size-4" />
                {view.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-paper/20 text-paper" : "bg-wash-soft text-muted"}`}
                >
                  {view.count}
                  <span className="sr-only">{view.label === "Notes" ? " notes" : " photos"}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
