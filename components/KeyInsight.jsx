// components/KeyInsight.jsx
import React from 'react';

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

export default KeyInsight;