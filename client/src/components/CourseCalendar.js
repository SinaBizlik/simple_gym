import React, { useState } from 'react';

const CourseCalendar = ({ courses }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const daysOfWeek = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  // Ayın kaç çektiğini bul
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Ayın ilk gününün haftanın hangi günü olduğunu bul (Pazartesi'yi 0 yapmak için ayar)
  let firstDayIndex = new Date(year, month, 1).getDay(); 
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Pazar(0) -> 6, Pzt(1) -> 0

  // Önceki ve sonraki ay butonları
  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  // O günde ders var mı kontrolü
  const getCoursesForDay = (day) => {
    return courses.filter(course => {
      const courseDate = new Date(course.date);
      return (
        courseDate.getDate() === day &&
        courseDate.getMonth() === month &&
        courseDate.getFullYear() === year
      );
    });
  };

  return (
    <div style={styles.calendarContainer}>
      {/* --- BAŞLIK VE NAVİGASYON --- */}
      <div style={styles.header}>
        <button onClick={() => changeMonth(-1)} style={styles.navBtn}>❮</button>
        <h3 style={{ margin: 0, fontFamily: 'Oswald', textTransform: 'uppercase' }}>
          {monthNames[month]} {year}
        </h3>
        <button onClick={() => changeMonth(1)} style={styles.navBtn}>❯</button>
      </div>

      {/* --- GÜN İSİMLERİ (Pzt, Sal...) --- */}
      <div style={styles.grid}>
        {daysOfWeek.map(day => (
          <div key={day} style={styles.dayName}>{day}</div>
        ))}

        {/* --- BOŞ KUTULAR (Ayın başındaki boşluklar) --- */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} style={styles.emptyDay}></div>
        ))}

        {/* --- GÜNLER (1, 2, 3...) --- */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const todaysCourses = getCoursesForDay(day);
          const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

          return (
            <div key={day} style={{ ...styles.dayCell, backgroundColor: isToday ? '#fff0f0' : 'white' }}>
              <span style={styles.dayNumber}>{day}</span>
              
              {/* O GÜN DERS VARSA GÖSTER */}
              <div style={styles.eventContainer}>
                {todaysCourses.map(course => (
                  <div key={course._id} style={styles.eventDot} title={`${course.type} - ${new Date(course.date).toLocaleTimeString('tr-TR', {hour:'2-digit', minute:'2-digit'})}`}>
                    {course.type}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- CSS STİLLERİ (IZGARA YAPISI) ---
const styles = {
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    padding: '20px',
    marginBottom: '50px',
    border: '1px solid #ddd'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  navBtn: {
    background: '#D31145',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)', // 7 Sütunlu Izgara
    borderTop: '1px solid #eee',
    borderLeft: '1px solid #eee'
  },
  dayName: {
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #eee',
    borderBottom: '1px solid #eee',
    color: '#555'
  },
  emptyDay: {
    backgroundColor: '#fcfcfc',
    borderRight: '1px solid #eee',
    borderBottom: '1px solid #eee'
  },
  dayCell: {
    minHeight: '80px', // Kutuların yüksekliği
    padding: '5px',
    borderRight: '1px solid #eee',
    borderBottom: '1px solid #eee',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  dayNumber: {
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '5px',
    color: '#333'
  },
  eventContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  eventDot: {
    backgroundColor: '#D31145',
    color: 'white',
    fontSize: '10px',
    padding: '2px 4px',
    borderRadius: '3px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'help'
  }
};

export default CourseCalendar;