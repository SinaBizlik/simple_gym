import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="logo">SIMPLE<span style={{color:'#D31145'}}>GYM</span></Link>
                
                {/* Menü Linkleri */}
                <ul className="nav-links">
                    <li><Link to="/">Kulüpler & Dersler</Link></li>
                    <li><Link to="/contact">Iletişim</Link></li> 
                    <li><Link to="/admin">Yönetim Paneli</Link></li>
                    <li>
    {/* Linki "/add-trainer" yerine "/join" olarak değiştirdik */}
    <Link to="/join" className="btn-red">
        BİZE KATIL
    </Link>
</li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;