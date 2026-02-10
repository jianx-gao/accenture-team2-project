import BudgetInputForm, { FormData } from '../components/BudgetInputForm';
import './HomePage.css';

/**
 * HomePage component - Main landing page with budget input form and recommendations
 * 
 * Requirements: 5.2
 */
function HomePage() {
  const handleFormSubmit = (formData: FormData) => {
    console.log('Form submitted with data:', formData);
    // TODO: Call API service to get recommendations
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Event Planning Made Easy</h1>
        <p>Get AI-powered recommendations for your next event within your budget</p>
      </div>
      
      <BudgetInputForm onSubmit={handleFormSubmit} />
      
      <div className="recommendations-section">
        {/* TODO: Add recommendation display component */}
      </div>
    </div>
  );
}

export default HomePage;
