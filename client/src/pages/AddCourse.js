import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const navigate = useNavigate();
    
    // Verileri LocalStorage'dan al
    const expertise = localStorage.getItem('expertise') || ""; 
    const userId = localStorage.getItem('userId');

    // TÜM DERSLERİN LİSTESİ
    const ALL_COURSES = [
        { id: 1, title: "Yoga Therapy", type: "yoga", image: "https://images.unsplash.com/photo-1544367563-12123d8975bd?auto=format&fit=crop&q=80&w=1000" },
        { id: 2, title: "Pilates Mat", type: "pilates", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000" },
        { id: 3, title: "Boxing Pro", type: "boks", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=1000" },
        { id: 4, title: "Fitness Zone", type: "fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000" }
    ];

    // 1. ÖNCE FONKSİYONU TANIMLIYORUZ (HATA BURADAYDI, ARTIK ÜSTTE)
    const getAllowedCourses = () => {
        const lowerExpertise = expertise.toLowerCase();

        return ALL_COURSES.filter(course => {
            if (lowerExpertise.includes('yoga') && course.type === 'yoga') return true;
            if (lowerExpertise.includes('pilates') && course.type === 'pilates') return true;
            if ((lowerExpertise.includes('boks') || lowerExpertise.includes('boxing')) && course.type === 'boks') return true;
            if (lowerExpertise.includes('fitness') && course.type === 'fitness') return true;
            return false;
        });
    };

    // 2. SONRA ÇAĞIRIYORUZ
    const allowedCourses = getAllowedCourses();
    
    // State Tanımları
    const [selectedCourseId, setSelectedCourseId] = useState(allowedCourses.length > 0 ? allowedCourses[0].id : '');
    const [date, setDate] = useState('');
    const [quota, setQuota] = useState(20); // Kontenjan State'i

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedCourseId) {
            alert("Uzmanlık alanınıza uygun bir ders bulunamadı.");
            return;
        }

        const courseToSave = ALL_COURSES.find(c => c.id === Number(selectedCourseId));

        try {
            await api.post('/courses', {
                title: courseToSave.title,
                image: courseToSave.image,
                date: date,
                quota: quota, // Kontenjanı backend'e yolla
                trainerId: userId 
            });
            alert('Ders başarıyla programa eklendi!');
            navigate('/'); 
        } catch (error) {
            alert('Hata: ' + (error.response?.data?.error || 'Bilinmeyen hata'));
        }
    };

    return (
        <div className="container" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
            <div className="form-card" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', fontFamily: 'Oswald' }}>YENİ DERS EKLE</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
                    Uzmanlık Alanınız: <strong style={{ color: '#D31145' }}>{expertise}</strong>
                </p>

                {allowedCourses.length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        {/* DERS SEÇİMİ */}
                        <div className="form-group">
                            <label className="form-label">DERS TÜRÜ</label>
                            <select 
                                className="form-input" 
                                value={selectedCourseId}
                                onChange={(e) => setSelectedCourseId(e.target.value)}
                                style={{ cursor: 'pointer', height: '50px' }}
                            >
                                {allowedCourses.map(course => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* TARİH VE SAAT */}
                        <div className="form-group">
                            <label className="form-label">TARİH VE SAAT</label>
                            <input 
                                type="datetime-local" 
                                className="form-input" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required 
                                style={{ cursor: 'pointer' }}
                            />
                        </div>

                        {/* KONTENJAN (YENİ) */}
                        <div className="form-group">
                            <label className="form-label">KONTENJAN (KİŞİ SAYISI)</label>
                            <input 
                                type="number" 
                                className="form-input" 
                                value={quota} 
                                onChange={(e) => setQuota(e.target.value)}
                                min="1"
                                max="100"
                                required 
                            />
                        </div>

                        <button type="submit" className="btn-red" style={{ width: '100%', marginTop: '20px', padding: '15px' }}>
                            PROGRAMA EKLE
                        </button>
                    </form>
                ) : (
                    <div style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>
                        <p>Sistemde uzmanlık alanınıza ({expertise}) uygun bir ders tanımlanmamış.</p>
                        <p>Lütfen yönetici ile iletişime geçin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCourse;