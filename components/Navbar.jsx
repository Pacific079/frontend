// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, HelpCircle, LogOut, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../App';

const Navbar = ({ onUserDataClick }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="bg-slate-900/80 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg shadow-blue-500/10">
      <div className="text-2xl font-bold text-cyan-400">
        Aqua-Genix <span className="text-sm font-light text-white">({t('researcher')})</span>
      </div>
      <nav className="flex items-center gap-6">
        <Link to="/researcher/dashboard" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
          <LayoutDashboard size={20}/> {t('dashboard')}
        </Link>
        <button 
          onClick={onUserDataClick}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
        >
          <User size={20}/> User Data
        </button>
        <Link to="/help" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
          <HelpCircle size={20}/> {t('helpSupport')}
        </Link>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
          <LogOut size={20}/> {t('logout')}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;