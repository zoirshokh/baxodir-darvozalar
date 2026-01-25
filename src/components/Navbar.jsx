import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import logo from "../assets/darvozlaar.jpg";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);

  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            <img
              src={logo}
              alt="Logo"
              className="logo-img"
              onClick={(e) => {
                e.preventDefault();
                setLogoOpen(true);
              }}
            />
            <h1>Baxodir Darvozalar</h1>
          </Link>

          {/* Hamburger */}
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Menu */}
          <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Bosh sahifa
            </Link>
            <Link to="/darvozalar" className="nav-link" onClick={() => setMenuOpen(false)}>
              Darvozalar
            </Link>
            <Link to="/ustalar" className="nav-link" onClick={() => setMenuOpen(false)}>
              Ustalar
            </Link>
          </div>

          <div className="auth-section desktop-auth">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-greeting">Salom, {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-outline">
                  Chiqish
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Kirish</Link>
                <Link to="/register" className="btn btn-primary">
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* LOGO MODAL */}
      {logoOpen && (
        <div className="logo-modal" onClick={() => setLogoOpen(false)}>
          <img src={logo} alt="Logo Zoom" />
        </div>
      )}
    </>
  );
}

export default Navbar;
