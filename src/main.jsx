// Import StrictMode from React to help detect potential problems in development
import { StrictMode } from 'react';

// Import ReactDOM to render React app into browser DOM
import ReactDOM from 'react-dom/client';

// Import global CSS file
import './index.css';

// Import main App component
import App from './App.jsx';

// Find the HTML element with id "root" and create React root
ReactDOM.createRoot(document.getElementById('root')).render(

  // StrictMode runs extra checks during development
  <StrictMode>

    {/* Render the App component */}
    <App />

  </StrictMode>
);