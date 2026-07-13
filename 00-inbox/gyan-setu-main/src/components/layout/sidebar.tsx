"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Headphones,
  Newspaper,
  GraduationCap,
  Mic,
  Radio,
  Landmark,
  FlaskConical,
  Video,
  BarChart3,
  CreditCard,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Digital Library", href: "/library", icon: BookOpen },
  { label: "Audiobooks", href: "/audiobooks", icon: Headphones },
  { label: "Periodicals", href: "/newspapers", icon: Newspaper },
  { label: "Test Prep Hub", href: "/test-prep", icon: GraduationCap },
  { label: "Podcast Studio", href: "/podcast-studio", icon: Mic },
  { label: "Podcasts", href: "/podcasts", icon: Radio },
  { label: "IKS Heritage", href: "/iks-heritage", icon: Landmark },
  { label: "STEM Lab", href: "/stem-lab", icon: FlaskConical },
  { label: "Video Library", href: "/video-library", icon: Video },
];

const accountNav = [
  { label: "My Analytics", href: "/profile", icon: BarChart3 },
  { label: "Membership", href: "/membership", icon: CreditCard },
];

interface SidebarProps {
  user: {
    name: string;
    membershipTier: string;
  };
  collapsed?: boolean;
}

export function Sidebar({ user, collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const tierColors: Record<string, string> = {
    BASIC: "text-gray-400",
    STANDARD: "text-blue-400",
    GOLD: "text-gold",
  };

  function NavItem({
    item,
    isActive,
  }: {
    item: (typeof mainNav)[0];
    isActive: boolean;
  }) {
    const link = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
          collapsed && "justify-center px-2",
          isActive
            ? "bg-blue-600/20 text-white font-medium"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        )}
      >
        <item.icon className="h-4 w-4 flex-shrink-0" />
        {!collapsed && item.label}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side="right" className="bg-navy text-white border-slate-700">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return link;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "bg-navy text-white flex flex-col h-screen flex-shrink-0 transition-all duration-200",
          collapsed ? "w-[60px]" : "w-[220px]"
        )}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-slate-700">
          {collapsed ? (
            <div className="text-lg font-bold text-blue-400 text-center">G</div>
          ) : (
            <>
              <div className="text-lg font-bold text-blue-400">GYAAN SETU</div>
              <div className="text-xs text-slate-400">Knowledge City</div>
            </>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-3">
          <nav className="space-y-0.5 px-2">
            {mainNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <NavItem key={item.href} item={item} isActive={isActive} />
              );
            })}
          </nav>

          <Separator className="my-3 bg-slate-700 mx-4" />

          {!collapsed && (
            <div className="px-5 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                My Account
              </span>
            </div>
          )}
          <nav className="space-y-0.5 px-2">
            {accountNav.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <NavItem key={item.href} item={item} isActive={isActive} />
              );
            })}
          </nav>
        </ScrollArea>

        {/* User card */}
        <div
          className={cn(
            "px-4 py-3 border-t border-slate-700 flex items-center gap-3",
            collapsed && "justify-center px-2"
          )}
        >
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className="bg-blue-500 text-white text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div
                className={cn(
                  "text-xs capitalize",
                  tierColors[user.membershipTier] || "text-slate-400"
                )}
              >
                {user.membershipTier.toLowerCase()} Member
              </div>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
