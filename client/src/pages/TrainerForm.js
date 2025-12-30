import React, { useState } from 'react';
import { createTrainer } from '../api/api'; // API fonksiyonunu import ediyoruz
import { useNavigate } from 'react-router-dom';

const TrainerForm = () => {
    const navigate = useNavigate();
    
    // Form verilerini tutan state [cite: 96]
    const [formData, setFormData] = useState({
        name: '',
        expertise: ''
    });
    
    // Hata mesajlarını tutan state
    const [errors, setErrors] = useState({});

    // Input değiştiğinde çalışan fonksiyon
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        // Kullanıcı yazmaya başladığında o alandaki hatayı siliyoruz (UX için)
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    // Validasyon (Doğrulama) Fonksiyonu [cite: 107]
    const validate = () => {
        let tempErrors = {};
        // İsim alanı boş mu?
        if (!formData.name.trim()) {
            tempErrors.name = "Lütfen eğitmenin adını giriniz.";
        }
        // Uzmanlık alanı boş mu?
        if (!formData.expertise.trim()) {
            tempErrors.expertise = "Uzmanlık alanı zorunludur.";
        }
        
        setErrors(tempErrors);
        // Eğer hata objesi boşsa form geçerlidir (true döner)
        return Object.keys(tempErrors).length === 0; 
    };

    // Form Gönderme Fonksiyonu
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Sadece validasyon başarılıysa API'ye git [cite: 109]
        if (validate()) {
            try {
                // Backend'e veri gönder 
                await createTrainer(formData);
                alert('Eğitmen başarıyla eklendi!');
                navigate('/'); // Başarılı olunca ana sayfaya yönlendir
            } catch (error) {
                console.error("Hata:", error);
                alert('Bir hata oluştu. Backend çalışıyor mu?');
            }
        }
    };

    return (
        <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
            
            {/* Sayfa Başlığı */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title" style={{ margin: '0 0 10px 0' }}>YENİ EĞİTMEN EKLE</h1>
                <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Ekibimize katılacak yeni eğitmenin bilgilerini aşağıya girin.
                </p>
            </div>

            {/* Form Kartı */}
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    
                    {/* AD SOYAD ALANI */}
                    <div className="form-group">
                        <label className="form-label">EĞİTMEN ADI SOYADI</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Örn: Burak Çelik"
                            className="form-input"
                            // Hata varsa çerçeve rengini kırmızı yap
                            style={{ borderColor: errors.name ? '#D31145' : '#ccc' }}
                            value={formData.name} 
                            onChange={handleChange}
                        />
                        {/* Hata Mesajı Gösterimi  */}
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    {/* UZMANLIK ALANI */}
                    <div className="form-group">
                        <label className="form-label">UZMANLIK ALANI</label>
                        <input 
                            type="text" 
                            name="expertise" 
                            placeholder="Örn: Kick Boks, Pilates..."
                            className="form-input"
                            style={{ borderColor: errors.expertise ? '#D31145' : '#ccc' }}
                            value={formData.expertise} 
                            onChange={handleChange}
                        />
                        {errors.expertise && <span className="error-text">{errors.expertise}</span>}
                    </div>

                    {/* KAYDET BUTONU */}
                    <button type="submit" className="btn-red" style={{ width: '100%', marginTop: '15px', padding: '15px' }}>
                        EĞİTMENİ KAYDET
                    </button>

                </form>
            </div>
        </div>
    );
};

export default TrainerForm;