"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { studySections } from "@/data/study";

export function StudySidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActiveSection = (slug: string) => pathname.startsWith(`/study/${slug}`);
  const isActivePage = (sectionSlug: string, pageSlug: string) =>
    pathname === `/study/${sectionSlug}/${pageSlug}` ||
    pathname === `/study/${sectionSlug}/${pageSlug}/`;

  const SidebarBody = (
    <nav className="space-y-1 text-sm">
      <Link
        href="/study"
        className={`block px-3 py-2 rounded-md transition-colors ${
          pathname === "/study" || pathname === "/study/"
            ? "bg-cream-deep text-ink"
            : "text-ink-soft hover:bg-cream-soft"
        }`}
      >
        Overview
      </Link>
      {studySections.map((section) => (
        <div key={section.slug} className="pt-1">
          <Link
            href={`/study/${section.slug}`}
            className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
              isActiveSection(section.slug)
                ? "text-ink font-medium"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{section.emoji}</span>
              <span>{section.title}</span>
            </span>
            <ChevronRight
              size={14}
              className={`transition-transform ${isActiveSection(section.slug) ? "rotate-90" : ""}`}
            />
          </Link>
          <AnimatePresence initial={false}>
            {isActiveSection(section.slug) && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden ml-7 border-l border-cream-deep"
              >
                {section.pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/study/${section.slug}/${page.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-3 py-1.5 text-[13px] border-l-2 -ml-px transition-colors ${
                        isActivePage(section.slug, page.slug)
                          ? "border-terracotta text-terracotta"
                          : "border-transparent text-ink-mute hover:text-ink"
                      }`}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <button
        className="md:hidden fixed bottom-6 right-6 z-40 bg-ink text-cream rounded-full p-3 shadow-lg"
        onClick={() => setMobileOpen(true)}
        aria-label="Open study menu"
      >
        <Menu size={20} />
      </button>

      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-thin pr-2">
          {SidebarBody}
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-ink/40 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-cream z-50 overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="font-display text-xl">Study</p>
                <button onClick={() => setMobileOpen(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
              {SidebarBody}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
