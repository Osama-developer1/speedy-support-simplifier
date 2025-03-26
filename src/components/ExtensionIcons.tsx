
import React from 'react';

// This component creates SVG icons that will be used for the extension
// In a real-world scenario, you'd have actual icon files
export const ExtensionIcon16 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="3" fill="#4F46E5" />
    <path d="M4 8H12M8 4V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ExtensionIcon48 = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#4F46E5" />
    <path d="M12 24H36M24 12V36" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ExtensionIcon128 = () => (
  <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#4F46E5" />
    <path d="M32 64H96M64 32V96" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
