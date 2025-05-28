import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PostCard, { PostCardProps as IPostCardProps } from '@/components/Dashboard/PostCard';
import ChatWidget from '@/components/Dashboard/ChatWidget';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input'; // Not used directly for "What's on your mind" button styling
import { Video, Image as ImageIcon, Smile, Users, Edit3 } from 'lucide-react';

// Current user data (consistent with SidebarNav and TopHeader)
const currentUser = {
  name: 'Olenna Mason',
  avatarUrl: 'https://i.pravatar.cc/150?u=olenna',
  profileUrl: '#user-profile-olenna', // Placeholder URL
};

// Dummy post data
const postsData: IPostCardProps[] = [
  {
    id: 'post1',
    user: {
      name: 'Julia Fillory',
      avatarUrl: 'https://i.pravatar.cc/150?u=julia',
      profileUrl: '#user-profile-julia',
    },
    timestamp: '2 hrs ago',
    privacy: 'Public' as const, // Or 'Friends' depending on icon interpretation. Globe usually means Public.
    content: 'Checking out some new stores downtown! Excited to explore Raleigh. 🏙️',
    mapImageUrl: 'https://via.placeholder.com/600x300.png?text=Raleigh+Map+View', // Placeholder for map image
    location: {
      name: 'Raleigh, North Carolina',
      details: 'City - United States',
    },
    taggedUsers: ['Bryan Durand', 'Anna Smith'],
    interactions: {
      likes: 125,
      comments: 18,
      shares: 7,
    },
  },
  {
    id: 'post2',
    user: {
      name: 'Alex Chen',
      avatarUrl: 'https://i.pravatar.cc/150?u=alexchen',
      profileUrl: '#user-profile-alex',
    },
    timestamp: '5 hrs ago',
    privacy: 'Friends' as const,
    content: 'Just finished a great workout session! Feeling energized and ready to tackle the week. 💪 #fitness #motivation',
    imageUrl: 'https://via.placeholder.com/600x400.png?text=Gym+Selfie', // Placeholder for a general image
    interactions: {
      likes: 78,
      comments: 12,
      shares: 3,
    },
  },
  {
    id: 'post3',
    user: {
      name: 'Olenna Mason', // Current user posting something
      avatarUrl: currentUser.avatarUrl,
      profileUrl: currentUser.profileUrl,
    },
    timestamp: '1 day ago',
    privacy: 'Public' as const,
    content: 'Working on a new design project. Here\'s a sneak peek! What do you all think? 🤔\n#design #uidesign #creativity',
    imageUrl: 'https://via.placeholder.com/600x450.png?text=Design+Sneak+Peek',
    interactions: {
      likes: 210,
      comments: 35,
      shares: 15,
    },
  },
];

const SocialMediaFeedPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* Main content area for the feed. max-w-xl provides a common feed width. */}
      {/* The parent <main> in MainAppLayout already has p-6. */}
      {/* LayoutRequirements.mainContent.container: "flex flex-col gap-6" is applied here. */}
      <div className="max-w-xl mx-auto w-full flex flex-col gap-6">
        {/* Create Post Card */}
        <Card className="shadow-sm">
          <CardHeader className="p-3 pb-2 border-b">
            <div className="flex items-center space-x-1 -ml-1">
              <Button variant="ghost" className="font-semibold text-sm text-primary px-2 py-1.5 h-auto hover:bg-primary/10">
                <Edit3 className="w-4 h-4 mr-1.5" />
                Make Post
              </Button>
              <Button variant="ghost" className="text-sm text-muted-foreground px-2 py-1.5 h-auto hover:bg-muted hover:text-foreground">
                <ImageIcon className="w-4 h-4 mr-1.5" />
                Photo/Video Album
              </Button>
              <Button variant="ghost" className="text-sm text-muted-foreground px-2 py-1.5 h-auto hover:bg-muted hover:text-foreground">
                <Video className="w-4 h-4 mr-1.5" />
                Live Video
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              {/* This button typically opens a modal or expands the composer */}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:bg-muted rounded-full px-4 py-2.5 text-left h-auto bg-muted/50"
              >
                What's on your mind, {currentUser.name.split(' ')[0]}?
              </Button>
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t flex justify-around">
            <Button variant="ghost" className="text-muted-foreground hover:bg-muted hover:text-primary flex-1 text-sm py-2 h-auto">
              <ImageIcon className="w-5 h-5 mr-1.5 text-green-500" /> Photo/Video
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:bg-muted hover:text-primary flex-1 text-sm py-2 h-auto">
              <Users className="w-5 h-5 mr-1.5 text-blue-500" /> Tag Friends
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:bg-muted hover:text-primary flex-1 text-sm py-2 h-auto">
              <Smile className="w-5 h-5 mr-1.5 text-yellow-500" /> Feeling/Activity
            </Button>
          </CardFooter>
        </Card>

        {/* Posts Feed */}
        {postsData.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      
      {/* ChatWidget is fixed positioned; it will overlay correctly regardless of its position in this part of the tree. */}
      <ChatWidget />
    </MainAppLayout>
  );
};

export default SocialMediaFeedPage;
