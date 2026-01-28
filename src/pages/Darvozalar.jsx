import React, { useState } from 'react';
import '../styles/Darvozalar.css';

// ===== RASMLARNI IMPORT QILAMIZ =====
import image12 from '../assets/image12.jpg';
import image13 from '../assets/image13.jpg';
import image14 from '../assets/image14.jpg';
import image15 from '../assets/image15.jpg';
import image16 from '../assets/image16.jpg';
import image17 from '../assets/image17.jpg';
import image18 from '../assets/image18.jpg';
import image19 from '../assets/image19.jpg';
import image20 from '../assets/image20.jpg';
import image21 from '../assets/image21.jpg';
import image22 from '../assets/image22.jpg';
import image23 from '../assets/image23.jpg';
import image24 from '../assets/image24.jpg';
import image26 from '../assets/image26.jpg';
import image27 from '../assets/image27.jpg';
import image28 from '../assets/image28.jpg';
import image29 from '../assets/image29.jpg';
import image30 from '../assets/image30.jpg';
import image31 from '../assets/image31.jpg';
import image32 from '../assets/image32.jpg';
import image33 from '../assets/image33.jpg';
import image34 from '../assets/image34.jpg';
import image35 from '../assets/image35.jpg';
import image36 from '../assets/image36.jpg';
import image37 from '../assets/image37.jpg';
import image38 from '../assets/image38.jpg';
import image39 from '../assets/image39.jpg';
import image40 from '../assets/image40.jpg';

function Darvozalar() {
  // ===== RASMLAR ARRAY =====
  const darvozalarRasmlari = [
    image12, image13, image14, image15,
    image16, image17, image18, image19,
    image20, image21, image22, image23,
    image24, image26, image27, image28,
    image29, image30, image31, image32,
    image33, image34, image35, image36,
    image37, image38, image39, image40
  ];

  // ===== STATE =====
  const [selectedImage, setSelectedImage] = useState(null);

  // ===== TELEGRAM DEMO =====
const handleTelegramShare = () => {
  window.open('https://t.me/baxodirdarvozachi', '_blank');
};


  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="darvozalar-container">
      <h1 className="darvozalar-title">Darvozalar Galereyasi</h1>
      <p className="darvozalar-description">
        Quyida zamonaviy va sifatli darvozalar rasmlari jamlanmasi.
      </p>

      {/* ===== GALEREYA ===== */}
      <div className="gallery-grid">
        {darvozalarRasmlari.map((image, index) => (
          <div key={index} className="gallery-item">
            <div className="image-wrapper">
              <img
                src={image}
                alt={`Darvoza ${index + 1}`}
                className="gallery-image"
                onClick={() => setSelectedImage(image)}
              />

              <div className="image-overlay">
                <button
                  className="view-btn"
                  onClick={() => setSelectedImage(image)}
                >
                  Kattalashtirish
                </button>

                <button
                  className="telegram-btn"
                  onClick={handleTelegramShare}
                >
                  Telegramga jo‘natish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>×</button>

            <img
              src={selectedImage}
              alt="Kattalashtirilgan rasm"
              className="modal-image"
            />

            <button
              className="telegram-btn-large"
              onClick={handleTelegramShare}
            >
              Telegramga jo‘natish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Darvozalar;
