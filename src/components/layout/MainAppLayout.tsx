import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  // This layout structure is based on the HLSBRS (Header, Left Sidebar, Body, Right Sidebar) type,
  // with fixed sidebars and header, and a scrollable main content area.
  // Sizing from Layout Requirements.overall.sizing:
  // sidebar: "w-64" (256px)
  // header: "h-[70px]"
  // mainContent: "min-w-0 overflow-y-auto"
  // rightSidebar: "w-72" (288px)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      
      {/* Main scrollable content area container */}
      {/* This div is positioned to avoid fixed sidebars and header. */}
      <div 
        className={cn(
          'ml-64',      // Margin for left sidebar (Layout Requirements.overall.sizing.sidebar)
          'mr-72',      // Margin for right sidebar (Layout Requirements.overall.sizing.rightSidebar)
          'mt-[70px]',  // Margin for header (Layout Requirements.overall.sizing.header)
          'h-[calc(100vh-70px)]', // Calculate height to fill available viewport space below the header
          'overflow-y-auto',    // Enable vertical scrolling (Layout Requirements.overall.sizing.mainContent)
          'min-w-0'             // Prevent content from breaking layout (Layout Requirements.overall.sizing.mainContent)
        )}
      >
        {/* Inner main element for semantic correctness and content padding. */}
        <main className={cn(
          'p-6' // Padding for the content (Layout Requirements.mainContent.layout)
          // The 'flex flex-col gap-6' from Layout Requirements.mainContent.container
          // is typically applied by the page component rendering specific content items.
        )}>
          {children}
        </main>
      </div>

      {/* Right Sidebar */}
      <aside 
        className={cn(
          'fixed top-0 right-0 h-screen border-l border-border', // Fixed position, full height, border
          'w-72',             // Width (Layout Requirements.rightSidebar.width)
          'bg-card',          // Background (bg-surface from reqs maps to bg-card, Layout Requirements.rightSidebar.layout)
          'pt-[70px] px-4',   // Padding: top for header, horizontal for content (Layout Requirements.rightSidebar.layout)
          'flex flex-col',   // Layout (Layout Requirements.rightSidebar.layout)
          'overflow-y-auto'   // Allow scrolling for right sidebar content if it overflows
        )}
      >
        {/* Placeholder content for the Right Sidebar. */}
        {/* Actual components like StoriesSection, SuggestedGroups, ChatWidget would be placed here. */}
        <div className="space-y-6 p-1">
          <div >
            <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1">Stories (Placeholder)</h3>
            <div className="h-24 bg-muted/30 rounded-md flex items-center justify-center text-xs text-muted-foreground">
              Content for Stories Section
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1">Suggested Groups (Placeholder)</h3>
            <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center text-xs text-muted-foreground">
              Content for Suggested Groups Section
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1">Chat (Placeholder)</h3>
            <div className="h-20 bg-muted/30 rounded-md flex items-center justify-center text-xs text-muted-foreground">
              Content for Chat Widget
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MainAppLayout;
