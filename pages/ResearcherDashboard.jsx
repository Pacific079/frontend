// pages/ResearcherDashboard.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// In ResearcherDashboard.js
import Navbar from '../components/Navbar.jsx';
import UserDataForm from '../components/UserDataForm.jsx';
import VisualizationPanel from '../components/VisualizationPanel.jsx';
import PipelineStepper from '../components/PipelineStepper.jsx';
import UploadBox from '../components/UploadBox.jsx';
import KeyInsight from '../components/KeyInsight.jsx';
import SpeciesAbundanceBar from '../components/SpeciesAbundanceBar.jsx';
import SampleAnalysisResults from '../components/SampleAnalysisResults.jsx';
import ExportModal from '../components/ExportModal.jsx';
import UploadHistory from '../components/UploadHistory.jsx';
import ChatBot from '../components/ChatBot';
import { useLanguage } from '../App';
import { Download } from 'lucide-react';

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
  const [showUserDataForm, setShowUserDataForm] = useState(false);

  useEffect(() => {
    fetchTaxonomyData().then(setTaxonomyData);
    fetchPipelineSteps().then(setPipelineSteps);
    fetchBiodiversityLocations().then(setBiodiversityLocations);
    fetchSampleAnalysisResults().then(setSampleAnalysisResults);
    fetchPhylogeneticData().then(setPhyloData);
    fetchBiodiversityMetric().then(setBiodiversityMetric);
  }, []);

  const exportData = {
    taxonomyData,
    pipelineSteps,
    biodiversityLocations,
    fastaFileName: fastaFile ? fastaFile.name : null,
    history
  };

  const handleHistoryAdd = (entry) => {
    setHistory(prev => [entry, ...prev]);
  };

  const handleUserDataSubmit = (data) => {
    // Here you would typically send the data to your backend
    console.log('User data submitted:', data);
    // For now, we'll just log it to the console
  };

  if (showUserDataForm) {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative">
        <Navbar onUserDataClick={() => setShowUserDataForm(false)} />
        <UserDataForm 
          onBack={() => setShowUserDataForm(false)} 
          onSubmit={handleUserDataSubmit}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Navbar onUserDataClick={() => setShowUserDataForm(true)} />
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
      </motion.main>
      <VisualizationPanel
        taxonomyData={taxonomyData}
        phyloData={phyloData}
        biodiversityMetric={biodiversityMetric}
        biodiversityLocations={biodiversityLocations}
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
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} data={exportData} />
      <div className="fixed bottom-0 right-0 z-[101]">
        <ChatBot />
      </div>
    </div>
  );
};



export default ResearcherDashboard;