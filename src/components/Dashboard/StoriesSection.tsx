import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PlusCircle, Archive, Settings } from 'lucide-react';

interface Story {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  imageUrl: string; // Background image for the story card
  isViewed?: boolean;
}

interface StoriesSectionProps {
  className?: string;
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ className }) => {
  const storiesData: Story[] = [
    { id: '1', user: { name: 'Alice Wonderland', avatarUrl: 'https://i.pravatar.cc/150?u=alice' }, imageUrl: 'https://picsum.photos/seed/story1/200/300', isViewed: true },
    { id: '2', user: { name: 'Bob The Builder', avatarUrl: 'https://i.pravatar.cc/150?u=bob' }, imageUrl: 'https://picsum.photos/seed/story2/200/300' },
    { id: '3', user: { name: 'Charlie Chaplin', avatarUrl: 'https://i.pravatar.cc/150?u=charlie' }, imageUrl: 'https://picsum.photos/seed/story3/200/300' },
    { id: '4', user: { name: 'Diana Prince', avatarUrl: 'https://i.pravatar.cc/150?u=diana' }, imageUrl: 'https://picsum.photos/seed/story4/200/300', isViewed: true },
    { id: '5', user: { name: 'Edward Scissorhands', avatarUrl: 'https://i.pravatar.cc/150?u=edward' }, imageUrl: 'https://picsum.photos/seed/story5/200/300' },
  ];

  return (
    <Card className={cn('w-full shadow-sm', className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-md text-foreground">Stories</h3>
          <div className="space-x-1">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:bg-muted">
              <Archive className="h-4 w-4 mr-1" /> Archive
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:bg-muted">
              <Settings className="h-4 w-4 mr-1" /> Settings
            </Button>
          </div>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-3 pb-3">
            {/* Add to Your Story Card */}
            <div className="relative w-28 h-44 rounded-lg overflow-hidden shadow-md group cursor-pointer flex-shrink-0 bg-muted">
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-card flex flex-col items-center justify-end pb-2 pt-5">
                <span className="text-xs font-medium text-center text-foreground px-1">Add to Your Story</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+1rem)]">
                 <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-primary text-primary-foreground border-4 border-card group-hover:bg-primary/90">
                    <PlusCircle className="h-5 w-5" />
                 </Button>
              </div>
            </div>

            {/* Story Cards */}
            {storiesData.map((story) => (
              <div
                key={story.id}
                className="relative w-28 h-44 rounded-lg overflow-hidden shadow-md group cursor-pointer flex-shrink-0"
              >
                <img src={story.imageUrl} alt={`Story by ${story.user.name}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <Avatar className={cn(
                  'absolute top-2 left-2 h-9 w-9 border-2 group-hover:border-primary',
                  story.isViewed ? 'border-muted-foreground/50' : 'border-primary'
                )}>
                  <AvatarImage src={story.user.avatarUrl} alt={story.user.name} />
                  <AvatarFallback>{story.user.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <p className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white truncate">
                  {story.user.name}
                </p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StoriesSection;
