import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

const Register = () => {
    const navigate = useNavigate();
    
    // Hangi rolün seçildiğini tutuyoruz
    const [selectedRole, setSelectedRole] = useState(null);

    // Form verileri (Varsayılan uzmanlık: Fitness)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        expertise: 'Fitness' // Başlangıç değeri
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Eğer sporcuysa uzmanlık bilgisini göndermeye gerek yok (veya boş gönderelim)
            const finalData = { 
                ...formData, 
                role: selectedRole,
                // Eğer eğitmen değilse uzmanlık alanını temizle
                expertise: selectedRole === 'trainer' ? formData.expertise : undefined 
            };
            
            await registerUser(finalData);
            alert('Kayıt Başarılı! Giriş yapabilirsiniz.');
            navigate('/login');
        } catch (error) {
            alert('Kayıt Hatası: ' + (error.response?.data?.error || 'Hata oluştu'));
        }
    };

    // --- ROL SEÇİM EKRANI (ADIM 1) ---
    if (!selectedRole) {
        return (
            <div className="container" style={styles.selectionContainer}>
                <h1 style={{ textAlign: 'center', width: '100%', marginBottom: '40px', fontFamily: 'Oswald' }}>
                    NASIL KAYIT OLMAK İSTERSİN?
                </h1>
                
                <div style={styles.cardsWrapper}>
                    {/* SPORCU KARTI */}
                    <div 
                        style={{...styles.card, backgroundImage: 'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80)'}} 
                        onClick={() => setSelectedRole('user')}
                    >
                        <div style={styles.cardOverlay}>
                            <h2 style={styles.cardTitle}>SPORCUYUM</h2>
                            <p style={{ color: '#f0f0f0' }}>Antrenman yapmak ve derslere katılmak istiyorum.</p>
                        </div>
                    </div>

                    {/* EĞİTMEN KARTI */}
                    <div 
                        style={{...styles.card, backgroundImage: 'url(https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80)'}} 
                        onClick={() => setSelectedRole('trainer')}
                    >
                        <div style={styles.cardOverlay}>
                            <h2 style={styles.cardTitle}>EĞİTMENİM</h2>
                            <p style={{ color: '#f0f0f0' }}>Ders vermek ve öğrencileri yönetmek istiyorum.</p>
                        </div>
                    </div>
                </div>
                
                <p style={{marginTop: '30px', textAlign: 'center'}}>
                    Hesabın var mı? <a href="/login" style={{color: '#D31145', fontWeight: 'bold'}}>Giriş Yap</a>
                </p>
            </div>
        );
    }

    // --- KAYIT FORMU EKRANI (ADIM 2) ---
    return (
        <div className="container" style={styles.formContainer}>
            <div className="form-card" style={{ maxWidth: '400px', width: '100%' }}>
                
                <button onClick={() => setSelectedRole(null)} style={styles.backBtn}>
                    ← Geri Dön
                </button>

                <h2 style={{ textAlign: 'center', marginBottom: '10px', fontFamily: 'Oswald' }}>
                    {selectedRole === 'user' ? 'SPORCU KAYDI' : 'EĞİTMEN KAYDI'}
                </h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
                    {selectedRole === 'user' 
                        ? 'Formu doldur ve antrenmana başla!' 
                        : 'Ekibimize katılmak için bilgilerinizi girin.'}
                </p>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* HESAP TÜRÜ (KİLİTLİ) */}
                    <div className="form-group">
                        <label className="form-label">HESAP TÜRÜ</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            value={selectedRole === 'user' ? 'SPORCU (ÜYE)' : 'EĞİTMEN'}
                            disabled 
                            style={{ backgroundColor: '#e9ecef', color: '#555', cursor: 'not-allowed' }}
                        />
                    </div>

                    {/* --- YENİ EKLENEN KISIM: SADECE EĞİTMENLER İÇİN UZMANLIK --- */}
                    {selectedRole === 'trainer' && (
                        <div className="form-group">
                            <label className="form-label">UZMANLIK ALANI</label>
                            <select 
                                name="expertise" 
                                className="form-input" 
                                value={formData.expertise} 
                                onChange={handleChange}
                                style={{ cursor: 'pointer', backgroundColor: 'white' }}
                            >
                                <option value="Fitness">Fitness</option>
                                <option value="Yoga">Yoga</option>
                                <option value="Pilates">Pilates</option>
                                <option value="Kick Boks">Kick Boks</option>
                            </select>
                        </div>
                    )}

                    {/* KULLANICI ADI */}
                    <div className="form-group">
                        <label className="form-label">KULLANICI ADI</label>
                        <input 
                            type="text" 
                            name="username" 
                            className="form-input" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    {/* ŞİFRE */}
                    <div className="form-group">
                        <label className="form-label">ŞİFRE</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-input" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-red" style={{ width: '100%', marginTop: '20px', padding: '15px' }}>
                        KAYDI TAMAMLA
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- CSS STYLES ---
const styles = {
    selectionContainer: {
        padding: '60px 20px',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardsWrapper: {
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    card: {
        width: '300px',
        height: '400px',
        borderRadius: '15px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease'
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center'
    },
    cardTitle: {
        color: '#ffffff',
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        fontFamily: "'Oswald', sans-serif",
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
    },
    formContainer: {
        padding: '80px 20px',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '80vh',
        alignItems: 'center'
    },
    backBtn: {
        background: 'none',
        border: 'none',
        color: '#666',
        cursor: 'pointer',
        marginBottom: '15px',
        fontSize: '0.9rem',
        fontWeight: 'bold'
    }
};

export default Register;