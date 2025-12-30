import React, { useState, useEffect } from 'react';
import api from '../api/api';

const MyRequests = () => {
    const [myRequests, setMyRequests] = useState([]);
    const memberId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Güvenlik için token kontrolü

    // Talepleri Getir
    const fetchMyRequests = async () => {
        try {
            const res = await api.get('/requests');
            // Sadece bu üyeye ait talepleri filtrele
            const filtered = res.data.filter(req => req.memberId === memberId);
            setMyRequests(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMyRequests();
    }, []);

    // REVİZEYİ KABUL ET VE DERSİ AÇ
    const acceptRevision = async (req) => {
        if(!window.confirm("Yeni saati onaylıyor musun?")) return;

        // EĞER ESKİ TALEPLERDE HOCA ID YOKSA UYARI VERELİM
        if (!req.trainerId) {
            alert("Hata: Bu talep eski sistemde revize edildiği için hoca bilgisi bulunamadı. Lütfen talebi iptal edip yeniden oluşturun.");
            return;
        }

        try {
            await api.post('/courses', {
                title: req.courseType.toUpperCase(),
                date: req.date + 'T' + req.time,
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000",
                
                // 👇 ARTIK GERÇEK HOCA ID'SİNİ KULLANIYORUZ
                trainerId: req.trainerId 
            });

            await api.delete(`/requests/${req._id}`);
            alert("Harika! Revizeyi kabul ettin. Ders programa eklendi.");
            fetchMyRequests(); 

        } catch (error) {
            console.error(error);
            alert("Ders açılırken hata: " + (error.response?.data?.error || error.message));
        }
    };
    

    // REDDET (SİL)
    const deleteRequest = async (id) => {
        if(!window.confirm("Talebi iptal etmek istiyor musun?")) return;
        try {
            await api.delete(`/requests/${id}`);
            alert("Talep iptal edildi.");
            fetchMyRequests();
        } catch (error) {
            alert("Hata oluştu.");
        }
    };

    return (
        <div className="container" style={{ padding: '80px 20px' }}>
            <h2 style={{ textAlign: 'center', fontFamily: 'Oswald', marginBottom: '30px' }}>
                TALEPLERİM VE CEVAPLAR
            </h2>

            {myRequests.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999' }}>Henüz aktif bir talebin yok.</div>
            ) : (
                <div style={{ display: 'grid', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
                    {myRequests.map(req => (
                        <div key={req._id} style={{
                            padding: '20px',
                            borderRadius: '10px',
                            background: 'white',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            borderLeft: req.status === 'revize edildi' ? '5px solid #ffc107' : '5px solid #ddd'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ margin: 0, textTransform: 'uppercase' }}>{req.courseType}</h4>
                                <span style={{
                                    fontSize: '12px', padding: '5px 10px', borderRadius: '15px',
                                    backgroundColor: req.status === 'revize edildi' ? '#ffc107' : '#eee',
                                    color: req.status === 'revize edildi' ? 'black' : '#555',
                                    fontWeight: 'bold'
                                }}>
                                    {req.status === 'revize edildi' ? 'HOCA SAATİ DEĞİŞTİRDİ' : 'BEKLİYOR'}
                                </span>
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <p><strong>Tarih:</strong> {req.date}</p>
                                <p><strong>Saat:</strong> {req.time}</p>
                            </div>

                            {/* EĞER REVİZE EDİLDİYSE ONAY BUTONU ÇIKSIN */}
                            {req.status === 'revize edildi' && (
                                <div style={{ marginTop: '20px', background: '#fff3cd', padding: '10px', borderRadius: '5px' }}>
                                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#856404' }}>
                                        Hoca bu saati önerdi. Kabul edersen ders otomatik olarak açılacak.
                                    </p>
                                    <button onClick={() => acceptRevision(req)} className="btn-red" style={{ width: '100%', backgroundColor: '#28a745', marginBottom: '10px' }}>
                                        KABUL ET VE DERSİ AÇ
                                    </button>
                                    <button onClick={() => deleteRequest(req._id)} style={{ width: '100%', padding: '10px', border: '1px solid #dc3545', background: 'white', color: '#dc3545', borderRadius: '5px', cursor: 'pointer' }}>
                                        REDDET (İPTAL ET)
                                    </button>
                                </div>
                            )}

                             {/* BEKLİYORSA SADECE İPTAL ETME HAKKI OLSUN */}
                             {req.status === 'bekliyor' && (
                                <button onClick={() => deleteRequest(req._id)} style={{ marginTop:'15px', fontSize:'12px', color:'red', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' }}>
                                    Talebi Geri Çek
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequests;