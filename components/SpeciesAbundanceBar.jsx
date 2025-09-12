// components/SpeciesAbundanceBar.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

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

export default SpeciesAbundanceBar;