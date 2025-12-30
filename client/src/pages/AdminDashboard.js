import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; 

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]); // Yeni: Dersler State'i

    useEffect(() => {
        // 1. GÜVENLİK KONTROLÜ
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            alert('Bu sayfaya erişim yetkiniz yok!');
            navigate('/'); 
            return;
        }

        // 2. TÜM VERİLERİ ÇEK (Kullanıcılar + Dersler)
        fetchAllData();
    }, [navigate]);

    const fetchAllData = async () => {
        try {
            // Kullanıcıları Çek
            const usersRes = await api.get('/users');
            setUsers(usersRes.data);

            // Dersleri Çek
            const coursesRes = await api.get('/courses');
            setCourses(coursesRes.data);

        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    };

    // KULLANICI SİLME
    const handleDeleteUser = async (id) => {
        if (window.confirm('Bu kullanıcıyı silmek istediğine emin misin?')) {
            try {
                await api.delete(`/users/${id}`);
                fetchAllData(); // Listeyi yenile
                alert('Kullanıcı silindi.');
            } catch (error) {
                alert('Silme başarısız.');
            }
        }
    };

    // DERS SİLME (YENİ)
    const handleDeleteCourse = async (id) => {
        if (window.confirm('Bu dersi ve içindeki kayıtları silmek istediğine emin misin?')) {
            try {
                await api.delete(`/courses/${id}`);
                fetchAllData(); // Listeyi yenile
                alert('Ders başarıyla silindi.');
            } catch (error) {
                alert('Ders silinemedi.');
            }
        }
    };

    // Listeleri Filtrele
    const athletes = users.filter(user => user.role === 'user' || user.role === 'member');
    const trainers = users.filter(user => user.role === 'trainer');

    // Tarih Formatlayıcı
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="container" style={{ padding: '80px 20px', minHeight: '80vh' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px', fontFamily: 'Oswald' }}>YÖNETİM PANELİ</h1>

            {/* --- BÖLÜM 1: AKTİF DERSLER (YENİ) --- */}
            <div style={styles.section}>
                <h2 style={{ color: '#28a745', marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom:'10px' }}>
                    AKTİF DERS PROGRAMI <span style={{fontSize:'16px', color:'#666'}}>({courses.length})</span>
                </h2>
                {courses.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={styles.th}>Ders Adı</th>
                                <th style={styles.th}>Eğitmen</th>
                                <th style={styles.th}>Tarih</th>
                                <th style={styles.th}>Doluluk</th>
                                <th style={styles.th}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={styles.td}><strong>{course.type}</strong></td>
                                    <td style={styles.td}>{course.trainerName}</td>
                                    <td style={styles.td}>{formatDate(course.date)}</td>
                                    <td style={styles.td}>
                                        <span style={{
                                            background: course.participants.length >= course.quota ? '#ffd2d2' : '#d2ffd2',
                                            padding: '3px 8px', borderRadius: '5px', fontSize:'12px', fontWeight:'bold'
                                        }}>
                                            {course.participants.length} / {course.quota}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleDeleteCourse(course._id)} style={styles.deleteBtn}>SİL</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{color:'#999'}}>Henüz eklenmiş bir ders yok.</p>
                )}
            </div>

            {/* --- BÖLÜM 2: EĞİTMENLER --- */}
            <div style={styles.section}>
                <h2 style={{ color: '#D31145', marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom:'10px' }}>
                    EĞİTMEN LİSTESİ <span style={{fontSize:'16px', color:'#666'}}>({trainers.length})</span>
                </h2>
                {trainers.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={styles.th}>Kullanıcı Adı</th>
                                <th style={styles.th}>Uzmanlık</th>
                                <th style={styles.th}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainers.map(trainer => (
                                <tr key={trainer._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={styles.td}><strong>{trainer.username}</strong></td>
                                    <td style={styles.td}>
                                        <span style={{background:'#eee', padding:'2px 8px', borderRadius:'5px', fontSize:'13px'}}>
                                            {trainer.expertise || 'Genel'}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleDeleteUser(trainer._id)} style={styles.deleteBtn}>SİL</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{color:'#999'}}>Henüz kayıtlı eğitmen yok.</p>
                )}
            </div>

            {/* --- BÖLÜM 3: SPORCULAR --- */}
            <div style={styles.section}>
                <h2 style={{ color: '#333', marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom:'10px' }}>
                    SPORCU LİSTESİ <span style={{fontSize:'16px', color:'#666'}}>({athletes.length})</span>
                </h2>
                {athletes.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={styles.th}>Kullanıcı Adı</th>
                                <th style={styles.th}>Rol</th>
                                <th style={styles.th}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {athletes.map(athlete => (
                                <tr key={athlete._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={styles.td}><strong>{athlete.username}</strong></td>
                                    <td style={{ ...styles.td, color: '#666' }}>Üye</td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleDeleteUser(athlete._id)} style={styles.deleteBtn}>SİL</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{color:'#999'}}>Henüz kayıtlı sporcu yok.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    section: { marginBottom: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    th: { padding: '15px', textAlign: 'left', color: '#555', fontWeight: 'bold', fontSize:'14px' },
    td: { padding: '15px', textAlign: 'left', verticalAlign: 'middle', fontSize:'14px' },
    deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight:'bold', fontSize:'12px' }
};

export default AdminDashboard;