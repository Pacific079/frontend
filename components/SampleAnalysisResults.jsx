// components/SampleAnalysisResults.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../App';

const SampleAnalysisResults = ({ results }) => {
  const { t } = useLanguage();

  return (
    <motion.div
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

export default SampleAnalysisResults;