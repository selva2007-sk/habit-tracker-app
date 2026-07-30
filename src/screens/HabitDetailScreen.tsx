import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Flame, Trophy, Calendar as CalendarIcon, Trash2, Edit2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import * as Icons from 'lucide-react';
import { format } from 'date-fns';
import ProgressCircle from '../widgets/ProgressCircle';
import { bounceButton, scaleIn, fadeIn } from '../theme/animations';

interface HabitDetailScreenProps {
  habitId: string;
  onBack: () => void;
  onEdit: () => void;
}

const HabitDetailScreen: React.FC<HabitDetailScreenProps> = ({ habitId, onBack, onEdit }) => {
  const { habits, toggleHabitCompletion, removeHabit } = useHabits();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const habit = habits.find(h => h.id === habitId);

  if (!habit) return null;

  const IconComponent = (Icons as any)[habit.icon] || Icons.Activity;
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const isCompletedToday = habit.completedDates.includes(todayStr);

  const completionRate = habit.totalCompletions > 0
    ? Math.round((habit.totalCompletions / Math.max(1, (new Date().getTime() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24))) * 100)
    : 0;

  const handleDelete = () => {
    removeHabit(habitId);
    onBack();
  };

  return (
    <div className="h-full w-full flex flex-col p-8 overflow-y-auto no-scrollbar relative">
      <div className="flex items-center justify-between mb-8">
        <motion.button
          {...bounceButton}
          onClick={onBack}
          className="w-10 h-10 glass-card flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <div className="flex gap-2">
          <motion.button
            {...bounceButton}
            onClick={onEdit}
            className="w-10 h-10 glass-card flex items-center justify-center text-[var(--accent-color)]"
          >
            <Edit2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            {...bounceButton}
            onClick={() => setShowDeleteConfirm(true)}
            className="w-10 h-10 glass-card flex items-center justify-center text-red-400"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center mb-10">
        <motion.div
          layoutId={`habit-icon-${habit.id}`}
          className="w-20 h-20 glass-card flex items-center justify-center mb-4 text-[var(--accent-color)]"
        >
          <IconComponent className="w-10 h-10" />
        </motion.div>
        <h2 className="text-3xl font-bold">{habit.title}</h2>
        <p className="text-[var(--text-secondary)] mt-1 capitalize">{habit.frequency} | {habit.goal} {habit.unit}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-card p-6 flex flex-col items-center">
          <Flame className="w-8 h-8 text-orange-400 mb-2" />
          <p className="text-2xl font-bold">{habit.currentStreak}</p>
          <p className="text-xs text-[var(--text-secondary)] uppercase">Current Streak</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
          <p className="text-2xl font-bold">{habit.longestStreak}</p>
          <p className="text-xs text-[var(--text-secondary)] uppercase">Best Streak</p>
        </div>
      </div>

      <div className="glass-card p-6 mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Overall Progress</h3>
          <p className="text-sm text-[var(--text-secondary)]">Total completions: {habit.totalCompletions}</p>
        </div>
        <div className="w-16 h-16">
          <ProgressCircle percentage={Math.min(100, completionRate)} />
        </div>
      </div>

      <div className="glass-card p-6 mb-8">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-[var(--accent-color)]" />
          Recent History
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {Array.from({ length: 14 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (13 - i));
            const dStr = format(date, 'yyyy-MM-dd');
            const done = habit.completedDates.includes(dStr);

            return (
              <div key={i} className="flex flex-col items-center gap-2 min-w-[40px]">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${done ? 'bg-[var(--success-color)]/20 text-[var(--success-color)]' : 'bg-white/5 text-white/20'}`}>
                  {done && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <span className="text-[10px] text-[var(--text-secondary)]">{format(date, 'dd')}</span>
              </div>
            );
          })}
        </div>
      </div>

      <motion.button
        {...bounceButton}
        onClick={() => toggleHabitCompletion(habit.id, new Date())}
        className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
          isCompletedToday
            ? 'bg-[var(--success-color)]/20 text-[var(--success-color)] border border-[var(--success-color)]/30'
            : 'bg-white text-[var(--accent-color)] shadow-xl'
        }`}
      >
        {isCompletedToday ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Completed Today
          </>
        ) : (
          'Mark as Completed'
        )}
      </motion.button>

      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass-card p-8 w-full max-w-xs relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Delete Habit?</h3>
              <p className="text-[var(--text-secondary)] mb-8">
                Are you sure you want to delete this habit? This action cannot be undone.
              </p>
              <div className="flex flex-col w-full gap-3">
                <motion.button
                  {...bounceButton}
                  onClick={handleDelete}
                  className="w-full py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/30"
                >
                  Delete
                </motion.button>
                <motion.button
                  {...bounceButton}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full py-3 bg-white/5 text-white rounded-xl font-bold border border-white/10"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HabitDetailScreen;
