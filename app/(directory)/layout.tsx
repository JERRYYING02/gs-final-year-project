
import { Sidebar } from "./directory_components/sidebar";
import { Navbar } from "./directory_components/navbar";
//mini device is flexbox 
const DirectoryLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
      <Navbar/>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-20 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        {children}
      </main>
    </div>
   );
}
 
export default DirectoryLayout;