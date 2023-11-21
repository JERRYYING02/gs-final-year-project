import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const ResponsiveSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:bg-teal-300">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

