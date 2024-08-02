// Header.js
'use client';
import React, { useState, useEffect } from 'react';
import '../style.css';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const formatTime = (date) => {
      const hours12 = date.getHours() % 12 || 12;
      const minutes = date.getMinutes();
      const isAm = date.getHours() < 12;
      return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
    };

    const formatDate = (date) => {
      const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    };

    const updateTimeAndDate = () => {
      const now = new Date();
      setCurrentTime(formatTime(now));
      setCurrentDate(formatDate(now));
    };

    updateTimeAndDate();
    const intervalId = setInterval(updateTimeAndDate, 200);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  return (
    <header className="header">
      <div className="welcome">
        WELCOME! {username}
      </div>
      <div className="actions">
        <span>[F1] LOG-OUT</span>
        <span>[F2] Search Product</span>
        <span>[F3] Void</span>
        <span>[F4] Shift Out</span>
        <span>[F6] Delete Product</span>
        <span>[F7] Enter Customer Name</span>
      </div>
      <div className="datetime">
        <div className="time">{currentTime}</div>
        <div className="date">{currentDate}</div>
      </div>
    </header>
  );
};

export default Header;
