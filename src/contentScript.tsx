import { createRoot } from 'react-dom/client';
import SalesforceInjectUI from './components/SalesforceInjectUI';

// Only add listener if Chrome API is available
if (typeof chrome !== 'undefined' && chrome?.runtime?.onMessage) {
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'copyToClipboard') {
      // Copy content to clipboard
      navigator.clipboard.writeText(message.content)
        .then(() => {
          sendResponse({ success: true });
          // Attempt to insert into active text field if possible
          tryInsertIntoActiveField(message.content);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          sendResponse({ success: false, error: err.toString() });
        });
      return true; // Indicates async response
    }
  });
}

function tryInsertIntoActiveField(content: string) {
  // Try to find the active element and insert text if it's an input or textarea
  const activeElement = document.activeElement as HTMLElement;
  
  if (activeElement && (
    activeElement.tagName === 'INPUT' || 
    activeElement.tagName === 'TEXTAREA' || 
    activeElement.getAttribute('contenteditable') === 'true'
  )) {
    if ('value' in activeElement) {
      const input = activeElement as HTMLInputElement | HTMLTextAreaElement;
      const startPos = input.selectionStart || 0;
      const endPos = input.selectionEnd || 0;
      
      input.value = 
        input.value.substring(0, startPos) + 
        content + 
        input.value.substring(endPos);
      
      // Set cursor position after inserted text
      input.selectionStart = input.selectionEnd = startPos + content.length;
      
      // Trigger input event to notify Salesforce of the change
      input.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (activeElement.getAttribute('contenteditable') === 'true') {
      // For contenteditable elements (like rich text editors)
      document.execCommand('insertText', false, content);
    }
  }
}

// Inject a floating button for quick access
function injectFloatingButton() {
  const floatingBtn = document.createElement('div');
  floatingBtn.id = 'support-simplifier-button';
  document.body.appendChild(floatingBtn);
  
  const root = createRoot(floatingBtn);
  root.render(<SalesforceInjectUI />);
}

// Wait for page to be fully loaded
window.addEventListener('load', () => {
  // Check if we're on a Salesforce page
  if (window.location.hostname.includes('salesforce.com') || 
      window.location.hostname.includes('force.com')) {
    setTimeout(injectFloatingButton, 1500); // Delay to ensure Salesforce UI is loaded
  }
});
