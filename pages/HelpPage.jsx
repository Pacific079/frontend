import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LogOut, LayoutDashboard, Languages } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FAQ_DATA } from '../constants';
import { useLanguage } from '../App';
import ChatBot from '../components/ChatBot';

// Navbar Component
const Navbar = () => {
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    // Note: more robust solution would detect which dashboard the user came from.
    // For this demo, we provide links to both dashboards.
    return (
        <header className="bg-slate-900/80 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg shadow-blue-500/10">
            <div className="text-2xl font-bold text-cyan-400">Aqua-Genix</div>
            <nav className="flex items-center gap-6">
                <Link
                    to="/researcher/dashboard"
                    className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
                >
                    <LayoutDashboard size={20}/> Researcher
                </Link>
                
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
                >
                    <Languages size={20}/> {t('langToggle')}
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
                >
                    <LogOut size={20}/> {t('logout')}
                </button>
            </nav>
        </header>
    );
};

// AccordionItem Component
const AccordionItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-700">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left p-6 hover:bg-slate-800/50 transition-colors"
            >
                <span className="text-lg font-semibold text-cyan-200">{item.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-6 h-6 text-cyan-400" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 text-slate-300">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const HelpPage = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const { t } = useLanguage();

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto p-8"
            >
                <h1 className="text-4xl font-bold text-center mb-12 text-cyan-300">{t('faqTitle')}</h1>
                <div className="bg-slate-800 rounded-lg shadow-2xl shadow-blue-900/30 overflow-hidden">
                    {FAQ_DATA.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </motion.main>

            {/* 👇 ChatBot floating assistant */}
            <ChatBot />
        </div>
    );
};

export default HelpPage;
