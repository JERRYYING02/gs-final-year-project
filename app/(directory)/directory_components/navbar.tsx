
import { ResponsiveSidebar } from "./responsiveSidebar"
import { NavbarRoutes } from "@/components/navbarRoutes"
import { Logo } from "./logo"
export const Navbar = () => {
  return (
    <div className="bg-white p-10 border h-full flex items-center">
      <ResponsiveSidebar />
      <div className="flex items-center justify-center">
        <Logo />
      </div> 
      <NavbarRoutes />
    </div>
  )
}

