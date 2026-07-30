import React from 'react';
import { motion } from 'motion/react';
import { Target } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 glass-card flex items-center justify-center mb-6">
          <Target className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Habit Tracker</h1>
        <p className="text-white/60 mt-2">Master your routine</p>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex gap-1">
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-2 bg-white rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-2 h-2 bg-white/60 rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-2 h-2 bg-white/30 rounded-full" 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
