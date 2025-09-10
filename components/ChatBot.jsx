import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you with marine biology research today?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: input, sender: 'user' }
    ]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "This is a demo bot. Your question will be answered soon!",
          sender: "bot"
        }
      ]);
    }, 1200);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/40 z-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat bot"
      >
        <AnimatePresence>
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="fixed bottom-32 right-8 w-full max-w-sm h-[60vh] bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-cyan-400/30 z-50"
          >
            <header className="p-4 bg-slate-900 font-bold text-lg text-cyan-300 border-b border-slate-700">Aqua-Genix ChatBot</header>
            <div className="flex-1 p-4 overflow-y-auto">
              <AnimatePresence>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <p className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-200'}`}>{msg.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-700 bg-slate-900/60">
              <div className="flex items-center bg-slate-900 rounded-lg">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent p-3 outline-none text-white"
                />
                <button onClick={handleSend} className="p-3 text-cyan-400 hover:text-cyan-300"><Send /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;