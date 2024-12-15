
import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = () => {
  const [birthday, setBirthday] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, birthday]);

  const calculateTimeLeft = () => {
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDifference = nextBirthday - today;

    const days = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  const handleBirthdayChange = (e) => {
    setBirthday(new Date(e.target.value));
  };

  const handleStartCountdown = (e) => {
    e.preventDefault();
    if (birthday) {
      setIsActive(true);
      calculateTimeLeft();
    }
  };

  const handleReset = () => {
    setBirthday('');
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setIsActive(false);
  };

  return (
    <div className="countdown-container">
      <h1 className="countdown-heading">Countdown to Your Birthday</h1>

      <form onSubmit={handleStartCountdown} className="countdown-form">
        <input
          type="date"
          value={birthday ? birthday.toISOString().substring(0, 10) : ''}
          onChange={handleBirthdayChange}
          className="countdown-input"
          required
        />
        <button type="submit" className="countdown-button">
          Start Countdown
        </button>
      </form>

      {isActive && (
        <div className="countdown-timer">
          <div className="timer-section">
            <div>
              <span className="timer-value">{timeLeft.days}</span>
              <span className="timer-label">Days</span>
            </div>
            <div>
              <span className="timer-value">{timeLeft.hours}</span>
              <span className="timer-label">Hours</span>
            </div>
            <div>
              <span className="timer-value">{timeLeft.minutes}</span>
              <span className="timer-label">Minutes</span>
            </div>
            <div>
              <span className="timer-value">{timeLeft.seconds}</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>

          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Countdown;
