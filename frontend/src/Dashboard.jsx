import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory

const Dashboard = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate(); // useNavigate for navigation

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/');  // Redirect to login page if token doesn't exist
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Your token: {token}</p>
      {/* You can display more details or user-specific content here */}
    </div>
  );
};

export default Dashboard;
