
import React from 'react';
import { Copy, MessageSquareText } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  title: string;
  content: string;
}

const defaultTemplates: Template[] = [
  {
    id: '1',
    title: 'Supplier Investigation',
    content: 'Thank you for contacting us. Your case has been forwarded to the supplier for investigation. We expect to receive a response within 3-5 business days.'
  },
  {
    id: '2',
    title: 'Case Closure',
    content: 'I hope this email finds you well. We are pleased to inform you that your case has been resolved. If you have any further questions, please don't hesitate to contact us.'
  },
  {
    id: '3',
    title: 'Additional Information',
    content: 'To proceed with your case, we require additional information. Could you please provide the following details: [DETAILS]. This will help us resolve your case more efficiently.'
  },
  {
    id: '4',
    title: 'Refund Processing',
    content: 'We're happy to inform you that your refund has been processed. Please allow 5-10 business days for the funds to appear in your account, depending on your bank's processing time.'
  },
  {
    id: '5',
    title: 'Escalation Notice',
    content: 'Your case has been escalated to our specialized team for further review. We understand the urgency of your situation and we're working to resolve it as quickly as possible.'
  }
];

const ResponseTemplates: React.FC = () => {
  const [templates, setTemplates] = React.useState<Template[]>(
    () => {
      const saved = localStorage.getItem('responseTemplates');
      return saved ? JSON.parse(saved) : defaultTemplates;
    }
  );

  const copyToClipboard = (content: string, title: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success(`Template "${title}" copied to clipboard`);
      })
      .catch((err) => {
        toast.error('Failed to copy template');
        console.error('Copy failed: ', err);
      });
  };

  return (
    <div className="w-full bg-white border border-border rounded-lg shadow-subtle overflow-hidden">
      <div className="p-4 border-b border-border bg-secondary/50">
        <h2 className="text-lg font-medium">Response Templates</h2>
        <p className="text-sm text-muted-foreground">Click to copy a template to your clipboard</p>
      </div>
      
      <div className="divide-y divide-border animate-fade-in">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="p-4 hover:bg-muted/30 transition-colors duration-200 cursor-pointer"
            onClick={() => copyToClipboard(template.content, template.title)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium flex items-center gap-2">
                <MessageSquareText size={16} className="text-primary" />
                {template.title}
              </h3>
              <button 
                className="p-1.5 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(template.content, template.title);
                }}
                title="Copy template"
              >
                <Copy size={14} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{template.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseTemplates;
