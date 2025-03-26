
import React from 'react';
import QuickActions from './QuickActions';
import ResponseTemplates from './ResponseTemplates';

const Dashboard: React.FC = () => {
  return (
    <div className="layout-container py-8 space-y-8">
      <section>
        <h1 className="text-3xl font-semibold mb-2">Customer Service Assistant</h1>
        <p className="text-muted-foreground">
          Streamline your workflow with quick actions and templated responses.
        </p>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div>
          <ResponseTemplates />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
