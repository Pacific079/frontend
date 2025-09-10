import React, { useState, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import ResearcherDashboard from './pages/ResearcherDashboard';
// import UserDashboard from './pages/UserDashboard';
import HelpPage from './pages/HelpPage';
// imp  ort { Language } from './types';
import { I18N_STRINGS } from './constants';
import AuthPage from './pages/AuthPage';


const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/researcher/dashboard" element={<ResearcherDashboard />} />
        {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [language, setLanguage] = useState('en');

  const languageContextValue = useMemo(() => ({
    language,
    setLanguage,
    t: (key) => I18N_STRINGS[language][key] || key,
  }), [language]);

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </LanguageContext.Provider>
  );
};

export default App;
