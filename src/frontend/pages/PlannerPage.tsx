import BudgetInputForm, { FormData } from '../components/BudgetInputForm';
import './PlannerPage.css';

/**
 * PlannerPage component - Event planning page with budget input form and recommendations
 * 
 * This page allows users to input their event details and get venue recommendations
 */
function PlannerPage() {
  const handleFormSubmit = (formData: FormData) => {
    console.log('Form submitted with data:', formData);
    // TODO: Call API service to get recommendations
  };

  return (
    <div className="planner-page">
      <div className="planner-header">
        <h1>Plan Your Event</h1>
        <p>Enter your event details below to get personalized venue recommendations</p>
      </div>
      
      <div className="planner-content">
        <BudgetInputForm onSubmit={handleFormSubmit} />
        
        <div className="recommendations-section">
          {/* TODO: Add recommendation display component */}
          <div className="recommendations-placeholder">
            <p>Your venue recommendations will appear here after you submit the form</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlannerPage;
