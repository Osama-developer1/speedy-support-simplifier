
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExtensionApp from './ExtensionApp';
import SettingsPage from './pages/SettingsPage';
import './index.css';

const root = document.getElementById('extension-root');
if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExtensionApp />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
