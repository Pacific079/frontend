import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

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

export default ExportModal;