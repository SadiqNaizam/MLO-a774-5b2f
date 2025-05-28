import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  MessageSquarePlus, // For 'New Message'
  Users, // For 'Group Chat'
  Settings2, // For 'Settings'
  Search, // For search in chat list
  ChevronsUpDown, // For expand/collapse, or could be specific icon
  Video, // For video call
  Phone // For audio call
} from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  status: 'online' | 'offline' | 'away';
}

interface ChatWidgetProps {
  className?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const contacts: ChatContact[] = [
    { id: '1', name: 'Alice Smith', avatarUrl: 'https://i.pravatar.cc/150?u=chatAlice', lastMessage: 'Hey, how are you?', timestamp: '10m', unreadCount: 2, status: 'online' as const },
    { id: '2', name: 'Bob Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=chatBob', lastMessage: 'See you tomorrow!', timestamp: '1h', status: 'offline' as const },
    { id: '3', name: 'Carol White', avatarUrl: 'https://i.pravatar.cc/150?u=chatCarol', status: 'online' as const },
    { id: '4', name: 'David Brown', avatarUrl: 'https://i.pravatar.cc/150?u=chatDavid', lastMessage: 'Project update sent.', timestamp: '2d', status: 'away' as const },
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // In the image, chat appears as a bar at the bottom of the right sidebar.
  // This implementation makes it a self-contained widget that could be placed there.

  if (!isExpanded) {
    return (
      <div className={cn('fixed bottom-0 right-0 mr-4 mb-0 w-72 z-20', className)}>
        <Button 
          onClick={() => setIsExpanded(true)} 
          className="w-full justify-between bg-card text-foreground hover:bg-muted border border-border rounded-t-lg rounded-b-none shadow-md px-4 py-3 h-auto"
        >
          <span className="font-semibold">Chat</span>
          <div className="flex items-center space-x-1">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary"><MessageSquarePlus className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent><p>New Message</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary"><Settings2 className="h-4 w-4" /></Button>
                </TooltipTrigger>
                <TooltipContent><p>Chat Settings</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('fixed bottom-0 right-0 mr-4 w-72 h-[450px] bg-card border border-border rounded-t-lg shadow-lg flex flex-col z-20', className)}>
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="font-semibold text-foreground">Chat</h3>
        <div className="flex items-center space-x-1">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary"><Video className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent><p>Start Video Call</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary"><MessageSquarePlus className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent><p>New Message</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => setIsExpanded(false)}><ChevronsUpDown className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent><p>Collapse Chat</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="p-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search Messenger"
            className="pl-8 h-9 text-sm bg-muted border-none focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-2 space-y-1">
        {filteredContacts.map(contact => (
          <Button key={contact.id} variant="ghost" className="w-full h-auto justify-start p-2 space-x-3 rounded-md">
            <div className="relative">
              <Avatar className="h-9 w-9">
                <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                <AvatarFallback>{contact.name.substring(0,1)}</AvatarFallback>
              </Avatar>
              {contact.status === 'online' && (
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />
              )}
            </div>
            <div className="flex-grow text-left overflow-hidden">
              <p className="text-sm font-medium text-foreground truncate">{contact.name}</p>
              {contact.lastMessage && (
                <p className="text-xs text-muted-foreground truncate">
                  {contact.lastMessage} {contact.timestamp && `· ${contact.timestamp}`}
                </p>
              )}
            </div>
            {contact.unreadCount && contact.unreadCount > 0 && (
              <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 font-medium">
                {contact.unreadCount}
              </span>
            )}
          </Button>
        ))}
        {filteredContacts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No contacts found.</p>
        )}
      </div>

      <div className="p-2 border-t border-border flex items-center space-x-2">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Users className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>Group Chats</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Phone className="h-4 w-4" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>Audio Call</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Settings2 className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>Chat Settings</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChatWidget;
