import { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';

function Student() {
  const [activityCode, setActivityCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [validCodes, setValidCodes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/coduri')
      .then(response => {
        console.log('Coduri activități:', response.data);
        setValidCodes(response.data);
      })
      .catch(error => {
        console.error('Error fetching activity codes:', error);
        setErrorMessage('There was an error fetching the activity codes.');
      });
  }, []);

  const handleCodeSubmit = () => {
    console.log('Cod introdus:', activityCode);
    if (validCodes.includes(activityCode)) {
      setIsCodeValid(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid activity code. Please try again.');
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
        {errorMessage && <p className="error">{errorMessage}</p>} { }
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