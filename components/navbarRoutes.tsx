// "use client";
// import { UserButton } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { LogOut } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// export const NavbarRoutes = () => {
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isCoursePage = pathname?.includes("/courses");
//   return (
    
//       <div className="flex gap-x-2 ml-auto">
//         {isTeacherPage || isCoursePage ? (
//           <Link href="/">
//             <Button size="sm" variant="ghost">
//               <LogOut className="h-4 w-4 mr-2" />
//               Exit
//             </Button>
//           </Link>
//         ) :  (
//           <Link href="/teacher/courses\">
//             <Button variant="ghost">
//               Teacher mode
//             </Button>
//           </Link>
//         ) }
//         <UserButton
//           afterSignOutUrl="/"
//         />
//       </div>
    
//   )
// }

"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ExitButton = () => (
  <Link href="/">
    <Button size="sm" variant="ghost">
      <LogOut className="h-4 w-4 mr-2" />
      Exit
    </Button>
  </Link>
);

const TeacherModeButton = () => (
  <Link href="/teacher/course">
    <Button variant="ghost">
      Teacher mode
    </Button>
  </Link>
);

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/course");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isCoursePage ? <ExitButton /> : <TeacherModeButton />}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};