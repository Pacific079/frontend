// components/UploadBox.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';

const UploadBox = ({ onFileSelect, onHistoryAdd }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.fasta')) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert('Please select a valid FASTA file (.fasta)');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a .fasta file before uploading');
      return;
    }

    onFileSelect(selectedFile);

    // Simulate processing time (random 2–10 seconds)
    const processTime = Math.floor(Math.random() * 9) + 2;
    const now = new Date();
    onHistoryAdd({
      fileName: selectedFile.name,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      processTime: `${processTime} sec`
    });
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
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
      <h3 className="text-xl font-semibold text-cyan-300">
        Upload DNA Report (.fasta)
      </h3>
      <p className="text-slate-400 text-sm">
        Drag & drop files here or click to browse
      </p>

      {selectedFile && (
        <div className="mt-4 text-center">
          <div className="text-cyan-300 text-sm mb-2">
            Selected file:{' '}
            <span className="font-semibold">{selectedFile.name}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent box click from re-opening file dialog
              handleUpload();
            }}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-md transition-colors"
          >
            Upload
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default UploadBox;
