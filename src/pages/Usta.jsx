import React from 'react';
import baxodir from "../assets/baxodir.jpg";
import "../styles/Usta.css";

function Usta() {
  const phoneNumber = "+998953001111";

  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/darvozachi_11',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.08-.06-.19-.04-.27-.02-.12.03-1.98 1.26-5.6 3.68-.53.37-1.01.56-1.44.54-.48-.03-1.4-.27-2.08-.5-.84-.27-1.51-.42-1.45-.89.03-.24.36-.48 1-.74z',
      color: '#0088cc'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/metal_darvozalar.1111',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07...',
      color: '#E4405F'
    }
  ];

  return (
    <div className="usta-container">

      {/* PROFILE */}
      <div className="usta-profile">
        <div className="profile-image-container">
          <img src={baxodir} alt="Baxodir ustasi" className="profile-image" />
          <div className="profile-badge">Usta</div>
        </div>

        <div className="profile-info">
          <h1 className="profile-name">Baxodir</h1>
          <p className="profile-title">Metaldan darvozalar ishlab chiqaruvchi usta</p>
          <p className="profile-description">
            Yuqori sifatli metalldan darvozalar ishlab chiqaramiz.
          </p>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="social-section">
        <h2 className="social-title">Bog‘lanish</h2>

        <div className="social-links">

          {/* TELEGRAM & INSTAGRAM */}
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              style={{ '--color': link.color }}
            >
              <div className="social-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d={link.icon} fill="currentColor" />
                </svg>
              </div>

              <div className="social-info">
                <div className="social-name">{link.name}</div>
                <div className="social-url">{link.url.replace('https://', '')}</div>
              </div>

              <div className="social-arrow">›</div>
            </a>
          ))}

          {/* 📞 TELEFON */}
          <a
            href={`tel:${phoneNumber}`}
            className="social-card"
            style={{ '--color': '#2ecc71' }}
          >
            <div className="social-icon">📞</div>

            <div className="social-info">
              <div className="social-name">Telefon qilish</div>
              <div className="social-url">{phoneNumber}</div>
            </div>

            <div className="social-arrow">›</div>
          </a>

        </div>
      </div>

      <div className="contact-info">
        <p>Buyurtma va savollar uchun bog'lanish uchun </p>
      </div>
    </div>
  );
}

export default Usta;
