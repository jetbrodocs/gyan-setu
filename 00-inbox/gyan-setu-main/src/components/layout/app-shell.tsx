"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/library": "Digital Library",
  "/audiobooks": "Audiobooks",
  "/newspapers": "Newspapers & Periodicals",
  "/test-prep": "Test Preparation Hub",
  "/podcast-studio": "Podcast Creation Studio",
  "/podcasts": "Podcasts",
  "/iks-heritage": "Indian Knowledge Systems",
  "/stem-lab": "STEM Innovation Lab",
  "/video-library": "Video Library",
  "/reader": "eBook Reader",
  "/profile": "My Dashboard",
  "/membership": "Membership Plans",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  for (const [path, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(path)) return title;
  }
  return "Gyaan Setu";
}

interface AppShellProps {
  user: {
    name: string;
    membershipTier: string;
  };
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={title}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto bg-light-gray p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
