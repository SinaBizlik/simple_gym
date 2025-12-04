import React from 'react';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '50px 20px' }}>
            
            <h1 className="page-title">ARAMIZA NASIL KATILMAK İSTERSİN?</h1>
            <p style={{ color: '#666', marginBottom: '50px', fontSize: '1.2rem' }}>
                Kendine uygun olan seçeneği işaretle ve spor yolculuğuna başla.
            </p>

            <div className="card-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
                
                {/* --- SEÇENEK 1: ÜYE (MEMBER) --- */}
                <div className="card role-card">
                    <img 
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
                        alt="Üye Ol" 
                        className="card-image"
                        style={{ height: '300px' }}
                    />
                    <div className="card-content" style={{ padding: '30px' }}>
                        <h2 style={{ marginBottom: '15px' }}>SPORCUYUM</h2>
                        <p style={{ marginBottom: '20px', color: '#555' }}>
                            Derslere katılmak, antrenman yapmak ve form tutmak istiyorum.
                        </p>
                        <Link to="/register-member" className="btn-red" style={{ display: 'inline-block', width: '100%' }}>
    ÜYE OL
</Link>
                    </div>
                </div>

                {/* --- SEÇENEK 2: EĞİTMEN (TRAINER) --- */}
                <div className="card role-card">
                    <img 
                        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" 
                        alt="Eğitmen Ol" 
                        className="card-image"
                        style={{ height: '300px' }}
                    />
                    <div className="card-content" style={{ padding: '30px' }}>
                        <h2 style={{ marginBottom: '15px' }}>EĞİTMENİM</h2>
                        <p style={{ marginBottom: '20px', color: '#555' }}>
                            Ders vermek, öğrencileri koçluk yapmak ve ekibe katılmak istiyorum.
                        </p>
                        <Link to="/add-trainer" className="btn-red" style={{ display: 'inline-block', width: '100%' }}>
                            EĞİTMEN BAŞVURUSU
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RoleSelection;