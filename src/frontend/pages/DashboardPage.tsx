import './DashboardPage.css';

/**
 * DashboardPage component - Main landing page with overview and welcome
 * 
 * This is the front page of the application
 */
function DashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="hero-section">
        <h1>Event Planning Made Easy</h1>
        <p className="hero-subtitle">
          Get AI-powered recommendations for your next event within your budget
        </p>
        <div className="hero-actions">
          <a href="/planner" className="cta-button primary">
            Start Planning
          </a>
          <a href="/about" className="cta-button secondary">
            Learn More
          </a>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Smart Planning</h3>
            <p>Input your event details and get instant venue recommendations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Budget-Friendly</h3>
            <p>Find venues that match your budget constraints perfectly</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered</h3>
            <p>Chat with our AI assistant for personalized recommendations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Location-Based</h3>
            <p>Discover venues in your preferred location with ease</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Venues Available</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Events Planned</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">98%</div>
          <div className="stat-label">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
