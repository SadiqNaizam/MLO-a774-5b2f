import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface GroupSuggestion {
  id: string;
  name: string;
  category?: string; // Not in image, but common
  membersCount: number;
  coverImageUrl: string;
  memberAvatars: string[];
}

interface SuggestedGroupsProps {
  className?: string;
}

const SuggestedGroups: React.FC<SuggestedGroupsProps> = ({ className }) => {
  const groupsData: GroupSuggestion[] = [
    {
      id: '1',
      name: 'Mad Men (MADdicts)',
      membersCount: 6195,
      coverImageUrl: 'https://picsum.photos/seed/madmen/300/100',
      memberAvatars: [
        'https://i.pravatar.cc/150?u=member1',
        'https://i.pravatar.cc/150?u=member2',
        'https://i.pravatar.cc/150?u=member3',
        'https://i.pravatar.cc/150?u=member4',
        'https://i.pravatar.cc/150?u=member5',
      ],
    },
    {
      id: '2',
      name: 'Dexter Morgan Fans',
      membersCount: 6984,
      coverImageUrl: 'https://picsum.photos/seed/dexter/300/100',
      memberAvatars: [
        'https://i.pravatar.cc/150?u=member6',
        'https://i.pravatar.cc/150?u=member7',
        'https://i.pravatar.cc/150?u=member8',
      ],
    },
    {
      id: '3',
      name: 'Tech Innovators Hub',
      membersCount: 12034,
      coverImageUrl: 'https://picsum.photos/seed/techgroup/300/100',
      memberAvatars: [
        'https://i.pravatar.cc/150?u=member9',
        'https://i.pravatar.cc/150?u=member10',
        'https://i.pravatar.cc/150?u=member11',
        'https://i.pravatar.cc/150?u=member12',
      ],
    },
  ];

  const [suggestedGroups, setSuggestedGroups] = React.useState(groupsData);

  const handleDismiss = (groupId: string) => {
    setSuggestedGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  return (
    <Card className={cn('w-full shadow-sm', className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-md text-foreground">Suggested Groups</h3>
          <Button variant="link" size="sm" className="text-xs text-primary hover:underline p-0 h-auto">
            See All
          </Button>
        </div>

        <div className="space-y-4">
          {suggestedGroups.map((group) => (
            <div key={group.id} className="border border-border rounded-lg overflow-hidden">
              <div className="relative h-20 bg-muted">
                <img src={group.coverImageUrl} alt={`${group.name} cover`} className="w-full h-full object-cover" />
                <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 bg-black/30 hover:bg-black/50 text-white rounded-full" onClick={() => handleDismiss(group.id)}>
                  <X className="h-3 w-3" />
                </Button>
                <div className="absolute bottom-2 left-2 flex -space-x-2">
                  {group.memberAvatars.slice(0, 5).map((avatarUrl, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-card">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{index}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-card">
                <h4 className="font-medium text-sm text-foreground truncate" title={group.name}>{group.name}</h4>
                <p className="text-xs text-muted-foreground">{group.membersCount.toLocaleString()} members</p>
                <Button variant="outline" size="sm" className="w-full mt-2 bg-muted hover:bg-muted/80 border-border">
                  <Plus className="h-4 w-4 mr-1.5" /> Join
                </Button>
              </div>
            </div>
          ))}
          {suggestedGroups.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No more group suggestions for now.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedGroups;
