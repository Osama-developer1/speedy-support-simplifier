
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full sticky top-0 z-10 glass-morphism', className)}>
      <div className="layout-container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              CS
            </div>
            <h1 className="text-xl font-medium">Support Assistant</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/settings" 
              className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300"
              title="Settings"
            >
              <Settings size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
