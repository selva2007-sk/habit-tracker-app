import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Habit } from '../types';
import { useHabits } from '../context/HabitContext';
import { Check, Flame, Trophy } from 'lucide-react';
import { format } from 'date-fns';
import * as Icons from 'lucide-react';
import { bounceButton, slideUp } from '../theme/animations';

interface HabitCardProps {
  habit: Habit;
  index: number;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, index }) => {
  const { toggleHabitCompletion } = useHabits();
  const today = new Date();
  const dateStr = format(today, 'yyyy-MM-dd');
  const isCompleted = habit.completedDates.includes(dateStr);

  const IconComponent = (Icons as any)[habit.icon] || Icons.Activity;

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`glass-card p-4 flex items-center justify-between transition-all duration-500 relative overflow-hidden ${
        isCompleted ? 'bg-white/20 border-()/30' : 'bg-white/10'
      }`}
    >
      {/* Ripple/Glow Effect when completed */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-()/5 blur-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 flex-1 relative z-10">
        <div className="relative">
          <motion.div 
            animate={{ 
              backgroundColor: isCompleted ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.1)',
              color: isCompleted ? 'var(--accent-color)' : 'white'
            }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500"
          >
            <IconComponent className="w-7 h-7" />
          </motion.div>
          
          {habit.currentStreak > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-lg border border-white/20"
            >
              <Flame className="w-2.5 h-2.5 fill-current" />
              {habit.currentStreak}
            </motion.div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <motion.h4 
            animate={{ opacity: isCompleted ? 0.6 : 1 }}
            className={`font-bold text-lg truncate ${isCompleted ? 'line-through' : ''}`}
          >
            {habit.title}
          </motion.h4>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <div className="flex items-center gap-1.5">
              <Flame className={`w-3.5 h-3.5 ${habit.currentStreak > 0 ? 'text-orange-400' : 'text-white/20'}`} />
              <span className="text-xs font-medium text-()">
                Streak: <span className="text-()">{habit.currentStreak}d</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy className={`w-3.5 h-3.5 ${habit.longestStreak > 0 ? 'text-yellow-400' : 'text-white/20'}`} />
              <span className="text-xs font-medium text-()">
                Best: <span className="text-()">{habit.longestStreak}d</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        {...bounceButton}
        onClick={(e) => {
          e.stopPropagation();
          toggleHabitCompletion(habit.id, today);
        }}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 ml-4 relative z-10 ${
          isCompleted 
            ? 'bg-() text-white shadow-lg shadow-()/40' 
            : 'bg-white/5 border-2 border-white/10 text-white/20 hover:border-white/30 hover:bg-white/10'
        }`}
      >
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <Check className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default HabitCard;

