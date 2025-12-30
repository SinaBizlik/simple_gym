import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const userRole = localStorage.getItem('role'); 
  const currentUserId = localStorage.getItem('userId'); // Giriş yapan kişi

  // Dersleri Çek
  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // DERSE KATILMA FONKSİYONU
  const handleJoin = async (courseId) => {
    if (!currentUserId) {
        alert("Derse katılmak için giriş yapmalısınız!");
        return;
    }

    try {
        await api.post(`/courses/${courseId}/join`, { userId: currentUserId });
        alert("Kaydınız başarıyla alındı!");
        fetchCourses(); // Sayfayı yenilemeden verileri güncelle (Bar artsın)
    } catch (error) {
        alert(error.response?.data?.error || "Bir hata oluştu");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {/* HERO SECTION AYNI KALSIN... */}
      <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920")', height: '500px', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', textAlign: 'center', boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)' }}>
        <h1 style={{ fontFamily: 'Oswald', fontSize: '60px', marginBottom: '10px', color: 'white' }}>HEDEFİN SENİNLE BAŞLAR</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', marginBottom: '30px' }}>Türkiye'nin en deneyimli eğitmenleri ile Simple Gym'i keşfet.</p>
        {!userRole && <Link to="/join" className="btn-red" style={{ padding: '15px 40px', fontSize: '18px' }}>HEMEN KAYIT OL</Link>}
      </div>

      <div className="container" style={{ padding: '50px 20px' }}>
        <h2 style={{ fontFamily: 'Oswald', borderLeft: '5px solid #D31145', paddingLeft: '15px', marginBottom: '40px' }}>HAFTALIK DERS PROGRAMI</h2>

        {courses.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#999' }}>Planlanmış ders yok.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {courses.map((course) => {
              
              // DOLULUK HESAPLAMA
              const participantsCount = course.participants ? course.participants.length : 0;
              const quota = course.quota || 20;
              const occupancyRate = (participantsCount / quota) * 100;
              const isFull = participantsCount >= quota;
              const isJoined = course.participants && course.participants.includes(currentUserId);

              return (
                <div key={course._id} style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                  <div style={{ height: '200px', position: 'relative' }}>
                    <img src={course.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"} alt={course.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#D31145', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                      {new Date(course.date).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 5px 0', fontFamily: 'Oswald', textTransform: 'uppercase', fontSize: '22px' }}>{course.type}</h3>
                    <p style={{ color: '#888', fontSize: '14px', margin: '0 0 15px 0' }}>Eğitmen: <strong style={{color:'#333'}}>{course.trainerName || 'Uzman Eğitmen'}</strong></p>
                    <div style={{ background:'#f9f9f9', padding:'10px', borderRadius:'5px', marginBottom:'15px', fontSize:'14px' }}>📅 {formatDate(course.date)}</div>

                    {/* CANLI DOLULUK BARI */}
                    <div style={{ marginBottom: '5px', fontSize: '12px', display:'flex', justifyContent:'space-between', fontWeight:'bold' }}>
                       <span>Doluluk:</span>
                       <span>{participantsCount} / {quota}</span>
                    </div>
                    <div style={{ width: '100%', background: '#eee', height: '10px', borderRadius: '5px', overflow:'hidden' }}>
                       <div style={{ 
                           width: `${occupancyRate}%`, 
                           background: isFull ? 'red' : '#28a745', 
                           height: '100%', 
                           transition: 'width 0.5s ease' 
                       }}></div>
                    </div>

                    {/* BUTON MANTIĞI */}
                    {isJoined ? (
                        <button className="btn-red" disabled style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#ccc', cursor: 'default' }}>
                            KAYITLISINIZ ✅
                        </button>
                    ) : isFull ? (
                        <button className="btn-red" disabled style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#666', cursor: 'not-allowed' }}>
                            KONTENJAN DOLU ❌
                        </button>
                    ) : (
                        <button 
                            onClick={() => handleJoin(course._id)} 
                            className="btn-red" 
                            style={{ width: '100%', marginTop: '20px', padding: '12px', cursor:'pointer' }}>
                            DERSE KATIL
                        </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;