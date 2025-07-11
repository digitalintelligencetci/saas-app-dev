import { useState } from 'react'
import './App.css'

const EMERGENCY_NUMBER = '1800123456'; // Replace with real number
const ISSUES = [
  'Flat Tire',
  'Out of Fuel',
  'Engine Trouble',
  'Locked Out',
  'Other',
];

function App() {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="roadside-app">
      <h1>Roadside Service</h1>
      <p>If you have an emergency, select your issue and call the on-call responder.</p>
      <form onSubmit={handleSubmit} className="issue-form">
        <div className="issue-options">
          {ISSUES.map((issue) => (
            <label key={issue} className={`issue-label${selectedIssue === issue ? ' selected' : ''}`}>
              <input
                type="radio"
                name="issue"
                value={issue}
                checked={selectedIssue === issue}
                onChange={() => setSelectedIssue(issue)}
                required
              />
              {issue}
            </label>
          ))}
        </div>
        <button type="submit" className="submit-btn" disabled={!selectedIssue}>
          Confirm Issue
        </button>
      </form>
      {submitted && (
        <div className="call-section">
          <p>
            Issue reported: <strong>{selectedIssue}</strong>
          </p>
          <a href={`tel:${EMERGENCY_NUMBER}`} className="call-btn">
            Call On-Call ({EMERGENCY_NUMBER})
          </a>
        </div>
      )}
    </div>
  );
}

export default App
