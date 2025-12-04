import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Backend olmadığı için alert ile simüle ediyoruz
        alert(`Teşekkürler ${formData.name}, mesajınız iletildi!`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="container" style={{maxWidth: '600px', marginTop: '40px'}}>
            <h1 className="page-title">İLETİŞİM FORMU</h1>
            <p style={{textAlign: 'center', marginBottom: '30px', color: '#666'}}>
                Sorularınız veya üyelik talepleriniz için bize yazın.
            </p>

            <form onSubmit={handleSubmit} style={{background: '#fff', padding: '30px', boxShadow: '0 0 10px rgba(0,0,0,0.05)'}}>
                <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Ad Soyad</label>
                    <input 
                        type="text" 
                        required
                        className="search-input"
                        style={{width: '100%'}}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>E-Posta</label>
                    <input 
                        type="email" 
                        required
                        className="search-input"
                        style={{width: '100%'}}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>

                <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Mesajınız</label>
                    <textarea 
                        rows="5"
                        required
                        className="search-input"
                        style={{width: '100%', borderRadius: '4px'}}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>

                <button type="submit" className="btn-red" style={{width: '100%', borderRadius: '4px'}}>
                    GÖNDER
                </button>
            </form>
        </div>
    );
};

export default Contact;