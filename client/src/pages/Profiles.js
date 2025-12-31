import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const [progressData, setProgressData] = useState([]); // Başlangıçta boş dizi
    const [input, setInput] = useState({ weight: '', height: '' });

    // Verileri Çek
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await api.get(`/users/${userId}/progress`);
                
                // 🛠️ DÜZELTME BURADA: Gelen veri dizi mi diye kontrol ediyoruz
                if (Array.isArray(res.data)) {
                    setProgressData(res.data);
                } else {
                    setProgressData([]); // Dizi değilse boş yap (Hata vermesin)
                }
                
            } catch (err) {
                console.log("Veri çekilemedi", err);
                setProgressData([]); // Hata olursa boş yap
            }
        };
        fetchProgress();
    }, [userId]);

    // Yeni Veri Ekle
    const handleAddProgress = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/users/${userId}/progress`, {
                weight: Number(input.weight),
                height: Number(input.height)
            });
            alert("Vücut analizi kaydedildi! 💪");
            window.location.reload(); 
        } catch (err) {
            console.error(err);
            alert("Hata oluştu.");
        }
    };

    // Güvenlik Önlemi: progressData yoksa boş dizi ata
    const safeData = Array.isArray(progressData) ? progressData : [];

    const latest = safeData.length > 0 ? safeData[safeData.length - 1] : null;

    // Grafik verisini hazırla
    const chartData = safeData.map(item => ({
        date: new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
        weight: item.weight
    }));

    return (
        <div className="container" style={{ padding: '50px 20px', minHeight: '100vh', background: '#f8f9fa' }}>
            <h2 style={{ fontFamily: 'Oswald', textAlign: 'center', marginBottom:'40px', fontSize:'36px', color:'#333' }}>
                VÜCUT ANALİZİ & TAKİP MERKEZİ
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto 50px auto' }}>
                
                {/* 1. KART: VERİ GİRİŞİ */}
                <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <h3 style={{marginBottom:'20px', fontFamily:'Oswald', color:'#D31145'}}>YENİ ÖLÇÜM GİR</h3>
                    <form onSubmit={handleAddProgress}>
                        <div style={{display:'flex', gap:'15px', marginBottom:'15px'}}>
                            <div style={{flex:1}}>
                                <label style={{fontSize:'12px', fontWeight:'bold', color:'#555'}}>Kilo (kg)</label>
                                <input type="number" value={input.weight} onChange={(e)=>setInput({...input, weight:e.target.value})} 
                                    style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd', marginTop:'5px'}} required placeholder="75" />
                            </div>
                            <div style={{flex:1}}>
                                <label style={{fontSize:'12px', fontWeight:'bold', color:'#555'}}>Boy (cm)</label>
                                <input type="number" value={input.height} onChange={(e)=>setInput({...input, height:e.target.value})} 
                                    style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd', marginTop:'5px'}} required placeholder="180" />
                            </div>
                        </div>
                        <button className="btn-red" style={{width:'100%', padding:'12px', borderRadius:'8px', cursor:'pointer', border:'none', fontWeight:'bold', fontSize:'16px'}}>
                            KAYDET VE GÜNCELLE
                        </button>
                    </form>
                </div>

                {/* 2. KART: ÖZET DURUM */}
                <div style={{ background: '#222', color:'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
                    {latest ? (
                        <>
                            <span style={{fontSize:'14px', opacity:0.7, letterSpacing:'1px'}}>GÜNCEL BMI ENDEKSİN</span>
                            <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#D31145', lineHeight:1.2 }}>{latest.bmi}</div>
                            <div style={{ marginTop:'10px', padding:'5px 15px', borderRadius:'20px', background: latest.bmi < 25 ? '#28a745' : '#dc3545', fontSize:'12px', fontWeight:'bold' }}>
                                {latest.bmi < 18.5 ? "ZAYIF" : latest.bmi < 25 ? "İDEAL KİLO ✅" : latest.bmi < 30 ? "KİLOLU" : "OBEZ ⚠️"}
                            </div>
                            <p style={{fontSize:'12px', marginTop:'15px', color:'#aaa'}}>Son: {new Date(latest.date).toLocaleDateString('tr-TR')}</p>
                        </>
                    ) : (
                        <p style={{color:'#777'}}>Henüz veri yok. Soldan ilk ölçümünü gir.</p>
                    )}
                </div>

                {/* 3. KART: GRAFİK */}
                <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', minHeight:'250px' }}>
                    <h3 style={{marginBottom:'20px', fontFamily:'Oswald', color:'#333'}}>KİLO DEĞİŞİM GRAFİĞİ</h3>
                    {safeData.length > 1 ? (
                        <div style={{ width: '100%', height: 180 }}>
                            <ResponsiveContainer>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                    <XAxis dataKey="date" tick={{fontSize: 10}} stroke="#888" />
                                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="weight" stroke="#D31145" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#999', fontSize:'14px', textAlign:'center'}}>
                            Grafik oluşması için en az 2 ölçüm girmelisiniz.
                        </div>
                    )}
                </div>
            </div>

            {/* --- ALT BÖLÜM: GEÇMİŞ TABLOSU --- */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                <h3 style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px', fontFamily: 'Oswald', color: '#333' }}>
                    GEÇMİŞ ÖLÇÜMLERİN
                </h3>

                {safeData.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#999', background: '#f9f9f9', borderRadius: '10px' }}>
                        <h4>Henüz Kayıt Yok 📉</h4>
                        <p>İlk ölçümünü yukarıdaki formdan girerek serüvenine başla!</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', color: '#666', fontSize: '14px', textTransform: 'uppercase' }}>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Tarih</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Kilo</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Boy</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>BMI Değeri</th>
                            </tr>
                        </thead>
                        <tbody>
                            {safeData.slice().reverse().map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#333' }}>
                                        {new Date(item.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '15px', color: '#555' }}>{item.weight} kg</td>
                                    <td style={{ padding: '15px', color: '#555' }}>{item.height} cm</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            background: item.bmi < 18.5 ? '#ffc107' : item.bmi < 25 ? '#28a745' : '#dc3545'
                                        }}>
                                            {item.bmi}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Profile;