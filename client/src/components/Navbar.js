import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // LocalStorage'dan verileri al
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // 'admin', 'trainer', 'user' (veya 'member')
  const username = localStorage.getItem('username');

  // Çıkış Yapma Fonksiyonu
  const handleLogout = () => {
    if(window.confirm("Çıkış yapmak istediğine emin misin?")) {
        localStorage.clear(); // Tüm verileri temizle
        alert('Başarıyla çıkış yapıldı.');
        navigate('/login');
        window.location.reload(); // Navbar'ın güncellenmesi için sayfayı yenile
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* LOGO */}
        <Link to="/" className="logo">
          SIMPLE<span style={{ color: '#D31145' }}>GYM</span>
        </Link>

        {/* MENÜ LİNKLERİ */}
        <ul className="nav-links">
          <li><Link to="/">ANA SAYFA</Link></li>
          
          {!role && <li><Link to="/contact">İLETİŞİM</Link></li>}

          {role === 'admin' && (
            <li><Link to="/admin" style={{ color: '#D31145', fontWeight: 'bold' }}>YÖNETİCİ PANELİ</Link></li>
          )}

          {role === 'trainer' && (
            <>
              <li><Link to="/add-course">DERS EKLE</Link></li>
              <li><Link to="/trainer-requests" style={{ color: '#ffc107', fontWeight: 'bold' }}>TALEPLER</Link></li>
            </>
          )}

          {(role === 'member' || role === 'user') && (
            <>
                <li><Link to="/request" style={{ color: '#333', fontWeight: 'bold' }}>DERS İSTE</Link></li>
                <li><Link to="/my-requests" style={{ color: '#D31145', fontWeight: 'bold' }}>TALEPLERİM</Link></li>
                {/* Menüdeki Vücut Analizi linki de kalabilir, istersen silebilirsin */}
                <li><Link to="/profile" style={{ color: '#28a745', fontWeight: 'bold' }}>VÜCUT ANALİZİ 📈</Link></li>
            </>
          )}
        </ul>

        {/* SAĞ TARAFTAKİ BUTONLAR */}
        <div className="auth-buttons">
          {token ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              
              {/* 👇 DEĞİŞİKLİK BURADA: İSİM ALANI TIKLANABİLİR YAPILDI 👇 */}
              <Link to="/profile" style={{ textDecoration: 'none', cursor: 'pointer' }} title="Profilime Git">
                  <span className="username-hover" style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
                    {username?.toUpperCase()} <small style={{color:'#666', fontWeight:'normal'}}>({role})</small>
                  </span>
              </Link>

              <button onClick={handleLogout} className="btn-outline">
                ÇIKIŞ YAP
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                ÜYE GİRİŞİ
              </Link>
              <Link to="/register" className="btn-red">
                KAYIT OL
              </Link>
            </>
          )}
        </div>
      </div>

      {/* CSS STİLLERİ */}
      <style>{`
        .navbar {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 15px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .logo {
          font-family: 'Oswald', sans-serif;
          font-size: 28px;
          font-weight: bold;
          color: black;
          text-decoration: none;
          letter-spacing: 1px;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 25px;
          margin: 0;
          padding: 0;
        }
        .nav-links li a {
          text-decoration: none;
          color: #333;
          font-weight: 600;
          font-size: 14px;
          transition: color 0.3s;
          text-transform: uppercase;
        }
        .nav-links li a:hover {
          color: #D31145;
        }
        
        /* Kullanıcı adı üzerine gelince efekt */
        .username-hover:hover {
            color: #D31145 !important;
            text-decoration: underline;
        }

        .btn-red {
          background-color: #D31145;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          font-size: 14px;
          transition: background 0.3s;
        }
        .btn-red:hover {
          background-color: #a00d35;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid #D31145;
          color: #D31145;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-outline:hover {
          background: #D31145;
          color: white;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;