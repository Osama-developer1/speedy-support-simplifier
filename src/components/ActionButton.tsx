
import React from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut?: string;
  variant?: 'default' | 'primary' | 'ghost';
  icon?: React.ReactNode;
  animated?: boolean;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, children, shortcut, variant = 'default', icon, animated = true, ...props }, ref) => {
    return (
      <button
        className={cn(
          'action-button group',
          variant === 'primary' && 'action-button-primary',
          variant === 'ghost' && 'action-button-ghost',
          animated && 'btn-effect',
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">{icon}</span>}
        <span className="text-balance">{children}</span>
        {shortcut && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground ml-2 transition-opacity duration-300 group-hover:opacity-80">
            {shortcut}
          </span>
        )}
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

export default ActionButton;
