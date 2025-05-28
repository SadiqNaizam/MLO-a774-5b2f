import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Newspaper,
  MessageCircle,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users,
  ListChecks,
  HeartHandshake,
  ChevronDown,
  Settings,
  PlusCircle
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  isActive?: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href = '#', isActive = false }) => {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-muted',
        isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground/80',
        'transition-colors duration-150'
      )}
    >
      <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-icon')} />
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const user = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/150?u=olenna',
  };

  const mainNavItems: NavItemProps[] = [
    { icon: Newspaper, label: 'News Feed', isActive: true },
    { icon: MessageCircle, label: 'Messenger' },
    { icon: PlaySquare, label: 'Watch' },
    { icon: Store, label: 'Marketplace' },
  ];

  const shortcuts: NavItemProps[] = [
    { icon: Gamepad2, label: 'FarmVille 2' },
  ];

  const exploreItems: NavItemProps[] = [
    { icon: CalendarDays, label: 'Events', badge: 12 },
    { icon: Flag, label: 'Pages' },
    { icon: Users, label: 'Groups' },
    { icon: ListChecks, label: 'Friend Lists' },
    { icon: HeartHandshake, label: 'Fundraisers' },
  ];

  const createItems = [
    { label: 'Ad', href: '#' },
    { label: 'Page', href: '#' },
    { label: 'Group', href: '#' },
    { label: 'Event', href: '#' },
    { label: 'Fundraiser', href: '#' },
  ];

  return (
    <nav className={cn('w-64 bg-sidebar h-screen fixed top-0 left-0 flex flex-col p-4 space-y-4 overflow-y-auto', className)}>
      {/* User Profile Link */}
      <a href="#" className="flex items-center space-x-3 p-2 mb-2 rounded-md hover:bg-muted">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm text-foreground">{user.name}</span>
      </a>

      {/* Main Navigation */}
      <div className="space-y-1">
        {mainNavItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>

      {/* Shortcuts */}
      <div className="pt-4">
        <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shortcuts</h3>
        <div className="space-y-1">
          {shortcuts.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
      </div>

      {/* Explore with Accordion */}
      <div className="pt-4 flex-grow">
        <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explore</h3>
        <Accordion type="single" collapsible defaultValue="explore-items" className="w-full">
          <div className="space-y-1">
            {exploreItems.slice(0, 4).map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </div>
          <AccordionItem value="explore-items" className="border-none">
            <AccordionTrigger className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-muted text-foreground/80 w-full justify-start text-sm font-medium">
              <ChevronDown className="h-5 w-5 text-icon accordion-chevron" /> 
              <span>See More...</span>
            </AccordionTrigger>
            <AccordionContent className="pb-0 pl-3">
              <div className="space-y-1 pt-1">
                {exploreItems.slice(4).map((item) => (
                  <NavItem key={item.label} {...item} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Create Section */}
      <div className="pt-4 border-t border-border">
        <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Create</h3>
        <div className="flex flex-wrap gap-2 px-3">
          {createItems.map(item => (
            <a key={item.label} href={item.href} className='text-sm text-primary hover:underline'>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Footer Links (Optional placeholder) */}
      <div className="mt-auto pt-4 text-xs text-muted-foreground space-x-2 px-3">
        <a href="#" className="hover:underline">Privacy</a>
        <span>·</span>
        <a href="#" className="hover:underline">Terms</a>
        <span>·</span>
        <a href="#" className="hover:underline">Cookies</a>
      </div>
    </nav>
  );
};

export default SidebarNav;
