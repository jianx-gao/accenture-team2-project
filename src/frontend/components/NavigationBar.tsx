import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css';

/**
 * NavigationBar component provides consistent navigation across all pages
 * 
 * Features:
 * - Links to Dashboard, Planner, About, and AI Chat pages
 * - Active page highlighting
 * - Responsive design
 * 
 * Requirements: 5.1, 5.5, 5.6
 */
function NavigationBar() {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            Event Planning Platform
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/planner" 
              className={`nav-link ${isActive('/planner') ? 'active' : ''}`}
            >
              Planner
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/ai-chat" 
              className={`nav-link ${isActive('/ai-chat') ? 'active' : ''}`}
            >
              AI Chat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
