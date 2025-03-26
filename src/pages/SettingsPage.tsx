
import React from 'react';
import Header from '@/components/Header';
import Settings from '@/components/Settings';

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Settings />
      </main>
    </div>
  );
};

export default SettingsPage;
