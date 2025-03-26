import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const SalesforceInjectUI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  const openExtensionPopup = () => {
    // Check if Chrome API is available before using it
    if (typeof chrome !== 'undefined' && chrome?.runtime?.sendMessage) {
      // This will open the extension popup
      chrome.runtime.sendMessage({ action: 'openPopup' });
    } else {
      console.warn('Chrome extension API not available');
    }
  };
  
  return (
    <div className="salesforce-inject-ui" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
    }}>
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          padding: '10px',
          width: '200px',
        }}>
          <button 
            onClick={openExtensionPopup}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              margin: '5px 0',
              border: 'none',
              backgroundColor: '#f3f4f6',
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
            }}
          >
            Open Support Simplifier
          </button>
        </div>
      )}
      
      <button
        onClick={toggleOpen}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#4f46e5',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default SalesforceInjectUI;
