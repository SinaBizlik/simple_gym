import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // navigate sildik, window.location kullanacağız
import api from '../api/api';
import '../styles/Login.css';

const Login = () => {
    const [activeTab, setActiveTab] = useState('user'); 
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("1. Butona basıldı, işlem başlıyor...");

        try {
            // 1. Backend'e sor
            const response = await api.post('/auth/login', formData);
            console.log("2. Backend Cevabı Geldi:", response.data);
            
            const { token, role, id, expertise, username } = response.data;

            // 2. Hafızaya Kaydet
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userId', id);
            localStorage.setItem('username', username);
            if (expertise) localStorage.setItem('expertise', expertise);

            console.log("3. Veriler tarayıcıya kaydedildi.");

            // 3. KULLANICIYA BİLGİ VER VE YÖNLENDİR (Gecikmeli)
            // Bu kısım çok hızlı olursa tarayıcı takılabilir, o yüzden 500ms bekleme koyuyoruz.
            alert("Giriş Başarılı! Ana Sayfaya Gidiliyor...");
            
            setTimeout(() => {
                console.log("4. Şimdi Yönlendiriliyor...");
                window.location.href = '/'; 
            }, 500); // Yarım saniye bekle ve git

        } catch (error) {
            console.error("Giriş Hatası:", error);
            alert('GİRİŞ BAŞARISIZ! Lütfen şifrenizi kontrol edin.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('user')}
                        type="button"
                    >
                        SPORCU GİRİŞİ
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'trainer' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('trainer')}
                        type="button"
                    >
                        EĞİTMEN GİRİŞİ
                    </button>
                </div>

                <h2 className="login-title">
                    HOŞ GELDİN {activeTab === 'user' ? 'SPORCU' : 'HOCAM'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>KULLANICI ADI</label>
                        <input 
                            type="text" 
                            name="username" 
                            onChange={handleChange} 
                            placeholder={activeTab === 'user' ? "Örn: SporcuAli" : "Örn: FitnessHocasi"}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>ŞİFRE</label>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleChange} 
                            placeholder="******"
                            required 
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        GİRİŞ YAP
                    </button>
                </form>

                <p className="login-footer">
                    Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;