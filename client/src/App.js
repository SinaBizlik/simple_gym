import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import TrainerForm from './pages/TrainerForm';
import Contact from './pages/Contact';
import RoleSelection from './pages/RoleSelection';
import RegisterMember from './pages/RegisterMember'; // YENİ IMPORT

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;