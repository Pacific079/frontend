// components/UserDataForm.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const UserDataForm = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    alert('User data submitted successfully!');
    onBack();
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-cyan-300 hover:text-cyan-200"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-cyan-300 mb-6">Add User Data</h2>

        <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-xl">
          <div className="mb-4">
            <label className="block text-cyan-200 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 rounded-lg text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-cyan-200 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-slate-700 rounded-lg text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-cyan-200 mb-2">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 rounded-lg text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-cyan-200 mb-2">Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full p-3 bg-slate-700 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-cyan-200 mb-2">Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full p-3 bg-slate-700 rounded-lg text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 rounded-lg text-white font-bold hover:bg-cyan-400"
          >
            Submit Data
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default UserDataForm;