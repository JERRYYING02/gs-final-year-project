"use client";

import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarRouteProps {
  icon: LucideIcon;
  label: string;
  link: string;
};

export const SidebarRouteSelection = ({
  icon: Icon,
  label,
  link,
}: SidebarRouteProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && link === "/") ||
    pathname === link ||
    pathname?.startsWith(`${link}/`);

  const onClick = () => {
    router.push(link);
  }

  return (
    <button
    onClick={onClick}
    type="button"
    className={cn(
    "flex items-center text-md text-gray-800 font-semibold p-3 border transition-all duration-400",
    "bg-white-500 hover:bg-teal-300",
    isActive && "bg-white-500 hover:bg-teal-300"
  )}
>
  <div className="flex items-center gap-2">
    <Icon
      size={22}
      className={cn(
        "text-dark",
        isActive && "text-teal-500"
      )}
    />
    <span>{label}</span>
  </div>
  <div
    className={cn(
      "ml-auto w-1 h-5 border-2 border-teal-900 rounded-full transition-all",
      isActive && "border-teal-500"
    )}
  />
</button>
  )
}