import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { UploadCloud, CheckCircle, FlaskConical, LogOut, HelpCircle, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TAXONOMY_DATA, PIPELINE_STEPS, PIE_CHART_COLORS } from '../constants';
import { useLanguage } from '../App';
import ChatBot from '../components/ChatBot';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
      <div className="text-2xl font-bold text-cyan-400">
        Aqua-Genix <span className="text-sm font-light text-white">({t('researcher')})</span>
      </div>
      <nav className="flex items-center gap-6">
        <Link to="/researcher/dashboard" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
          <LayoutDashboard size={20}/> {t('dashboard')}
        </Link>
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

//  Dummy API for biodiversity data
const fetchBiodiversityLocations = () => {
  return Promise.resolve([
    { lat: -33.8688, lng: 151.2093, name: 'Sydney Coral', species: 120 },
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco Bay', species: 80 },
    { lat: 19.4326, lng: -99.1332, name: 'Mexico City Lake', species: 60 },
    { lat: 51.5074, lng: -0.1278, name: 'London Thames', species: 45 }
  ]);
};

const WorldMap = () => {
  const { t } = useLanguage();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchBiodiversityLocations().then(setLocations);
  }, []);

  return (
    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-4 text-cyan-300">{t('samplingLocations')}</h3>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%", borderRadius: "1rem" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.name}</strong><br />
              Species: {loc.species}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="mt-4 text-sm text-cyan-200">
        <strong>Biodiversity Data:</strong>
        <ul>
          {locations.map((loc, i) => (
            <li key={i}>{loc.name}: {loc.species} species</li>
          ))}
        </ul>
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
      <ChatBot />
    </div>
  );
};

export default ResearcherDashboard;
