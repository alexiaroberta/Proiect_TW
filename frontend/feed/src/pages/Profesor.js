import React, { useState, useEffect } from 'react';
import './Profesor.css';
 
function App() {
    const [activity, setActivity] = useState({
        date: '',
        description: '',
        accessCode: '',
        duration: { days: 0, hours: 0, minutes: 0 }
    });
    const [activities, setActivities] = useState([]);
    const [feedbackStream, setFeedbackStream] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [error, setError] = useState('');
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'days' || name === 'hours' || name === 'minutes') {
            setActivity((prevActivity) => ({
                ...prevActivity,
                duration: {
                    ...prevActivity.duration,
                    [name]: parseInt(value, 10)
                }
            }));
        } else {
            setActivity((prevActivity) => ({
                ...prevActivity,
                [name]: value
            }));
        }
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
 
        const { days, hours, minutes } = activity.duration;
 
        if (days === 0 && hours === 0 && minutes === 0) {
            setError('Please specify a valid duration (at least one value greater than 0).');
            return;
        }
 
        const isDuplicate = activities.some(act => act.accessCode === activity.accessCode);
 
        if (isDuplicate) {
            setError('An activity with this ID already exists. Please choose a unique ID.');
            return;
        }
 
        if (activity.date && activity.description && activity.accessCode) {
            setActivities([...activities, activity]);
            setActivity({ date: '', description: '', accessCode: '', duration: { days: 0 , hours: 0, minutes: 0 } });
            setError('');
        } else {
            setError('Please fill out all fields.');
        }
    };
 
    const handleSelectActivity = (activity) => {
        setSelectedActivity(activity);
        setFeedbackStream([]);
    };
 
    const closeErrorModal = () => {
        setError('');
    };
 
    useEffect(() => {
        if (selectedActivity) {
            const interval = setInterval(() => {
                const feedbackTypes = ['😊', '😞', '😲', '😕'];
                const randomFeedback = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)];
                const timestamp = new Date().toISOString();
                setFeedbackStream((prevStream) => [
                    ...prevStream,
                    { emoji: randomFeedback, timestamp }
                ]);
            }, 3000);
 
            return () => clearInterval(interval);
        }
    }, [selectedActivity]);
 
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 3000);
 
            return () => clearTimeout(timer); 
        }
    }, [error]);
 
    return (
        <div className="App">
            <h1>Professor Activities Menu</h1>
            <form onSubmit={handleSubmit} className="activity-form">
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={activity.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={activity.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    ID:
                    <input
                        type="text"
                        name="accessCode"
                        value={activity.accessCode}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Duration:
                    <div className="duration-inputs">
                        <select
                            name="days"
                            value={activity.duration.days}
                            onChange={handleChange}
                        >
                            {[...Array(31)].map((_, index) => (
                                <option key={index} value={index}>
                                    {index} day{index !== 1 && 's'}
                                </option>
                            ))}
                        </select>
                        <select
                            name="hours"
                            value={activity.duration.hours}
                            onChange={handleChange}
                        >
                            {[...Array(24)].map((_, index) => (
                                <option key={index} value={index}>
                                    {index} hour{index !== 1 && 's'}
                                </option>
                            ))}
                        </select>
                        <select
                            name="minutes"
                            value={activity.duration.minutes}
                            onChange={handleChange}
                        >
                            {[...Array(60)].map((_, index) => (
                                <option key={index} value={index}>
                                    {index} minute{index !== 1 && 's'}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>
 
                <button type="submit">Add activity</button>
            </form>
 
            <div className="activity-list">
                <h2>Activities</h2>
                {activities.map((act, index) => (
                    <div
                        key={index}
                        className="activity-item"
                        onClick={() => handleSelectActivity(act)}
                    >
                        <p><strong>Date:</strong> {act.date}</p>
                        <p><strong>Description:</strong> {act.description}</p>
                        <p><strong>ID:</strong> {act.accessCode}</p>
                        <p><strong>Duration:</strong>
                            {act.duration.days > 0 && `${act.duration.days} day${act.duration.days !== 1 ? 's' : ''} `} 
                            {act.duration.hours > 0 && `${act.duration.hours} hour${act.duration.hours !== 1 ? 's' : ''} `} 
                            {act.duration.minutes > 0 && `${act.duration.minutes} minutes${act.duration.minutes !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                ))}
            </div>
 
            {selectedActivity && (
                <div className="feedback-section">
                    <h2>Feedbacks</h2>
                    <h3>ID: {selectedActivity.accessCode}</h3>
                    {feedbackStream.length === 0 ? (
                        <p>No feedbacks available</p>
                    ) : (
                        <ul className="feedback-stream">
                            {feedbackStream.map((item, index) => (
                                <li key={index}>
                                    <span className="emoji">{item.emoji}</span> {item.timestamp}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
 
            {}
            {error && (
                <div className="error-modal">
                    <div className="error-modal-content">
                        <span className="close" onClick={closeErrorModal}>&times;</span>
                        <p>{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default App;
