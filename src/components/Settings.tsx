
import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X, ArrowLeft, Trash, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import ActionButton from './ActionButton';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ActionItem {
  id: string;
  label: string;
  shortcut: string;
  icon?: React.ReactNode;
  action?: () => void;
}

interface TemplateItem {
  id: string;
  title: string;
  content: string;
}

const defaultActions: ActionItem[] = [
  { id: '1', label: 'Find Supplier Email', shortcut: 'F1' },
  { id: '2', label: 'Close Case - Supplier Response', shortcut: 'F2' },
  { id: '3', label: 'Search External Systems', shortcut: 'F3' },
  { id: '4', label: 'Insert Standard Response', shortcut: 'F4' },
  { id: '5', label: 'Schedule Follow-up', shortcut: 'F5' },
  { id: '6', label: 'Start/Stop Time Tracking', shortcut: 'F6' },
  { id: '7', label: 'Print Case Details', shortcut: 'F7' },
  { id: '8', label: 'Mark as Resolved', shortcut: 'F8' },
  { id: '9', label: 'Save Draft', shortcut: 'F9' },
];

const defaultTemplates: TemplateItem[] = [
  {
    id: '1',
    title: 'Supplier Investigation',
    content: "Thank you for contacting us. Your case has been forwarded to the supplier for investigation. We expect to receive a response within 3-5 business days."
  },
  {
    id: '2',
    title: 'Case Closure',
    content: "I hope this email finds you well. We are pleased to inform you that your case has been resolved. If you have any further questions, please don't hesitate to contact us."
  },
  {
    id: '3',
    title: 'Additional Information',
    content: "To proceed with your case, we require additional information. Could you please provide the following details: [DETAILS]. This will help us resolve your case more efficiently."
  },
  {
    id: '4',
    title: 'Refund Processing',
    content: "We're happy to inform you that your refund has been processed. Please allow 5-10 business days for the funds to appear in your account, depending on your bank's processing time."
  },
  {
    id: '5',
    title: 'Escalation Notice',
    content: "Your case has been escalated to our specialized team for further review. We understand the urgency of your situation and we're working to resolve it as quickly as possible."
  }
];

const Settings: React.FC = () => {
  // Actions state
  const [actions, setActions] = useState<ActionItem[]>(() => {
    const saved = localStorage.getItem('quickActions');
    return saved ? JSON.parse(saved) : defaultActions;
  });

  // Templates state
  const [templates, setTemplates] = useState<TemplateItem[]>(() => {
    const saved = localStorage.getItem('responseTemplates');
    return saved ? JSON.parse(saved) : defaultTemplates;
  });

  // When actions or templates change, save to localStorage
  useEffect(() => {
    localStorage.setItem('quickActions', JSON.stringify(actions));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem('responseTemplates', JSON.stringify(templates));
  }, [templates]);

  // Handler for action changes
  const handleActionChange = (id: string, field: keyof ActionItem, value: string) => {
    setActions(prev => 
      prev.map(action => 
        action.id === id 
          ? { ...action, [field]: value } 
          : action
      )
    );
  };

  // Handler for template changes
  const handleTemplateChange = (id: string, field: keyof TemplateItem, value: string) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === id 
          ? { ...template, [field]: value } 
          : template
      )
    );
  };

  // Add new action
  const addNewAction = () => {
    const newId = String(Date.now());
    const newAction: ActionItem = {
      id: newId,
      label: 'New Action',
      shortcut: 'F' + (actions.length + 1),
    };
    setActions([...actions, newAction]);
  };

  // Add new template
  const addNewTemplate = () => {
    const newId = String(Date.now());
    const newTemplate: TemplateItem = {
      id: newId,
      title: 'New Template',
      content: 'Template content goes here...'
    };
    setTemplates([...templates, newTemplate]);
  };

  // Remove action
  const removeAction = (id: string) => {
    setActions(prev => prev.filter(action => action.id !== id));
  };

  // Remove template
  const removeTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      setActions(defaultActions);
      setTemplates(defaultTemplates);
      toast.success('Settings reset to defaults');
    }
  };

  // Save all changes
  const saveChanges = () => {
    localStorage.setItem('quickActions', JSON.stringify(actions));
    localStorage.setItem('responseTemplates', JSON.stringify(templates));
    toast.success('All changes saved successfully');
  };

  return (
    <div className="layout-container py-8 space-y-8 animate-fade-in">
      <section className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <ActionButton 
            variant="ghost" 
            onClick={resetToDefaults}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            icon={<AlertTriangle size={16} />}
          >
            Reset to Defaults
          </ActionButton>
          
          <ActionButton 
            variant="primary" 
            onClick={saveChanges}
            icon={<Save size={16} />}
          >
            Save Changes
          </ActionButton>
        </div>
      </section>
      
      {/* Quick Actions Settings */}
      <section className="w-full bg-white border border-border rounded-lg shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Customize your quick actions and keyboard shortcuts</p>
          </div>
          
          <ActionButton 
            variant="ghost" 
            onClick={addNewAction}
            className="text-primary"
            icon={<PlusCircle size={16} />}
          >
            Add Action
          </ActionButton>
        </div>
        
        <div className="divide-y divide-border animate-fade-in">
          {actions.map((action) => (
            <div key={action.id} className="p-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6 sm:col-span-5">
                <label className="text-xs text-muted-foreground mb-1 block">Action Label</label>
                <input
                  type="text"
                  value={action.label}
                  onChange={(e) => handleActionChange(action.id, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="col-span-3 sm:col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Shortcut</label>
                <input
                  type="text"
                  value={action.shortcut}
                  onChange={(e) => handleActionChange(action.id, 'shortcut', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="col-span-2 sm:col-span-4">
                <label className="text-xs text-muted-foreground mb-1 block opacity-0">Actions</label>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => removeAction(action.id)}
                    className="p-2 text-muted-foreground hover:text-destructive rounded-md transition-colors"
                    title="Remove Action"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Response Templates Settings */}
      <section className="w-full bg-white border border-border rounded-lg shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Response Templates</h2>
            <p className="text-sm text-muted-foreground">Customize your predefined response templates</p>
          </div>
          
          <ActionButton 
            variant="ghost" 
            onClick={addNewTemplate}
            className="text-primary"
            icon={<PlusCircle size={16} />}
          >
            Add Template
          </ActionButton>
        </div>
        
        <div className="divide-y divide-border animate-fade-in">
          {templates.map((template) => (
            <div key={template.id} className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Template Title</label>
                <button
                  onClick={() => removeTemplate(template.id)}
                  className="p-2 text-muted-foreground hover:text-destructive rounded-md transition-colors"
                  title="Remove Template"
                >
                  <Trash size={16} />
                </button>
              </div>
              
              <input
                type="text"
                value={template.title}
                onChange={(e) => handleTemplateChange(template.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              
              <label className="text-xs text-muted-foreground block">Template Content</label>
              <textarea
                value={template.content}
                onChange={(e) => handleTemplateChange(template.id, 'content', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;
