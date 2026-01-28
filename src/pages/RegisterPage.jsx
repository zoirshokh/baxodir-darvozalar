import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* ===== STEP 1 VALIDATION ===== */
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ism kiritish majburiy";
    }

    if (!formData.email) {
      newErrors.email = "Email kiritish majburiy";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email formati noto‘g‘ri";
    }

    if (!formData.phone) {
      newErrors.phone = "Telefon raqam kiritish majburiy";
    }

    return newErrors;
  };

  /* ===== STEP 2 VALIDATION (6 TA YOKI KO‘P) ===== */
  const validateStep2 = () => {
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password =
        "Kod kamida 6 ta belgidan iborat bo‘lishi kerak";
    }

    if (formData.confirmPassword.length < 6) {
      newErrors.confirmPassword =
        "Kodni tasdiqlang (kamida 6 ta belgi)";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Kodlar mos kelmadi";
    }

    return newErrors;
  };

  /* NEXT STEP */
  const handleNextStep = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validateStep2();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 1000));

      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: "+998" + formData.phone,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      alert("Ro'yxatdan muvaffaqiyatli o'tildi!");
      navigate("/dashboard");
    } catch {
      setErrors({ general: "Xatolik yuz berdi" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Ro'yxatdan o'tish</h2>
          <p>Kod kamida 6 ta belgi</p>
        </div>

        <form
          className="auth-form"
          onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}
        >
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="form-group">
                <label>Ism</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="field-error">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Telefon</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span className="field-error">{errors.phone}</span>
                )}
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

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="form-group">
                <label>Kod (kamida 6 ta)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="******"
                />
                {errors.password && (
                  <span className="field-error">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label>Kodni tasdiqlash</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="******"
                />
                {errors.confirmPassword && (
                  <span className="field-error">
                    {errors.confirmPassword}
                  </span>
                )}
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
                  {loading ? "Saqlanmoqda..." : "Ro'yxatdan o'tish"}
                </button>
              </div>
            </>
          )}

          <div className="auth-footer">
            Hisobingiz bormi? <Link to="/login">Kirish</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
