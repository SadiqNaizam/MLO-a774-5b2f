import React from 'react';
import TopHeader from '../Dashboard/TopHeader';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  // TopHeader component from context provides the base structure and most styles.
  // Its default styles (from context file) include: 
  // h-[70px], bg-card, border-b border-border, fixed, top-0, left-64, right-72, z-10, flex, items-center, justify-between, px-6.
  // Layout Requirements for the Header component specify:
  // layout: "flex items-center justify-between px-4 bg-surface"
  // height: "h-[70px]"
  // position: "fixed top-0 left-64 right-72 z-10"
  // 'bg-surface' requirement maps to 'bg-card' via CSS variables and Tailwind config.
  // The primary difference to enforce is 'px-4' instead of TopHeader's default 'px-6'.
  return (
    <TopHeader 
      className={cn(
        // TopHeader's own className prop is used for this. Tailwind-merge in cn() handles overrides.
        'px-4' // Override TopHeader's default 'px-6' to meet the 'px-4' layout requirement.
               // Other styles like bg-card, h-[70px], fixed positioning are already correctly set by TopHeader.
      )} 
    />
  );
};

export default Header;
