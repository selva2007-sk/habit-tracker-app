import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useHabits } from '../context/HabitContext';
import { ArrowRight, Target } from 'lucide-react';
import { fadeIn, slideUp, bounceButton, scaleIn } from '../theme/animations';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [fullName, setFullName] = useState('');
  const { login } = useHabits();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim()) {
      login(fullName.trim());
      onLogin();
    }
  };

  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="h-full w-full flex flex-col p-8 justify-center"
    >
      <motion.div
        variants={scaleIn}
        className="glass-card p-8 shadow-2xl shadow-black/20"
      >
        <div className="w-16 h-16 bg-[var(--accent-color)]/20 rounded-2xl flex items-center justify-center mb-6">
          <Target className="w-8 h-8 text-[var(--accent-color)]" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-[var(--text-secondary)] mb-8">Enter your full name to continue your journey.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="glass-input w-full pl-4 pr-4 focus:border-[var(--accent-color)]/50 transition-all"
              required
            />
          </div>

          <motion.button
            {...bounceButton}
            type="submit"
            className="glass-button w-full flex items-center justify-center gap-2 bg-[var(--accent-color)] text-white border-none shadow-lg shadow-[var(--accent-color)]/20"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </motion.div>
      
      <p className="text-center text-[var(--text-secondary)] mt-8 text-xs opacity-50">
        By continuing, you agree to our Terms & Privacy.
      </p>
    </motion.div>
  );
};

export default LoginScreen;
