import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Foydalanuvchi ma'lumotlarini olish
    const userData = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (!userData || !isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Xush kelibsiz, {user.name}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Chiqish
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Hisobingiz faollashtirildi</h2>
          <p>Email: {user.email}</p>
          {user.phone && <p>Telefon: +998{user.phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;