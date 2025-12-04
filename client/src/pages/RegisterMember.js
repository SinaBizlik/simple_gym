import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Not: Henüz üye (user) oluşturmak için backend API'sini yazmadığınızı varsayarak,
// formun başarılı olduğunu simüle edeceğiz. Gerçek API'yi daha sonra ekleyebilirsiniz.
const simulateMemberCreation = (data) => {
    console.log("Üye verisi backend'e gönderiliyor:", data);
    return new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye gecikme simülasyonu
};

const RegisterMember = () => {
    const navigate = useNavigate();
    
    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '' // Üyeler için basit bir parola alanı ekleyelim
    });
    
    // Error state
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName) tempErrors.fullName = "Lütfen ad soyad giriniz.";
        if (!formData.email || !formData.email.includes('@')) tempErrors.email = "Geçerli bir e-posta adresi giriniz.";
        if (!formData.password || formData.password.length < 6) tempErrors.password = "Parola en az 6 karakter olmalıdır.";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validate()) {
            try {
                // Burada gerçek API çağrısını (createUser veya registerMember) kullanacaksınız.
                await simulateMemberCreation(formData); 
                
                alert('Tebrikler! Üyeliğiniz başarıyla oluşturuldu. Ana sayfaya yönlendiriliyorsunuz...');
                navigate('/'); // Başarılı olunca ana sayfaya dön
            } catch (error) {
                alert('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }
    };

    return (
        <div className="container" style={{ padding: '50px 20px' }}>
            {/* Sayfa Başlığı */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title" style={{ margin: '0 0 10px 0' }}>ÜYELİK BAŞVURUSU</h1>
                <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Sınırsız spor deneyimi için hemen üye ol!
                </p>
            </div>

            {/* Form Kartı (TrainerForm ile aynı stil sınıflarını kullanıyoruz: form-card, form-input) */}
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    
                    {/* İsim Alanı */}
                    <div className="form-group">
                        <label className="form-label">AD SOYAD</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            placeholder="Adınız ve Soyadınız"
                            className="form-input"
                            value={formData.fullName} 
                            onChange={handleChange}
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>

                    {/* E-posta Alanı */}
                    <div className="form-group">
                        <label className="form-label">E-POSTA</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="E-posta Adresiniz"
                            className="form-input"
                            value={formData.email} 
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    {/* Parola Alanı */}
                    <div className="form-group">
                        <label className="form-label">PAROLA</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="En az 6 karakter"
                            className="form-input"
                            value={formData.password} 
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {/* Gönder Butonu */}
                    <button type="submit" className="btn-red" style={{ width: '100%', marginTop: '10px', fontSize: '1.1rem' }}>
                        HEMEN ÜYE OL
                    </button>

                </form>
            </div>
        </div>
    );
};

export default RegisterMember;