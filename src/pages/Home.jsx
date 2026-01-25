import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Home.css"

const Home = () => {
  const features = [
    { id: 1, title: "Yuqori sifat", desc: "100% sifatli materiallar", icon: "⭐" },
    { id: 3, title: "Kafolat", desc: "5 yilgacha kafolat", icon: "🛡️" },
    { id: 4, title: "Professional ustalar", desc: "Tajribali mutaxassislar", icon: "👷" }
  ];

  const darvozalar = [
    { id: 1, name: "Avtomatik darvoza", price: "12.000.000", image: "https://via.placeholder.com/300x200?text=Avtomatik+Darvoza" },
    { id: 2, name: "Sliding darvoza", price: "8.500.000", image: "https://via.placeholder.com/300x200?text=Sliding+Darvoza" },
    { id: 3, name: "Sectional darvoza", price: "15.000.000", image: "https://via.placeholder.com/300x200?text=Sectional+Darvoza" }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Baxodir Darvozalar</h1>
          <p className="hero-subtitle">Sifatli darvozalar va professional ustalar</p>
          <p className="hero-description">
            12 yillik tajribaga ega ustalar
            Biz yuqori sifatli avtomatik darvozalar va tajribali ustalar xizmatini taklif etamiz
          </p>
          <div className="hero-buttons">
            <Link to="/darvozalar" className="btn btn-primary btn-large">
              Darvozalar ko'rish
            </Link>
            <Link to="/ustalar" className="btn btn-outline btn-large">
              Ustalar bilan tanishish
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
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



      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>O'zingiz uchun eng yaxshi darvoza toping</h2>
          <p>Biz bilan bog'laning va bepul konsultatsiya oling</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              Ro'yxatdan o'tish
            </Link>
            <a href="tel:+998953001111" className="btn btn-outline btn-large">
              Qo'ng'iroq qilish
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;