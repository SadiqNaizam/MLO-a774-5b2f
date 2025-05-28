import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Search,
  Users,
  MessageSquareText, // Changed from MessageSquare to match design better
  Bell,
  ChevronDown,
  HelpCircle,
  Facebook, // For logo
  Home, // For Home link
  UserPlus // For Find Friends
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const user = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/150?u=olenna',
  };

  const navLinks = [
    { label: 'Olenna', href: '#', icon: undefined, current: true, avatar: user.avatarUrl },
    { label: 'Home', href: '#', icon: Home, current: false },
    { label: 'Find Friends', href: '#', icon: UserPlus, current: false },
  ];

  const actionIcons = [
    { label: 'Friend Requests', icon: Users, badgeCount: 8, href: '#' },
    { label: 'Messages', icon: MessageSquareText, badgeCount: 0, href: '#' }, // Assuming messages have a distinct icon, 0 for no new
    { label: 'Notifications', icon: Bell, badgeCount: 36, href: '#' },
  ];

  return (
    <header className={cn('h-[70px] bg-card border-b border-border fixed top-0 left-64 right-72 z-10 flex items-center justify-between px-6', className)}>
      {/* Left Section: Logo and Search */}
      <div className="flex items-center space-x-4">
        <a href="#" aria-label="Facebook home">
          <Facebook className="h-10 w-10 text-primary" />
        </a>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-10 pr-4 py-2 h-10 w-60 bg-muted border-none focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Center Section: Navigation Links */}
      <nav className="flex items-center space-x-2">
        {navLinks.map((link) => (
          <TooltipProvider key={link.label} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={link.current ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    'px-3 py-2 h-auto font-medium',
                    link.current ? 'text-primary bg-primary/10' : 'text-foreground/70 hover:text-primary hover:bg-primary/5',
                    link.avatar ? 'rounded-full !px-2 !py-1' : 'rounded-md'
                  )}
                  asChild
                >
                  <a href={link.href} className="flex items-center space-x-2">
                    {link.avatar && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={link.avatar} alt={link.label} />
                        <AvatarFallback>{link.label.substring(0,1)}</AvatarFallback>
                      </Avatar>
                    )}
                    {link.icon && !link.avatar && <link.icon className="h-5 w-5" />}
                    <span className={cn(link.avatar && 'hidden sm:inline')}>{link.label}</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      {/* Right Section: Actions and Profile */}
      <div className="flex items-center space-x-2">
        {actionIcons.map((action) => (
          <TooltipProvider key={action.label} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative bg-muted hover:bg-muted/80">
                  <a href={action.href} aria-label={action.label}>
                    <action.icon className="h-5 w-5 text-foreground/90" />
                    {action.badgeCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 text-xs justify-center">
                        {action.badgeCount > 99 ? '99+' : action.badgeCount}
                      </Badge>
                    )}
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted hover:bg-muted/80">
                <HelpCircle className="h-5 w-5 text-foreground/90" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-muted hover:bg-muted/80">
                    <ChevronDown className="h-5 w-5 text-foreground/90" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Account Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings & Privacy</DropdownMenuItem>
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
