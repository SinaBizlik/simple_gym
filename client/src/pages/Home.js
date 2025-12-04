import React, { useState, useEffect } from 'react';
import { getTrainers } from '../api/api';
import { Link } from 'react-router-dom';

// --- GÖRSEL IMPORTLARI (Sizin ekledikleriniz) ---
import boxingImg from '../assets/kaan-kazgan-savas-cebeci-kavga-videosu-neden-16344059_6493_amp.webp';
import pilatesImg from '../assets/TG_REFORM_TechnoGym_Classe_-_12_1198_ADV__1_.jpg';
import yogaImg from '../assets/cover-benefits-of-yoga-and-meditation.png';
import fitnessImg from '../assets/309985760_434430285496637_5807263803691224_n.jpg';

const Home = () => {
    // --- MOCK DATA: Ders Programı ---
    const mockClasses = [
        { 
            id: 1, 
            title: 'YOGA THERAPY', 
            time: '10:00', 
            trainer: 'Sarah C.', 
            capacity: 20, 
            enrolled: 12, 
            imageSource: yogaImg, 
            isLocal: true 
        },
        { 
            id: 2, 
            title: 'FITNESS ZONE', 
            time: '14:30', 
            trainer: 'John R.', 
            capacity: 15, 
            enrolled: 15, 
            imageSource: fitnessImg, 
            isLocal: true 
        },
        { 
            id: 3, 
            title: 'PILATES MAT', 
            time: '18:00', 
            trainer: 'Emily B.', 
            capacity: 12, 
            enrolled: 8, 
            imageSource: pilatesImg, 
            isLocal: true 
        },
        { 
            id: 4, 
            title: 'BOXING PRO', 
            time: '20:00', 
            trainer: 'Rocky B.', 
            capacity: 10, 
            enrolled: 3, 
            imageSource: boxingImg, 
            isLocal: true 
        }
    ];

    const handleBooking = (className) => {
        alert(`"${className}" dersi için rezervasyon talebiniz alındı!`);
    };

    return (
        <div className="home-page">
            
            {/* --- 1. HERO SECTION (YENİLENDİ) --- */}
            {/* Yükseklik 85vh yapıldı (Biraz küçültüldü) */}
            <div className="hero-section" style={{ height: '85vh', position: 'relative', overflow: 'hidden' }}>
                
                {/* YENİ ARKA PLAN GÖRSELİ */}
                {/* Daha karanlık, profesyonel bir gym görseli seçildi */}
                <div 
                    className="hero-image" 
                    style={{ 
                        backgroundImage: `url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop)`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100%', 
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1 
                    }}
                ></div>

                {/* SİYAH FİLTRE (Okunabilirlik için koyulaştırıldı: 0.7) */}
                <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    background: 'rgba(0, 0, 0, 0.7)', 
                    zIndex: 0
                }}></div>
                
                {/* İÇERİK ALANI */}
                <div style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center', 
                    padding: '0 20px' 
                }}>
                    
                    {/* Başlık (BEYAZ ve GÖLGELİ) */}
                    <h1 style={{ 
                        color: '#ffffff', // Kesin beyaz
                        fontSize: '4rem', 
                        fontFamily: 'Oswald, sans-serif', 
                        fontWeight: 700, 
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        marginBottom: '25px',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.8)' // Okunabilirlik için gölge
                    }}>
                        HEDEFİN SENİNLE BAŞLAR
                    </h1>
                    
                    {/* Alt Metin (BEYAZ) */}
                    <p style={{ 
                        color: '#f0f0f0', // Kırık beyaz
                        fontSize: '1.5rem', 
                        marginBottom: '40px', 
                        maxWidth: '800px',
                        textShadow: '1px 1px 5px rgba(0,0,0,0.8)'
                    }}>
                        Türkiye'nin en deneyimli eğitmenleri ve en dolu ders programı ile Simple Gym Yönetim Platformu'nu keşfet.
                    </p>
                    
                    {/* Buton */}
                    <Link to="/join" className="btn-red" style={{ 
                        padding: '18px 45px', 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        boxShadow: '0 4px 15px rgba(211, 17, 69, 0.4)' // Butona hafif parlama
                    }}>
                        HEMEN KAYIT OL
                    </Link>
                </div>
            </div>

            {/* --- 2. YAKLAŞAN DERSLER (SCHEDULE) --- */}
            <div className="container" style={{ padding: '80px 20px 50px 20px', background: 'white' }}>
                <div style={{ borderLeft: '5px solid #D31145', paddingLeft: '15px', marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2rem', margin: 0, color: '#000' }}>HAFTALIK DERS PROGRAMI</h2>
                </div>
                
                <div className="card-grid">
                    {mockClasses.map((cls, index) => (
                        <div key={cls.id} className="card class-card">
                            <div className="class-badge">{cls.time}</div>
                            
                            {/* Resim */}
                            {cls.isLocal ? (
                                <img 
                                    src={cls.imageSource} 
                                    alt={cls.title} 
                                    className="card-image"
                                    style={{ objectPosition: 'center top' }}
                                />
                            ) : (
                                <img 
                                    src={`https://source.unsplash.com/random/600x400/?${cls.imageSource},fitness&sig=${index}`} 
                                    alt={cls.title} 
                                    className="card-image"
                                    onError={(e) => {e.target.src = 'https://via.placeholder.com/600x400?text=' + cls.title}}
                                />
                            )}

                            <div className="card-content">
                                <h3 className="card-title">{cls.title}</h3>
                                <p style={{color: '#666', marginBottom: '10px'}}>Eğitmen: {cls.trainer}</p>
                                
                                {/* Kapasite */}
                                <div className="capacity-bar">
                                    <span style={{fontSize: '0.9rem', fontWeight: 'bold'}}>
                                        Doluluk: {cls.enrolled}/{cls.capacity}
                                    </span>
                                    <div style={{
                                        width: '100%', height: '6px', background: '#eee', borderRadius: '3px', marginTop: '5px'
                                    }}>
                                        <div style={{
                                            width: `${(cls.enrolled / cls.capacity) * 100}%`,
                                            height: '100%',
                                            background: cls.enrolled === cls.capacity ? '#D31145' : '#2ecc71',
                                            borderRadius: '3px'
                                        }}></div>
                                    </div>
                                </div>

                                {/* Buton */}
                                {cls.enrolled < cls.capacity ? (
                                    <button 
                                        className="btn-red" 
                                        style={{width: '100%', marginTop: '15px', borderRadius: '4px'}}
                                        onClick={() => handleBooking(cls.title)}
                                    >
                                        KAYIT OL
                                    </button>
                                ) : (
                                    <button 
                                        className="btn-red" 
                                        style={{width: '100%', marginTop: '15px', borderRadius: '4px', background: '#999', cursor: 'not-allowed'}}
                                        disabled
                                    >
                                        KONTENJAN DOLU
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default Home;