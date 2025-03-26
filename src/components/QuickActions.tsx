
import React, { useEffect } from 'react';
import { Mail, X, ExternalLink, MessageSquare, Calendar, Clock, Printer, CopyCheck, Save } from 'lucide-react';
import ActionButton from './ActionButton';
import { toast } from 'sonner';

interface ActionItem {
  id: string;
  label: string;
  shortcut: string;
  icon: React.ReactNode;
  action: () => void;
}

const defaultActions: ActionItem[] = [
  {
    id: 'find-supplier-email',
    label: 'Find Supplier Email',
    shortcut: 'F1',
    icon: <Mail size={18} />,
    action: () => {
      toast.success('Copied supplier email to clipboard');
      // Implementation would integrate with your actual workflow
    }
  },
  {
    id: 'close-case',
    label: 'Close Case - Supplier Response',
    shortcut: 'F2',
    icon: <X size={18} />,
    action: () => {
      toast.success('Case closed successfully');
      // Implementation would integrate with your actual workflow
    }
  },
  {
    id: 'external-search',
    label: 'Search External Systems',
    shortcut: 'F3',
    icon: <ExternalLink size={18} />,
    action: () => {
      toast.success('Opening external search');
      // Implementation would integrate with your actual workflow
    }
  },
  {
    id: 'standard-response',
    label: 'Insert Standard Response',
    shortcut: 'F4',
    icon: <MessageSquare size={18} />,
    action: () => {
      toast.success('Standard response inserted');
      // Implementation would integrate with your actual workflow
    }
  },
  {
    id: 'schedule-followup',
    label: 'Schedule Follow-up',
    shortcut: 'F5',
    icon: <Calendar size={18} />,
    action: () => {
      toast.success('Follow-up scheduled');
      // Implementation would integrate with your actual workflow
    }
  },
  {
    id: 'time-tracking',
    label: 'Start/Stop Time Tracking',
    shortcut: 'F6',
    icon: <Clock size={18} />,
    action: () => {
      toast.success('Time tracking toggled');
      // Implementation would integrate with your actual workflow
    }
  },
  {
    id: 'print-details',
    label: 'Print Case Details',
    shortcut: 'F7',
    icon: <Printer size={18} />,
    action: () => {
      toast.success('Printing case details');
      // Implementation would integrate with your actual workflow
    }
  },
  {
    id: 'mark-resolved',
    label: 'Mark as Resolved',
    shortcut: 'F8',
    icon: <CopyCheck size={18} />,
    action: () => {
      toast.success('Case marked as resolved');
      // Implementation would integrate with your actual workflow
    }
  },
  {
    id: 'save-draft',
    label: 'Save Draft',
    shortcut: 'F9',
    icon: <Save size={18} />,
    action: () => {
      toast.success('Draft saved successfully');
      // Implementation would integrate with your actual workflow
    }
  }
];

const QuickActions: React.FC = () => {
  // In a real implementation, this would likely come from localStorage or a database
  const [actions, setActions] = React.useState<ActionItem[]>(
    () => {
      const saved = localStorage.getItem('quickActions');
      return saved ? JSON.parse(saved) : defaultActions;
    }
  );
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if key pressed is F1-F9
      const key = e.key;
      if (key.startsWith('F') && !isNaN(parseInt(key.slice(1)))) {
        e.preventDefault(); // Prevent default browser behavior for function keys
        
        const actionIndex = parseInt(key.slice(1)) - 1;
        if (actionIndex >= 0 && actionIndex < actions.length) {
          actions[actionIndex].action();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [actions]);
  
  return (
    <div className="w-full bg-white border border-border rounded-lg shadow-subtle overflow-hidden">
      <div className="p-4 border-b border-border bg-secondary/50">
        <h2 className="text-lg font-medium">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Press the function key or click a button to perform an action</p>
      </div>
      
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-slide-in">
        {actions.map((action) => (
          <ActionButton
            key={action.id}
            onClick={action.action}
            shortcut={action.shortcut}
            icon={action.icon}
            className="justify-start"
          >
            {action.label}
          </ActionButton>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
