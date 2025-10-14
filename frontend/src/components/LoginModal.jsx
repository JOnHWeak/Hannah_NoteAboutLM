import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    let response;
    if (isLoginView) {
      response = await login(email, password);
    } else {
      response = await signup(email, password, name);
    }
    setIsLoading(false);
    if (response.success) {
      onClose();
    } else {
      setError(response.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-xl p-8 w-full max-w-md mx-4 border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">{isLoginView ? 'Đăng nhập' : 'Đăng ký'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
            {!isLoginView && (
              <div className="mb-4 relative">
                <User className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <div className="mb-4 relative">
              <Mail className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6 relative">
              <Lock className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginView ? 'Đăng nhập' : 'Đăng ký')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            {isLoginView ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError('');
              }}
              className="text-blue-400 hover:underline ml-1 font-semibold"
            >
              {isLoginView ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;

