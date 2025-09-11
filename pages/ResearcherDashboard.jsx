import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { UploadCloud, CheckCircle, FlaskConical, LogOut, HelpCircle, LayoutDashboard, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';
import ChatBot from '../components/ChatBot';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

// Dummy backend API functions
const fetchTaxonomyData = () =>
  Promise.resolve([
    { name: 'Kingdom', value: 400 },
    { name: 'Phylum', value: 300 },
    { name: 'Class', value: 300 },
    { name: 'Order', value: 200 },
    { name: 'Family', value: 278 },
    { name: 'Genus', value: 189 },
    { name: 'Species', value: 239 },
  ]);

const fetchPipelineSteps = () =>
  Promise.resolve([
    'Data Preprocessing',
    'Deep Learning Model Training',
    'Taxonomic Classification',
    'Report Generation',
  ]);

const fetchBiodiversityLocations = () =>
  Promise.resolve([
    { lat: -33.8688, lng: 151.2093, name: 'Sydney Coral', species: 120 },
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco Bay', species: 80 },
    { lat: 19.4326, lng: -99.1332, name: 'Mexico City Lake', species: 60 },
    { lat: 51.5074, lng: -0.1278, name: 'London Thames', species: 45 }
  ]);

// Dummy sample analysis results
const fetchSampleAnalysisResults = () =>
  Promise.resolve([
    {
      sampleId: 'SMP001',
      species: 'Clownfish',
      confidence: 0.98,
      location: 'Sydney Coral',
      geneticMarkers: 'COI, 16S',
      status: 'Confirmed',
      date: '2025-09-10'
    },
    {
      sampleId: 'SMP002',
      species: 'Manta Ray',
      confidence: 0.92,
      location: 'San Francisco Bay',
      geneticMarkers: 'COI, CytB',
      status: 'Confirmed',
      date: '2025-09-10'
    },
    {
      sampleId: 'SMP003',
      species: 'Sea Turtle',
      confidence: 0.87,
      location: 'Mexico City Lake',
      geneticMarkers: 'COI',
      status: 'Review',
      date: '2025-09-09'
    },
    {
      sampleId: 'SMP004',
      species: 'Dolphin',
      confidence: 0.95,
      location: 'London Thames',
      geneticMarkers: 'COI, ND2',
      status: 'Confirmed',
      date: '2025-09-09'
    }
  ]);

// Dummy phylogenetic analysis data
const fetchPhylogeneticData = () =>
  Promise.resolve([
    { group: 'Actinopterygii', value: 40 },
    { group: 'Elasmobranchii', value: 25 },
    { group: 'Reptilia', value: 15 },
    { group: 'Mammalia', value: 20 }
  ]);

// Dummy biodiversity metric data
const fetchBiodiversityMetric = () =>
  Promise.resolve([
    { location: 'Sydney Coral', metric: 120 },
    { location: 'San Francisco Bay', metric: 80 },
    { location: 'Mexico City Lake', metric: 60 },
    { location: 'London Thames', metric: 45 }
  ]);

// Animation variants
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

const PipelineStepper = ({ pipelineSteps }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % (pipelineSteps.length + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [pipelineSteps]);

  return (
    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-6 text-cyan-300">{t('pipelineStatus')}</h3>
      <div className="flex items-center">
        {pipelineSteps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${index < currentStep ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-700 border-slate-500'}`}>
                {index < currentStep ? <CheckCircle className="text-white" /> : <FlaskConical className="text-slate-400" />}
              </div>
              <p className={`mt-2 text-xs text-center ${index < currentStep ? 'text-cyan-300' : 'text-slate-400'}`}>{step}</p>
            </div>
            {index < pipelineSteps.length - 1 && (
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

const UploadBox = ({ onFileSelect, onHistoryAdd }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.fasta')) {
      setSelectedFile(file);
      onFileSelect(file);

      // Simulate processing time (random 2-10 seconds)
      const processTime = Math.floor(Math.random() * 9) + 2;
      const now = new Date();
      onHistoryAdd({
        fileName: file.name,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        processTime: `${processTime} sec`
      });
    } else {
      setSelectedFile(null);
      onFileSelect(null);
      alert('Please select a valid FASTA file (.fasta)');
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800/50 p-6 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-600 hover:text-cyan-400 transition-colors cursor-pointer"
      onClick={handleBoxClick}
      style={{ position: 'relative' }}
    >
      <input
        type="file"
        accept=".fasta"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <UploadCloud className="w-16 h-16 text-slate-500 mb-4" />
      <h3 className="text-xl font-semibold text-cyan-300">Upload DNA Report (.fasta)</h3>
      <p className="text-slate-400 text-sm">Drag & drop files here or click to browse</p>
      {selectedFile && (
        <div className="mt-4 text-cyan-300 text-sm">
          Selected file: <span className="font-semibold">{selectedFile.name}</span>
        </div>
      )}
    </motion.div>
  );
};

const UploadHistory = ({ history }) => (
  <div className="bg-slate-800/40 rounded-xl p-4 mt-4">
    <h4 className="text-cyan-300 font-semibold mb-2">Upload History</h4>
    <table className="w-full text-sm text-cyan-100">
      <thead>
        <tr>
          <th className="text-left py-1">File Name</th>
          <th className="text-left py-1">Date</th>
          <th className="text-left py-1">Time</th>
          <th className="text-left py-1">Processing Time</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item, idx) => (
          <tr key={idx} className="border-b border-slate-700">
            <td className="py-1">{item.fileName}</td>
            <td className="py-1">{item.date}</td>
            <td className="py-1">{item.time}</td>
            <td className="py-1">{item.processTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {history.length === 0 && <div className="text-slate-400 py-2">No uploads yet.</div>}
  </div>
);

const WorldMap = ({ biodiversityLocations }) => {
  const { t } = useLanguage();

  return (
    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl relative z-0">
      <h3 className="text-xl font-semibold mb-4 text-cyan-300">{t('samplingLocations')}</h3>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%", borderRadius: "1rem", zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {biodiversityLocations.map((loc, i) => (
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
          {biodiversityLocations.map((loc, i) => (
            <li key={i}>{loc.name}: {loc.species} species</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Visualization Tabs
const VisualizationTabs = ({
  taxonomyData,
  phyloData,
  biodiversityMetric,
}) => {
  const [activeTab, setActiveTab] = useState('taxonomy');

  const tabConfig = {
    taxonomy: {
      label: 'Taxonomic Classification',
      graph: (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={taxonomyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#22d3ee" />
            <YAxis stroke="#22d3ee" />
            <Tooltip />
            <Bar dataKey="value" fill="#22d3ee" />
          </BarChart>
        </ResponsiveContainer>
      ),
      data: taxonomyData,
      columns: ['name', 'value'],
    },
    phylo: {
      label: 'Phylogenetic Analysis',
      graph: (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie data={phyloData} dataKey="value" nameKey="group" cx="50%" cy="50%" outerRadius={100} label>
              {phyloData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
            <Legend wrapperStyle={{ color: '#fff' }}/>
          </PieChart>
        </ResponsiveContainer>
      ),
      data: phyloData,
      columns: ['group', 'value'],
    },
    biodiversity: {
      label: 'Biodiversity Metric',
      graph: (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={biodiversityMetric}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" stroke="#22d3ee" />
            <YAxis stroke="#22d3ee" />
            <Tooltip />
            <Bar dataKey="metric" fill="#22d3ee" />
          </BarChart>
        </ResponsiveContainer>
      ),
      data: biodiversityMetric,
      columns: ['location', 'metric'],
    },
  };

  // Export helpers
  const exportJSON = (data, name) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = (data, columns, name) => {
    const rows = [columns, ...data.map(item => columns.map(col => item[col]))];
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportExcel = (data, columns, name) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data, { header: columns });
    XLSX.utils.book_append_sheet(wb, ws, name);
    XLSX.writeFile(wb, `${name}.xlsx`);
  };

  const exportPDF = (data, columns, name) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(name, 10, 10);
    let y = 20;
    data.forEach(item => {
      doc.text(columns.map(col => `${col}: ${item[col]}`).join(', '), 10, y);
      y += 10;
    });
    doc.save(`${name}.pdf`);
  };

  const current = tabConfig[activeTab];

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 mb-8 mx-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {Object.entries(tabConfig).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${
                activeTab === key
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-cyan-300 hover:bg-cyan-600 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportJSON(current.data, current.label.replace(/\s/g, '_'))}
            className="px-3 py-1 bg-cyan-500 rounded text-white text-xs font-bold hover:bg-cyan-400"
          >
            JSON
          </button>
          <button
            onClick={() => exportCSV(current.data, current.columns, current.label.replace(/\s/g, '_'))}
            className="px-3 py-1 bg-green-500 rounded text-white text-xs font-bold hover:bg-green-400"
          >
            CSV
          </button>
          <button
            onClick={() => exportExcel(current.data, current.columns, current.label.replace(/\s/g, '_'))}
            className="px-3 py-1 bg-yellow-500 rounded text-white text-xs font-bold hover:bg-yellow-400"
          >
            Excel
          </button>
          <button
            onClick={() => exportPDF(current.data, current.columns, current.label.replace(/\s/g, '_'))}
            className="px-3 py-1 bg-red-500 rounded text-white text-xs font-bold hover:bg-red-400"
          >
            PDF
          </button>
        </div>
      </div>
      <div className="w-full h-80">{current.graph}</div>
    </div>
  );
};

const KeyInsight = ({ sampleResults }) => {
  const confirmed = sampleResults.filter(s => s.status === 'Confirmed').length;
  const review = sampleResults.filter(s => s.status === 'Review').length;
  const total = sampleResults.length;
  const topSpecies = sampleResults.reduce((acc, curr) => {
    acc[curr.species] = (acc[curr.species] || 0) + 1;
    return acc;
  }, {});
  const mostAbundant = Object.entries(topSpecies).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="bg-slate-800/60 rounded-xl p-6 mb-8 mx-8">
      <h3 className="text-xl font-bold text-cyan-300 mb-2">Key Insight</h3>
      <p className="text-white mb-2">
        Out of <span className="font-semibold">{total}</span> samples, <span className="font-semibold">{confirmed}</span> are confirmed and <span className="font-semibold">{review}</span> need review.
        The most abundant species detected is <span className="font-semibold text-cyan-400">{mostAbundant}</span>.
      </p>
      <h4 className="text-cyan-200 font-semibold mt-4 mb-1">Recommendation</h4>
      <p className="text-white">
        Focus further sampling efforts on regions with high abundance of <span className="font-semibold text-cyan-400">{mostAbundant}</span> and review flagged samples for possible data quality issues.
      </p>
    </div>
  );
};

const SpeciesAbundanceBar = ({ sampleResults }) => {
  const abundance = Object.values(
    sampleResults.reduce((acc, curr) => {
      acc[curr.species] = acc[curr.species] || { species: curr.species, count: 0 };
      acc[curr.species].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 mb-8 mx-8">
      <h3 className="text-xl font-bold text-cyan-300 mb-4">Species Abundance</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={abundance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="species" stroke="#22d3ee" />
            <YAxis stroke="#22d3ee" />
            <Tooltip />
            <Bar dataKey="count" fill="#22d3ee" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const SampleAnalysisResults = ({ results }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800/50 p-6 rounded-2xl mx-8 mb-8"
      style={{ maxWidth: '100%', gridColumn: '1 / -1' }}
    >
      <h3 className="text-xl font-semibold mb-4 text-cyan-300">{t('sampleAnalysisResults')}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-cyan-100">
          <thead>
            <tr className="bg-slate-700">
              <th className="px-4 py-2 text-left">{t('sampleId')}</th>
              <th className="px-4 py-2 text-left">{t('species')}</th>
              <th className="px-4 py-2 text-left">{t('confidence')}</th>
              <th className="px-4 py-2 text-left">{t('location')}</th>
              <th className="px-4 py-2 text-left">{t('geneticMarkers')}</th>
              <th className="px-4 py-2 text-left">{t('status')}</th>
              <th className="px-4 py-2 text-left">{t('date')}</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.sampleId} className="border-b border-slate-700">
                <td className="px-4 py-2">{result.sampleId}</td>
                <td className="px-4 py-2">{result.species}</td>
                <td className="px-4 py-2">{(result.confidence * 100).toFixed(2)}%</td>
                <td className="px-4 py-2">{result.location}</td>
                <td className="px-4 py-2">{result.geneticMarkers}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${result.status === 'Confirmed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {t(result.status.toLowerCase())}
                  </span>
                </td>
                <td className="px-4 py-2">{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const ExportModal = ({ open, onClose, data }) => {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard_data.json';
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  const exportCSV = () => {
    const rows = [
      ['Taxonomy', 'Value'],
      ...data.taxonomyData.map(item => [item.name, item.value])
    ];
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard_data.csv';
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data.taxonomyData, { header: ["name", "value"] });
    XLSX.utils.book_append_sheet(wb, ws, "Taxonomy");
    XLSX.writeFile(wb, "dashboard_data.xlsx");
    onClose();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Taxonomy Data", 10, 10);
    let y = 20;
    data.taxonomyData.forEach(item => {
      doc.text(`${item.name}: ${item.value}`, 10, y);
      y += 10;
    });
    doc.save("dashboard_data.pdf");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-slate-900 rounded-xl p-8 shadow-2xl flex flex-col gap-4 min-w-[300px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="text-xl font-bold text-cyan-300 mb-2">Export Data</h3>
            <button
              onClick={exportJSON}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 rounded-lg text-white font-bold shadow-lg hover:bg-cyan-400 transition-all duration-300"
            >
              <Download size={20} />
              Export JSON
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 rounded-lg text-white font-bold shadow-lg hover:bg-green-400 transition-all duration-300"
            >
              <Download size={20} />
              Export CSV
            </button>
            <button
              onClick={exportExcel}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 rounded-lg text-white font-bold shadow-lg hover:bg-yellow-400 transition-all duration-300"
            >
              <Download size={20} />
              Export Excel
            </button>
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 rounded-lg text-white font-bold shadow-lg hover:bg-red-400 transition-all duration-300"
            >
              <Download size={20} />
              Export PDF
            </button>
            <button
              onClick={onClose}
              className="mt-2 text-cyan-300 underline hover:text-cyan-200"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ResearcherDashboard = () => {
  const { t } = useLanguage();
  const [fastaFile, setFastaFile] = useState(null);
  const [taxonomyData, setTaxonomyData] = useState([]);
  const [pipelineSteps, setPipelineSteps] = useState([]);
  const [biodiversityLocations, setBiodiversityLocations] = useState([]);
  const [history, setHistory] = useState([]);
  const [exportOpen, setExportOpen] = useState(false);
  const [sampleAnalysisResults, setSampleAnalysisResults] = useState([]);
  const [phyloData, setPhyloData] = useState([]);
  const [biodiversityMetric, setBiodiversityMetric] = useState([]);

  // Fetch all data from backend (dummy APIs here)
  useEffect(() => {
    fetchTaxonomyData().then(setTaxonomyData);
    fetchPipelineSteps().then(setPipelineSteps);
    fetchBiodiversityLocations().then(setBiodiversityLocations);
    fetchSampleAnalysisResults().then(setSampleAnalysisResults);
    fetchPhylogeneticData().then(setPhyloData);
    fetchBiodiversityMetric().then(setBiodiversityMetric);
  }, []);

  // Collect all data for export
  const exportData = {
    taxonomyData,
    pipelineSteps,
    biodiversityLocations,
    fastaFileName: fastaFile ? fastaFile.name : null,
    history
  };

  // Add upload history
  const handleHistoryAdd = (entry) => {
    setHistory(prev => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Navbar />
      <motion.main
        className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <UploadBox onFileSelect={setFastaFile} onHistoryAdd={handleHistoryAdd} />
            <UploadHistory history={history} />
          </div>
          <PipelineStepper pipelineSteps={pipelineSteps} />
        </div>
        <WorldMap biodiversityLocations={biodiversityLocations} />
      </motion.main>
      <div className="flex flex-col gap-0">
        <VisualizationTabs
          taxonomyData={taxonomyData}
          phyloData={phyloData}
          biodiversityMetric={biodiversityMetric}
        />
        <KeyInsight sampleResults={sampleAnalysisResults} />
        <SpeciesAbundanceBar sampleResults={sampleAnalysisResults} />
        <SampleAnalysisResults results={sampleAnalysisResults} />
        <div className="flex justify-start mx-8 mb-8">
          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 rounded-lg text-white font-bold shadow-lg hover:bg-cyan-400 transition-all duration-300"
          >
            <Download size={20} />
            Export All
          </button>
        </div>
      </div>
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} data={exportData} />
      <div className="fixed bottom-0 right-0 z-[101]">
        <ChatBot />
      </div>
    </div>
  );
};

export default ResearcherDashboard;
