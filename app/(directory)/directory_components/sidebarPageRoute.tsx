"use client";
import { usePathname } from "next/navigation";
import { SidebarRouteSelection } from "./sidebarRouteSelection";
import { BarChart3, Search,Flame, BookOpen, PenSquare ,Target } from "lucide-react";

const studentRoutes = [
  {
    icon: BookOpen,
    label: "Home",
    link: "/",
  },
  {
    icon: Search,
    label: "Browse",
    link: "/search",
  },
  {
    icon: Flame,
    label: "Trends",
    link: "/trends",
  },
  {
    icon: Target,
    label: "Assignments",
    link: "/quizPage",
  },
];

const teacherRoutes = [
  {
    icon: PenSquare ,
    label: "Courses",
    link: "/teacher/course",
  },
  {
    icon: BarChart3,
    label: "Statistics",
    link: "/teacher/courseStatistics",
  },
]

export const SidebarPageRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : studentRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarRouteSelection
          key={route.link}
          icon={route.icon}
          label={route.label}
          link={route.link}
        />
      ))}
    </div>
  )
}