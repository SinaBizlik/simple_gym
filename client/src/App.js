import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import TrainerForm from './pages/TrainerForm';
import Contact from './pages/Contact';
import RoleSelection from './pages/RoleSelection';
import RegisterMember from './pages/RegisterMember';
import Login from './pages/Login';
import Register from './pages/Register';
// 👇 1. EKLEME: Bu satır eksikti
import AddCourse from './pages/AddCourse';
import MemberRequest from './pages/MemberRequest';
import TrainerRequests from './pages/TrainerRequests';
import MyRequests from './pages/MyRequests';
import Profile from './pages/Profiles';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{paddingBottom: '50px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<RoleSelection />} />
          <Route path="/add-trainer" element={<TrainerForm />} />

          {/* BU ROTAYI ARTIK YENİ KAYIT SAYFASINA YÖNLENDİRİYORUZ */}
          <Route path="/register-member" element={<RegisterMember />} /> 

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request" element={<MemberRequest />} />
          <Route path="/trainer-requests" element={<TrainerRequests />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* 👇 2. EKLEME: Bu satırı ekleyerek sayfayı aktif ettik */}
          <Route path="/add-course" element={<AddCourse />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;