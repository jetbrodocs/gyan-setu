"use client";

import { Search, Bell, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title: string;
  onToggleSidebar: () => void;
}

export function TopBar({ title, onToggleSidebar }: TopBarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-4 flex-shrink-0">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-slate-500"
        onClick={onToggleSidebar}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <h1 className="text-base font-semibold text-navy">{title}</h1>

      <div className="flex-1 max-w-md ml-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search for books, exams, audiobooks..."
            className="pl-9 bg-slate-100 border-none h-9 text-sm rounded-full"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs text-slate-600 transition-colors">
          <span className="text-sm">🇮🇳</span>
          <span>EN</span>
          <span className="text-[10px]">▾</span>
        </button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
