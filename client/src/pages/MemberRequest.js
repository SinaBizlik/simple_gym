import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const MemberRequest = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const memberId = localStorage.getItem('userId');

    const [formData, setFormData] = useState({
        courseType: 'yoga', 
        date: '',
        time: '' // Yeni alan: Saat
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/requests', {
                memberId,
                username,
                courseType: formData.courseType,
                date: formData.date,
                time: formData.time // Saati gönderiyoruz
            });
            alert('Ders talebiniz başarıyla oluşturuldu!');
            navigate('/'); 
        } catch (error) {
            alert('Hata: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="container" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
            <div className="form-card" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', fontFamily: 'Oswald', color: '#333' }}>
                    DERS SAATİ TALEBİ
                </h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                    İstediğiniz tarih ve saati belirtiniz.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* DERS TÜRÜ */}
                    <div className="form-group">
                        <label className="form-label">HANGİ DERS?</label>
                        <select 
                            name="courseType" 
                            className="form-input" 
                            onChange={handleChange} 
                            value={formData.courseType}
                            style={{ height: '50px', cursor: 'pointer' }}
                        >
                            <option value="yoga">Yoga Therapy</option>
                            <option value="pilates">Pilates Mat</option>
                            <option value="boks">Boxing Pro</option>
                            <option value="fitness">Fitness Zone</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        {/* TARİH SEÇİMİ */}
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">TARİH</label>
                            <input 
                                type="date" 
                                name="date" 
                                className="form-input" 
                                onChange={handleChange} 
                                required 
                                style={{ height: '50px', cursor: 'pointer' }}
                            />
                        </div>

                        {/* SAAT SEÇİMİ (YENİ) */}
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">SAAT</label>
                            <input 
                                type="time" 
                                name="time" 
                                className="form-input" 
                                onChange={handleChange} 
                                required 
                                style={{ height: '50px', cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-red" style={{ width: '100%', marginTop: '20px', padding: '15px', fontSize: '16px' }}>
                        TALEBİ GÖNDER
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MemberRequest;