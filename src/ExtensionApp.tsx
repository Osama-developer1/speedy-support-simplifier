
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QuickActions from './components/QuickActions';
import ResponseTemplates from './components/ResponseTemplates';
import ExtensionHeader from './components/ExtensionHeader';

const queryClient = new QueryClient();

const ExtensionApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Sonner position="top-right" />
          <ExtensionHeader />
          <main className="container py-4 px-2 space-y-4">
            <QuickActions />
            <ResponseTemplates />
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default ExtensionApp;
