import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope } from 'lucide-react';
import { useLanguage } from '../App';

const WaveHeader = () => (
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
    <svg className="relative block w-[calc(100%+1.3px)] h-[150px] sm:h-[250px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current text-cyan-500/30"></path>
      <path d="M0,27.35A600.21,600.21,0,0,0,321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0Z" className="fill-current text-blue-600/40 animate-pulse"></path>
    </svg>
  </div>
);

const glassVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 18 } },
  exit: { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.3 } }
};

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    // Replace with backend API call for real authentication
    if (
      (isSignup && form.name && form.email && form.password) ||
      (!isSignup && form.email && form.password)
    ) {
      navigate('/researcher/dashboard');
    } else {
      setError('Please fill all required fields');
    }
  };

  const handleGoogleAuth = () => {
    // TODO: Integrate Google OAuth
    alert('Google authentication not implemented in demo.');
  };

  const handleAppleAuth = () => {
    // TODO: Integrate Apple OAuth
    alert('Apple authentication not implemented in demo.');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    alert('Forgot password flow not implemented in demo.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      <WaveHeader />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        style={{
          background: 'radial-gradient(circle at 70% 30%, #22d3ee 0%, transparent 70%), radial-gradient(circle at 20% 80%, #2563eb 0%, transparent 70%)'
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignup ? 'signup' : 'login'}
          variants={glassVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-400/20 p-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
            className="flex flex-col items-center mb-8"
          >
            <Microscope className="w-16 h-16 text-cyan-400 mb-2 drop-shadow-lg" />
            <h1 className="text-4xl font-bold text-cyan-300 mb-1 tracking-tight">Aqua-Genix</h1>
            <p className="text-base text-cyan-100">Unveiling the Mysteries of the Deep</p>
          </motion.div>
          <h2 className="text-2xl font-semibold mb-6 text-center text-white drop-shadow">
            {isSignup ? 'Sign Up as Researcher' : 'Sign In as Researcher'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {isSignup && (
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-cyan-200 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  required
                />
              )}
            </AnimatePresence>
            <motion.input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-cyan-200 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              required
            />
            <motion.input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-cyan-200 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              required
            />
            <AnimatePresence>
              {error && (
                <motion.div
                  className="text-red-400 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            {!isSignup && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-cyan-300 underline text-sm hover:text-cyan-200 transition"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
            )}
            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-bold shadow-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300"
              whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #22d3ee55' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </motion.button>
          </form>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              className="w-full py-3 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg text-cyan-300 font-semibold shadow transition"
              onClick={handleGoogleAuth}
            >
              <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.93-6.93C36.61 2.36 30.7 0 24 0 14.61 0 6.13 5.74 1.67 14.1l8.06 6.27C12.13 13.13 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.09 24.59c0-1.56-.14-3.06-.39-4.51H24v9.06h12.41c-.54 2.91-2.17 5.38-4.62 7.04l7.19 5.59C43.89 37.13 46.09 31.36 46.09 24.59z"/><path fill="#FBBC05" d="M9.73 28.37c-.56-1.67-.88-3.44-.88-5.37s.32-3.7.88-5.37l-8.06-6.27C.64 14.61 0 19.16 0 24s.64 9.39 1.67 13.64l8.06-6.27z"/><path fill="#EA4335" d="M24 48c6.7 0 12.61-2.36 16.93-6.43l-7.19-5.59c-2.01 1.35-4.59 2.14-7.74 2.14-6.44 0-11.87-3.63-14.27-8.87l-8.06 6.27C6.13 42.26 14.61 48 24 48z"/></g></svg>
              {isSignup ? 'Sign Up with Google' : 'Sign In with Google'}
            </button>
            <button
              type="button"
              className="w-full py-3 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg text-cyan-300 font-semibold shadow transition"
              onClick={handleAppleAuth}
            >
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M16.365 1.43c0 1.14-.93 2.06-2.07 2.06-.03 0-.06 0-.09-.01-.02-.02-.03-.04-.03-.07 0-1.13.93-2.06 2.07-2.06.03 0 .06 0 .09.01.02.02.03.04.03.07zm4.42 16.36c-.18.41-.37.8-.57 1.18-.38.67-.77 1.32-1.23 1.92-.48.62-.98 1.23-1.62 1.23-.59 0-.82-.39-1.61-.39-.79 0-1.04.4-1.62.4-.65 0-1.13-.61-1.62-1.23-.46-.6-.85-1.25-1.23-1.92-.2-.38-.39-.77-.57-1.18-.38-.87-.68-1.78-.68-2.77 0-1.09.36-1.93 1.09-2.53.63-.52 1.53-.81 2.52-.81.56 0 1.09.09 1.57.27.48.18.89.44 1.22.77.73.6 1.09 1.44 1.09 2.53 0 .99-.3 1.9-.68 2.77z"/></svg>
              {isSignup ? 'Sign Up with Apple ID' : 'Sign In with Apple ID'}
            </button>
          </div>
          <div className="mt-6 text-center">
            <motion.button
              className="text-cyan-300 underline hover:text-cyan-200 transition"
              onClick={() => setIsSignup(!isSignup)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
