import React from 'react';
import { motion } from 'motion/react';
import { Flame, Target, CheckCircle2 } from 'lucide-react';

interface DashboardStatsCardProps {
  completionRate: number;
  currentStreak: number;
  totalHabits: number;
}

const DashboardStatsCard: React.FC<DashboardStatsCardProps> = ({ 
  completionRate, 
  currentStreak, 
  totalHabits 
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 flex flex-col items-center text-center"
      >
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
          <Target className="w-5 h-5 text-blue-400" />
        </div>
        <p className="text-[10px] uppercase tracking-wider text-()">Goal</p>
        <p className="text-lg font-bold">{completionRate}%</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 flex flex-col items-center text-center"
      >
        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-2">
          <Flame className="w-5 h-5 text-orange-400" />
        </div>
        <p className="text-[10px] uppercase tracking-wider text-()">Streak</p>
        <p className="text-lg font-bold">{currentStreak}d</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4 flex flex-col items-center text-center"
      >
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
        <p className="text-[10px] uppercase tracking-wider text-()">Total</p>
        <p className="text-lg font-bold">{totalHabits}</p>
      </motion.div>
    </div>
  );
};

export default DashboardStatsCard;
