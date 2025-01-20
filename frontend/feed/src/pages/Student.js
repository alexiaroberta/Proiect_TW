import { useState } from 'react';
import './Student.css';

function Student() {
  const [activityCode, setActivityCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const validCodes = ['ACT123', 'ACT456', 'ACT789'];

  const handleCodeSubmit = () => {
    if (validCodes.includes(activityCode)) {
      setIsCodeValid(true);
    } else {
      alert('Invalid activity code. Please try again.');
    }
  };

  const handleFeedback = (emoji) => {
    const timestamp = new Date().toISOString();
    setFeedback((prevFeedback) => [...prevFeedback, { emoji, timestamp }]);
  };

  if (!isCodeValid) {
    return (
      <div>
        <h2>Access Activity</h2>
        <label htmlFor="activityCode">Enter Activity Code:</label>
        <input
          type="text"
          id="activityCode"
          value={activityCode}
          onChange={(e) => setActivityCode(e.target.value)}
          placeholder="Enter code"
        />
        <button onClick={handleCodeSubmit}>Submit</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Feedback</h2>
      <p>Activity Code: {activityCode}</p>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <button onClick={() => handleFeedback('smiley')}>
          😊<br />Smiley Face
        </button>
        <button onClick={() => handleFeedback('frowny')}>
          😞<br />Frowny Face
        </button>
        <button onClick={() => handleFeedback('surprised')}>
          😲<br />Surprised Face
        </button>
        <button onClick={() => handleFeedback('confused')}>
          😕<br />Confused Face
        </button>
      </div>

      <h3>Feedback Stream</h3>
      <ul>
        {feedback.map((item, index) => (
          <li key={index}>
            {item.emoji} at {item.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Student;