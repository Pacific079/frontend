import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    // Replace with backend API call
    if (form.email && form.password) {
      // Simulate login/signup success
      navigate('/researcher/dashboard');
    } else {
      setError('Please enter email and password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
          {isSignup ? 'Sign Up' : 'Login'} as Researcher
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 text-white"
            required
          />
          {error && <div className="text-red-400">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-400 transition"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-cyan-300 underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;