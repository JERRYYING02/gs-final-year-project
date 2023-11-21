import React from 'react';

import { Logo } from './logo';
import { SidebarPageRoutes } from './sidebarPageRoute';
export const Sidebar = () => {
  return (
    <div className="flex flex-col bg-white-900 w-64 text-white p-5">
      <div className="flex mb-3 items-center justify-center">
        <Logo />
      </div>
      <div className="flex flex-col">
        <SidebarPageRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
