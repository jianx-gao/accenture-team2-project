import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AIChatPage from './pages/AIChatPage';

/**
 * App component - Root component with routing configuration
 * 
 * Features:
 * - React Router setup with routes for Home, About, and AI Chat pages
 * - NavigationBar integrated on all pages
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */
function App() {
  return (
    <Router>
      <div className="app">
        <NavigationBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ai-chat" element={<AIChatPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
