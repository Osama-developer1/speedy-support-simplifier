
import React from 'react';
import { Cog, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExtensionHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-border">
      <div className="container py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">Speedy Support</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Link 
            to="/settings"
            className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
            title="Settings"
          >
            <Cog className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ExtensionHeader;
