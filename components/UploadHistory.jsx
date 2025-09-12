// components/UploadHistory.jsx
import React from 'react';

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

export default UploadHistory;