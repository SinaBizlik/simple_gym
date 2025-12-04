import React, { useState, useEffect } from 'react';
import { getTrainers, deleteTrainer } from '../api/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [trainers, setTrainers] = useState([]);
    
    // Proje Teklifi Madde 5: "Aggregation query for class popularity statistics"
    // Bu veriler normalde backend'deki aggregation sorgusundan gelecek.
    const mockStats = {
        totalMembers: 142,
        totalTrainers: 8,
        activeClasses: 12,
        classPopularity: [
            { name: 'Fitness', count: 45, percent: 90 }, // %90 Dolu
            { name: 'Yoga', count: 30, percent: 60 },     // %60 Dolu
            { name: 'Pilates', count: 25, percent: 50 },
            { name: 'Boxing', count: 10, percent: 20 },
        ]
    };

    useEffect(() => {
        loadTrainers();
    }, []);

    const loadTrainers = async () => {
        try {
            const res = await getTrainers();
            setTrainers(res.data);
        } catch (error) {
            // Mock Data
            setTrainers([
                { _id: 1, name: 'Sarah Connor', expertise: 'Yoga' },
                { _id: 2, name: 'John Rambo', expertise: 'Fitness' },
                { _id: 3, name: 'Rocky Balboa', expertise: 'Boxing' },
            ]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu eğitmeni silmek istediğinize emin misiniz?')) {
            try {
                await deleteTrainer(id);
                setTrainers(trainers.filter(t => t._id !== id)); 
            } catch (error) {
                alert('Silme işlemi başarısız (Mock modunda sadece listeden kalkar)');
                setTrainers(trainers.filter(t => t._id !== id));
            }
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 className="page-title" style={{ margin: 0 }}>YÖNETİM PANELİ</h1>
                <Link to="/add-trainer" className="btn-red">
                    + YENİ EĞİTMEN EKLE
                </Link>
            </div>

            {/* --- BÖLÜM 1: İSTATİSTİK KARTLARI (KPIs) --- */}
            <div className="dashboard-grid">
                <div className="stat-card">
                    <h3>TOPLAM ÜYE</h3>
                    <div className="stat-number">{mockStats.totalMembers}</div>
                </div>
                <div className="stat-card">
                    <h3>AKTİF DERSLER</h3>
                    <div className="stat-number">{mockStats.activeClasses}</div>
                </div>
                <div className="stat-card">
                    <h3>EĞİTMEN SAYISI</h3>
                    <div className="stat-number">{trainers.length}</div>
                </div>
            </div>

            {/* --- BÖLÜM 2: DERS DOLULUK ORANLARI (Aggregation Query Görselleştirme) --- */}
            <div className="chart-container" style={{ margin: '40px 0' }}>
                <h2 style={{ fontFamily: 'Oswald, sans-serif', marginBottom: '20px' }}>DERS POPÜLERLİK ANALİZİ</h2>
                <div style={{ background: '#fff', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
                    {mockStats.classPopularity.map((item, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontWeight: 'bold' }}>
                                <span>{item.name}</span>
                                <span>{item.percent}% Doluluk</span>
                            </div>
                            <div style={{ width: '100%', height: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
                                <div style={{ 
                                    width: `${item.percent}%`, 
                                    height: '100%', 
                                    background: item.percent > 80 ? '#D31145' : '#333', // Çok doluysa kırmızı
                                    borderRadius: '5px' 
                                }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- BÖLÜM 3: EĞİTMEN YÖNETİM TABLOSU (CRUD) --- */}
            <h2 style={{ fontFamily: 'Oswald, sans-serif', marginBottom: '20px' }}>EĞİTMEN LİSTESİ</h2>
            <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>EĞİTMEN ADI</th>
                            <th>UZMANLIK</th>
                            <th>DURUM</th>
                            <th>İŞLEMLER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map(t => (
                            <tr key={t._id}>
                                <td style={{ fontWeight: 'bold' }}>{t.name}</td>
                                <td>{t.expertise}</td>
                                <td><span style={{ color: 'green', fontWeight: 'bold' }}>Aktif</span></td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(t._id)}
                                        style={{ 
                                            background: '#333', color: 'white', border: 'none', 
                                            padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' 
                                        }}
                                    >
                                        SİL
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;