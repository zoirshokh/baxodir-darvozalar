import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css";

const Home = () => {
  const features = [
    { id: 1, title: "Yuqori sifat", desc: "100% sifatli materiallar", icon: "⭐" },
    { id: 3, title: "Kafolat", desc: "5 yilgacha kafolat", icon: "🛡️" },
    { id: 4, title: "Professional ustalar", desc: "Tajribali mutaxassislar", icon: "👷" }
  ];

  // 🔐 AUTH
  const isAuth = localStorage.getItem("isAuthenticated");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔤 ISM → RZ
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className="homepage">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Baxodir Darvozalar</h1>
          <p className="hero-subtitle">Sifatli darvozalar va professional ustalar</p>
          <p className="hero-description">
            12 yillik tajribaga ega ustalar.
            Biz yuqori sifatli avtomatik darvozalar xizmatini taklif etamiz.
          </p>
          <div className="hero-buttons">
            <Link to="/darvozalar" className="btn btn-primary btn-large">
              Darvozalar ko‘rish
            </Link>
            <Link to="/ustalar" className="btn btn-outline btn-large">
              Ustalar bilan tanishish
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Nima uchun bizni tanlashadi?</h2>
          <div className="features-grid">
            {features.map(feature => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>O‘zingiz uchun eng yaxshi darvoza toping</h2>
          <p>Biz bilan bog‘laning va bepul konsultatsiya oling</p>

          <div className="cta-buttons">
            {!isAuth ? (
              // ❌ LOGIN YO‘Q
              <Link to="/register" className="btn btn-primary btn-large">
                Ro‘yxatdan o‘tish
              </Link>
            ) : (
              // ✅ LOGIN BOR → FAQAT RZ
              <div className="user-initials-only">
                {getInitials(user?.name)}
              </div>
            )}

            <a href="tel:+998953001111" className="btn btn-outline btn-large">
              Qo‘ng‘iroq qilish
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
