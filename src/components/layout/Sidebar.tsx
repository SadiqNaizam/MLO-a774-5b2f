import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';

const Sidebar: React.FC = () => {
  // SidebarNav component from context already handles its own styling including:
  // fixed positioning (top-0, left-0), width (w-64), height (h-screen),
  // background (bg-sidebar), flex column layout, padding, and overflow.
  return <SidebarNav />;
};

export default Sidebar;
