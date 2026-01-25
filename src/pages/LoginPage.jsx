import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css"

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email kiritish majburiy';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email formati noto‘g‘ri';
    }
    
    if (!formData.password) {
      newErrors.password = 'Parol kiritish majburiy';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parol kamida 6 belgidan iborat bo‘lishi kerak';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // Mock API call - haqiqiy ilovada backendga so'rov yuboriladi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Foydalanuvchini localStorage'ga saqlash
      const userData = {
        id: '1',
        email: formData.email,
        name: 'Foydalanuvchi',
        token: 'mock-jwt-token',
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Dashboardga yo'naltirish
      navigate('/dashboard');
      
    } catch (error) {
      setErrors({ general: 'Login qilishda xatolik. Iltimos, qayta urining.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} orqali login qilish`);
    // Haqiqiy ilovada social auth integration bo'ladi
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Kirish</h2>
          <p>Hisobingizga kiring</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {errors.general}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="example@mail.com"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Parol</label>
            <div className="password-input">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Parolingizni kiriting"
              />
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Eslab qolish
            </label>

          </div>
          
          <button 
            type="submit" 
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Kirilmoqda...
              </>
            ) : 'Kirish'}
          </button>
          
  
          
          
          <div className="auth-footer">
            Hisobingiz yo'qmi? <Link to="/register">Ro'yxatdan o'ting</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;