import React from 'react';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>ARAMIZA NASIL KATILMAK İSTERSİN?</h2>
      
      <div style={styles.cardsWrapper}>
        
        {/* --- SPORCU KARTI (SİYAH TASARIM) --- */}
        <Link to="/register-member" style={styles.cardLink}>
          <div style={styles.card}>
            {/* Arka Plan Resmi */}
            <div style={{
              ...styles.bgImage, 
              backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000")'
            }}></div>
            
            {/* Karartma Katmanı */}
            <div style={styles.overlay}></div>
            
            {/* Yazılar */}
            <div style={styles.content}>
              <h3 style={styles.cardTitle}>SPORCUYUM</h3>
              <p style={styles.cardText}>Antrenman yapmak ve derslere katılmak istiyorum.</p>
            </div>
          </div>
        </Link>

        {/* --- EĞİTMEN KARTI (SİYAH TASARIM) --- */}
        <Link to="/add-trainer" style={styles.cardLink}>
          <div style={styles.card}>
            {/* Arka Plan Resmi */}
            <div style={{
              ...styles.bgImage, 
              backgroundImage: 'url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1000")'
            }}></div>
            
            {/* Karartma Katmanı */}
            <div style={styles.overlay}></div>
            
            {/* Yazılar */}
            <div style={styles.content}>
              <h3 style={styles.cardTitle}>EĞİTMENİM</h3>
              <p style={styles.cardText}>Ders vermek ve öğrencileri yönetmek istiyorum.</p>
            </div>
          </div>
        </Link>

      </div>

      <div style={{ marginTop: '30px', fontSize: '15px' }}>
        Hesabın var mı? <Link to="/login" style={{ color: '#D31145', fontWeight: 'bold', textDecoration:'none' }}>Giriş Yap</Link>
      </div>
    </div>
  );
};

// --- MODERN CSS STİLLERİ (JavaScript Objesi Olarak) ---
const styles = {
  container: {
    padding: '80px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center'
  },
  heading: {
    fontFamily: 'Oswald',
    fontSize: '32px',
    marginBottom: '40px',
    textTransform: 'uppercase',
    color: '#333'
  },
  cardsWrapper: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cardLink: {
    textDecoration: 'none',
    color: 'white'
  },
  card: {
    width: '300px',
    height: '400px',
    borderRadius: '20px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3))', // Siyah karartma efekti
    zIndex: 2
  },
  content: {
    position: 'relative',
    zIndex: 3,
    padding: '20px',
    textAlign: 'center'
  },
  cardTitle: {
    fontFamily: 'Oswald',
    fontSize: '32px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    color: 'white'
  },
  cardText: {
    fontSize: '16px',
    opacity: 0.9,
    fontWeight: '300',
    color: '#eee'
  }
};

export default RoleSelection;