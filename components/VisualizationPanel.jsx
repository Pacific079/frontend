// components/VisualizationPanel.jsx
import React, { useState } from 'react';
// import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import WorldMap from './WorldMap';
import ChartExportModal from './ExportModal';

const VisualizationPanel = ({
  taxonomyData,
  phyloData,
  biodiversityMetric,
  biodiversityLocations
}) => {
  const [activeTab, setActiveTab] = useState('taxonomy');
  const [exportModal, setExportModal] = useState({ open: false, data: null, columns: null, name: '' });

  const tabConfig = {
    taxonomy: {
      label: 'Taxonomic Classification',
      graph: (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={taxonomyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#22d3ee" />
            <YAxis stroke="#22d3ee" />
            <Tooltip />
            <Bar dataKey="value" fill="#22d3ee" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      ),
      data: taxonomyData,
      columns: ['name', 'value'],
    },
    phylo: {
      label: 'Phylogenetic Analysis',
      graph: (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={phyloData} dataKey="value" nameKey="group" cx="50%" cy="50%" outerRadius={80} label>
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
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={biodiversityMetric}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" stroke="#22d3ee" />
            <YAxis stroke="#22d3ee" />
            <Tooltip />
            <Bar dataKey="metric" fill="#22d3ee" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      ),
      data: biodiversityMetric,
      columns: ['location', 'metric'],
    },
  };

  const current = tabConfig[activeTab];

  return (
    <div className="flex gap-8 mx-8 mb-8">
      {/* Charts left */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-slate-800/50 rounded-xl p-6">
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
            <button
              onClick={() => setExportModal({ open: true, data: current.data, columns: current.columns, name: current.label.replace(/\s/g, '_') })}
              className="px-4 py-2 bg-cyan-500 rounded font-bold text-white hover:bg-cyan-400"
            >
              Export
            </button>
          </div>
          <div className="w-full">{current.graph}</div>
        </div>
      </div>
      {/* Map right */}
      <div className="flex-1 min-w-[350px] max-w-[500px]">
        <WorldMap biodiversityLocations={biodiversityLocations} />
      </div>
      <ChartExportModal
        open={exportModal.open}
        onClose={() => setExportModal({ ...exportModal, open: false })}
        data={exportModal.data}
        columns={exportModal.columns}
        name={exportModal.name}
      />
    </div>
  );
};

export default VisualizationPanel;