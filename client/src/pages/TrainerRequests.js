import React, { useState, useEffect } from 'react';
import api from '../api/api';

const TrainerRequests = () => {
    const [requests, setRequests] = useState([]);
    const [editingId, setEditingId] = useState(null); // Hangi talep düzenleniyor?
    const [reviseData, setReviseData] = useState({ date: '', time: '' }); // Yeni tarih verileri

    const expertise = localStorage.getItem('expertise') || "";

    // Talepleri Getir
    const fetchRequests = async () => {
        try {
            const res = await api.get('/requests');
            const allRequests = res.data;
            // Sadece hocanın uzmanlığına uygun olanları filtrele
            const myRequests = allRequests.filter(req => 
                expertise.toLowerCase().includes(req.courseType)
            );
            setRequests(myRequests);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [expertise]);

   const handleStatusUpdate = async (id, status) => {
        // EĞER REDDEDİLİRSE SİLİNSİN
        if (status === 'reddedildi') {
            if(!window.confirm(`Bu talebi reddetmek ve silmek istediğinize emin misiniz?`)) return;
            try {
                await api.delete(`/requests/${id}`); // SİLME İŞLEMİ
                alert('Talep reddedildi ve silindi.');
                fetchRequests();
            } catch (error) {
                alert('Silme işlemi başarısız.');
            }
        } 
        // EĞER ONAYLANIRSA (Eski mantık devam)
        else {
            try {
                await api.put(`/requests/${id}`, { status });
                alert(`Talep ${status}ldi!`);
                fetchRequests();
            } catch (error) {
                alert('İşlem başarısız.');
            }
        }
    };

    // Revize Modunu Aç
    const startRevise = (req) => {
        setEditingId(req._id);
        setReviseData({ date: req.date, time: req.time });
    };

const saveRevise = async (id) => {
        try {
            // Hocanın ID'sini localStorage'dan alıyoruz
            const currentTrainerId = localStorage.getItem('userId');

            await api.put(`/requests/${id}`, { 
                status: 'revize edildi', 
                date: reviseData.date, 
                time: reviseData.time,
                trainerId: currentTrainerId // 👇 SİSTEME GÖNDERİYORUZ
            });
            alert('Talep revize edildi ve güncellendi!');
            setEditingId(null);
            fetchRequests();
        } catch (error) {
            alert('Hata oluştu.');
        }
    };

    return (
        <div className="container" style={{ padding: '80px 20px' }}>
            <h2 style={{ textAlign: 'center', fontFamily: 'Oswald', marginBottom: '30px' }}>
                GELEN DERS TALEPLERİ
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
                {requests.map((req) => (
                    <div key={req._id} style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        borderLeft: `5px solid ${
                            req.status === 'onaylandi' ? 'green' : 
                            req.status === 'reddedildi' ? 'red' : 
                            req.status === 'revize edildi' ? 'orange' : '#D31145'
                        }`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ margin: 0, textTransform: 'uppercase' }}>{req.courseType}</h4>
                            <span style={{ 
                                fontSize: '12px', 
                                padding: '5px 10px', 
                                borderRadius: '15px', 
                                background: '#eee',
                                fontWeight: 'bold',
                                color: req.status === 'bekliyor' ? '#555' : 'white',
                                backgroundColor: req.status === 'onaylandi' ? 'green' : req.status === 'reddedildi' ? 'red' : req.status === 'revize edildi' ? 'orange' : '#eee'
                            }}>
                                {req.status.toUpperCase()}
                            </span>
                        </div>
                        
                        <p><strong>Üye:</strong> {req.username}</p>

                        {/* NORMAL GÖRÜNÜM veya REVİZE MODU */}
                        {editingId === req._id ? (
                            <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                                <label style={{fontSize: '12px'}}>Yeni Tarih:</label>
                                <input 
                                    type="date" 
                                    value={reviseData.date} 
                                    onChange={(e) => setReviseData({...reviseData, date: e.target.value})}
                                    style={{ width: '100%', marginBottom: '5px' }}
                                />
                                <label style={{fontSize: '12px'}}>Yeni Saat:</label>
                                <input 
                                    type="time" 
                                    value={reviseData.time} 
                                    onChange={(e) => setReviseData({...reviseData, time: e.target.value})}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                />
                                <button onClick={() => saveRevise(req._id)} style={{ background: 'orange', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Kaydet</button>
                                <button onClick={() => setEditingId(null)} style={{ background: '#ccc', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>İptal</button>
                            </div>
                        ) : (
                            <>
                                <p><strong>Tarih:</strong> {req.date}</p>
                                <p><strong>Saat:</strong> {req.time}</p>
                            </>
                        )}

                        <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />

                        {/* BUTONLAR (Sadece bekleyen veya işlem yapılmışsa görünür) */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => handleStatusUpdate(req._id, 'onaylandi')}
                                style={{ flex: 1, padding: '8px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                Onayla
                            </button>
                            <button 
                                onClick={() => startRevise(req)}
                                style={{ flex: 1, padding: '8px', background: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                Revize Et
                            </button>
                            <button 
                                onClick={() => handleStatusUpdate(req._id, 'reddedildi')}
                                style={{ flex: 1, padding: '8px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                Reddet
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerRequests;