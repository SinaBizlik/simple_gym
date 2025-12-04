import React, { useState } from 'react';
import { createTrainer } from '../api/api';
import { useNavigate } from 'react-router-dom';

const TrainerForm = () => {
    const navigate = useNavigate();
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        expertise: ''
    });
    
    // Error state
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Kullanıcı yazmaya başlayınca hatayı sil
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Lütfen ad soyad giriniz.";
        if (!formData.expertise) tempErrors.expertise = "Uzmanlık alanı zorunludur.";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validate()) {
            try {
                await createTrainer(formData);
                alert('Başvurunuz başarıyla alındı! Yönlendiriliyorsunuz...');
                navigate('/'); // Başarılı olunca ana sayfaya dön
            } catch (error) {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }
    };

    return (
        <div className="container" style={{ padding: '50px 20px' }}>
            {/* Sayfa Başlığı */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title" style={{ margin: '0 0 10px 0' }}>EĞİTMEN BAŞVURUSU</h1>
                <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Ekibimize katılmak ve tecrübeni paylaşmak için aşağıdaki formu doldur.
                </p>
            </div>

            {/* Form Kartı */}
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    
                    {/* İsim Alanı */}
                    <div className="form-group">
                        <label className="form-label">AD SOYAD</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Örn: Mehmet Yılmaz"
                            className="form-input"
                            value={formData.name} 
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    {/* Uzmanlık Alanı */}
                    <div className="form-group">
                        <label className="form-label">UZMANLIK ALANI</label>
                        <input 
                            type="text" 
                            name="expertise" 
                            placeholder="Örn: Pilates, Boks, Fitness..."
                            className="form-input"
                            value={formData.expertise} 
                            onChange={handleChange}
                        />
                        {errors.expertise && <span className="error-text">{errors.expertise}</span>}
                    </div>

                    {/* Gönder Butonu */}
                    <button type="submit" className="btn-red" style={{ width: '100%', marginTop: '10px', fontSize: '1.1rem' }}>
                        BAŞVURUYU TAMAMLA
                    </button>

                </form>
            </div>
        </div>
    );
};

export default TrainerForm;