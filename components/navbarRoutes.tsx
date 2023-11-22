
"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ExitButton = () => (
  <Link href="/">
    <Button variant="ghost">
      <LogOut className="h-4 w-4 mr-2" />
      View as Student
    </Button>
  </Link>
);

const TeacherModeButton = () => (
  <Link href="/teacher/course">
    <Button variant="ghost">
      Educator's Space
    </Button>
  </Link>
);

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/course");

  return (
    <div className="flex gap-x-5 ml-auto">
      {isTeacherPage || isCoursePage ? <ExitButton /> : <TeacherModeButton />}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};