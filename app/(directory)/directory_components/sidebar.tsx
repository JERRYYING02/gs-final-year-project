import React from 'react';
import { SidebarPageRoutes } from './sidebarPageRoute';
import { NavbarRoutes } from '@/components/navbarRoutes';
export const Sidebar = () => {
  return (
    <div className="flex flex-col bg-white-900 text-white p-5">
      <div className="flex flex-col">
        <SidebarPageRoutes />
      </div>
        <NavbarRoutes/>
    </div>
  );
};

export default Sidebar;
