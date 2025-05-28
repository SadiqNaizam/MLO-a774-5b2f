import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Globe,
  MoreHorizontal,
  MapPin,
  Users,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark
} from 'lucide-react';

interface PostCardProps {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
    profileUrl: string;
  };
  timestamp: string;
  privacy: 'Public' | 'Friends' | 'Only me';
  content?: string;
  imageUrl?: string; // For general images/videos
  mapImageUrl?: string; // Specific for map images
  location?: {
    name: string;
    details: string;
  };
  taggedUsers?: string[];
  interactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  user,
  timestamp,
  privacy,
  content,
  mapImageUrl,
  location,
  taggedUsers,
  interactions,
  className
}) => {
  return (
    <Card className={cn('w-full shadow-sm', className)}>
      <CardHeader className="p-4">
        <div className="flex items-start space-x-3">
          <a href={user.profileUrl}>
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
          </a>
          <div className="flex-grow">
            <div className="flex items-center">
              <a href={user.profileUrl} className="font-semibold text-sm text-foreground hover:underline">
                {user.name}
              </a>
              {taggedUsers && taggedUsers.length > 0 && (
                <span className="text-sm text-muted-foreground ml-1">
                  is with <a href="#" className="font-medium text-foreground hover:underline">{taggedUsers[0]}</a>
                  {taggedUsers.length > 1 && ` and ${taggedUsers.length -1} others`}
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground space-x-1">
              <span>{timestamp}</span>
              <span>·</span>
              <Globe className="h-3 w-3" />
              <span>{privacy}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Hide post</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-3 pt-0">
        {content && <p className="text-sm text-foreground mb-3 whitespace-pre-wrap">{content}</p>}
        {mapImageUrl && (
          <div className="aspect-[16/9] bg-muted rounded-md overflow-hidden mb-3">
            <img src={mapImageUrl} alt={location ? location.name : 'Map'} className="w-full h-full object-cover" />
          </div>
        )}
        {location && (
          <div className="flex items-start space-x-2 text-sm mb-3 p-3 border border-border rounded-md bg-secondary/30">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">{location.name}</p>
              <p className="text-xs text-muted-foreground">{location.details}</p>
              {/* Example: "Bryan Durand and 2 others have been here" - can be part of details or separate */} 
            </div>
            <Button variant="outline" size="sm" className="ml-auto self-start bg-card hover:bg-muted">
              <Bookmark className="h-4 w-4 mr-1.5" /> Save
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 border-t border-border">
        <div className="flex justify-between w-full space-x-2">
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-muted">
            <ThumbsUp className="h-5 w-5 mr-1.5" /> Like ({interactions.likes})
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-muted">
            <MessageSquare className="h-5 w-5 mr-1.5" /> Comment ({interactions.comments})
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-muted">
            <Share2 className="h-5 w-5 mr-1.5" /> Share ({interactions.shares})
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
