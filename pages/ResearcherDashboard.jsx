import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { UploadCloud, CheckCircle, FlaskConical, MapPin, LogOut, HelpCircle, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TAXONOMY_DATA, PIPELINE_STEPS, PIE_CHART_COLORS } from '../constants';
import { useLanguage } from '../App';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
};

const Navbar = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <header className="bg-slate-900/80 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg shadow-blue-500/10">
            <div className="text-2xl font-bold text-cyan-400">Aqua-Genix <span className="text-sm font-light text-white">({t('researcher')})</span></div>
            <nav className="flex items-center gap-6">
                <Link to="/researcher/dashboard" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"><LayoutDashboard size={20}/> {t('dashboard')}</Link>
                <Link to="/help" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"><HelpCircle size={20}/> {t('helpSupport')}</Link>
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"><LogOut size={20}/> {t('logout')}</button>
            </nav>
        </header>
    );
};

const PipelineStepper = () => {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % (PIPELINE_STEPS.length + 1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6 text-cyan-300">{t('pipelineStatus')}</h3>
            <div className="flex items-center">
                {PIPELINE_STEPS.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${index < currentStep ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-700 border-slate-500'}`}>
                                {index < currentStep ? <CheckCircle className="text-white" /> : <FlaskConical className="text-slate-400" />}
                            </div>
                            <p className={`mt-2 text-xs text-center ${index < currentStep ? 'text-cyan-300' : 'text-slate-400'}`}>{step}</p>
                        </div>
                        {index < PIPELINE_STEPS.length - 1 && (
                            <div className="flex-1 h-1 bg-slate-700 mx-2 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-cyan-500"
                                    initial={{ width: '0%' }}
                                    animate={{ width: index < currentStep ? '100%' : '0%' }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </motion.div>
    );
};

const TaxonomyPieChart = () => {
    const { t } = useLanguage();
    return (
        <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 text-cyan-300">{t('taxaDistribution')}</h3>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={TAXONOMY_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {TAXONOMY_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend wrapperStyle={{ color: '#fff' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

const WorldMap = () => {
    const { t } = useLanguage();
    const locations = [ { x: '15%', y: '45%' }, { x: '55%', y: '25%' }, { x: '75%', y: '70%' }, { x: '25%', y: '75%' } ];
    return (
        <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 text-cyan-300">{t('samplingLocations')}</h3>
            <div className="relative aspect-video bg-blue-900/30 rounded-lg overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
                    <path d="M500,5 C223.86,5 5,223.86 5,500" fill="none" stroke="#2563eb" strokeWidth="1" transform="scale(1, 0.5) translate(0, 250)" />
                    <path d="M500,5 C776.14,5 995,223.86 995,500" fill="none" stroke="#2563eb" strokeWidth="1" transform="scale(1, 0.5) translate(0, 250)" />
                    {/* Simplified world map path */}
                    <path d="M100 250 L150 200 L200 260 L250 180 L300 280 L350 220 L450 300 L500 200 L550 280 L650 200 L700 250 L750 180 L800 250 L850 200 L900 250" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                    <path d="M120 350 L180 320 L240 380 L300 300 L350 350 L400 300 L450 350 L500 300 L550 350 L600 300 L650 350 L700 300 L750 350 L800 300" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                </svg>
                {locations.map((loc, i) => (
                    <motion.div key={i} className="absolute" style={{ top: loc.y, left: loc.x }}>
                        <MapPin className="text-cyan-400" />
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full"
                            style={{ transform: 'translate(-50%, -50%)' }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const ResearcherDashboard = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <motion.main
                className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-600 hover:text-cyan-400 transition-colors cursor-pointer">
                        <UploadCloud className="w-16 h-16 text-slate-500 mb-4" />
                        <h3 className="text-xl font-semibold text-cyan-300">{t('uploadReport')}</h3>
                        <p className="text-slate-400 text-sm">Drag & drop files here or click to browse</p>
                    </motion.div>
                    <PipelineStepper />
                </div>
                <TaxonomyPieChart />
                <WorldMap />
            </motion.main>
        </div>
    );
};

export default ResearcherDashboard;