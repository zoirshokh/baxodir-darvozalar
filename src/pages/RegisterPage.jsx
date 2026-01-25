import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Register.css"

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ism kiritish majburiy';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email kiritish majburiy';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email formati noto‘g‘ri';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Telefon raqam kiritish majburiy';
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Parol kiritish majburiy';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Parol kamida 8 belgidan iborat bo‘lishi kerak';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Parolda kamida bitta katta harf, kichik harf va raqam bo‘lishi kerak';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Parolni tasdiqlash majburiy';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Parollar mos kelmadi';
    }
    
    return newErrors;
  };

  const handleNextStep = () => {
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const step2Errors = validateStep2();
    
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      return;
    }
    
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Foydalanuvchi ma'lumotlarini saqlash
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Muvaffaqiyatli ro'yxatdan o'tish habari
      alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      
      // Dashboardga yo'naltirish
      navigate('/dashboard');
      
    } catch (error) {
      setErrors({ general: 'Ro‘yxatdan o‘tishda xatolik. Iltimos, qayta urining.' });
    } finally {
      setLoading(false);
    }
  };

  const progressSteps = [
    { number: 1, label: 'Shaxsiy ma\'lumotlar', active: step >= 1 },
    { number: 2, label: 'Xavfsizlik', active: step >= 2 },
  ];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Ro'yxatdan o'tish</h2>
          <p>Yangi hisob yarating</p>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-steps">
          {progressSteps.map((stepItem) => (
            <div key={stepItem.number} className={`step ${stepItem.active ? 'active' : ''}`}>
              <div className="step-number">{stepItem.number}</div>
              <div className="step-label">{stepItem.label}</div>
            </div>
          ))}
        </div>
        
        <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} className="auth-form">
          {errors.general && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {errors.general}
            </div>
          )}
          
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="name">To'liq ism</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Ism familiyangiz"
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              
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
                <label htmlFor="phone">Telefon raqam</label>
                <div className="phone-input">
                  <span className="phone-prefix">+998</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="901234567"
                    maxLength="9"
                  />
                </div>
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
              
              <button 
                type="button" 
                className="auth-button primary"
                onClick={handleNextStep}
              >
                Keyingi qadam
              </button>
            </>
          )}
          
          {step === 2 && (
            <>
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
                    placeholder="Kamida 8 belgi"
                  />
                  <div className="password-strength">
                    <div className={`strength-bar ${formData.password.length >= 8 ? 'strong' : 'weak'}`}></div>
                    <span>Parol kuchli</span>
                  </div>
                </div>
                {errors.password && <span className="field-error">{errors.password}</span>}
                <div className="password-hints">
                  <span className={formData.password.length >= 8 ? 'valid' : ''}>• Kamida 8 belgi</span>
                  <span className={/(?=.*[A-Z])/.test(formData.password) ? 'valid' : ''}>• Bitta katta harf</span>
                  <span className={/(?=.*\d)/.test(formData.password) ? 'valid' : ''}>• Bitta raqam</span>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Parolni tasdiqlash</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Parolni takrorlang"
                />
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>
              
              <div className="terms-agreement">
                <label className="checkbox-container">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>
                  Men <Link to="/terms">foydalanish shartlari</Link> va{' '}
                  <Link to="/privacy">maxfiylik siyosati</Link> bilan tanishdim va roziman
                </label>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="auth-button secondary"
                  onClick={() => setStep(1)}
                >
                  Ortga
                </button>
                <button 
                  type="submit" 
                  className="auth-button primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Ro'yxatdan o'tilmoqda...
                    </>
                  ) : "Ro'yxatdan o'tish"}
                </button>
              </div>
            </>
          )}
          
          <div className="auth-footer">
            Allaqachon hisobingiz bormi? <Link to="/login">Kirish</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;