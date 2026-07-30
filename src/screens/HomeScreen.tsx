import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHabits } from '../context/HabitContext';
import { Plus, Bell, CheckCircle2 } from 'lucide-react';
import HabitCard from '../widgets/HabitCard';
import DashboardStatsCard from '../widgets/DashboardStatsCard';
import WeeklyProgressChart from '../widgets/WeeklyProgressChart';
import { format } from 'date-fns';
import { fadeIn, slideUp, bounceButton } from '../theme/animations';
import { getUserDisplayName } from '../utils/user';

interface HomeScreenProps {
  onAddHabit: () => void;
  onHabitClick: (id: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onAddHabit, onHabitClick }) => {
  const { user, habits, getDailyProgress } = useHabits();
  const today = new Date();
  const progress = getDailyProgress(today);
  
  const avgStreak = habits.length > 0 
    ? Math.round(habits.reduce((acc, h) => acc + h.currentStreak, 0) / habits.length)
    : 0;

  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="h-full w-full flex flex-col pb-24 overflow-y-auto no-scrollbar"
    >
      {/* Header */}
      <motion.div 
        variants={slideUp}
        className="p-8 flex justify-between items-start"
      >
        <div>
          <h4 className="text-[var(--text-secondary)] font-medium">{format(today, 'EEEE, MMM d')}</h4>
          <h2 className="text-2xl font-bold mt-1">Hello, {getUserDisplayName(user)}!</h2>
        </div>
        <motion.button 
          {...bounceButton}
          className="w-10 h-10 glass-card flex items-center justify-center"
        >
          <Bell className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        variants={slideUp}
        className="px-8"
      >
        <DashboardStatsCard 
          completionRate={progress}
          currentStreak={avgStreak}
          totalHabits={habits.length}
        />
      </motion.div>

      {/* Weekly Chart */}
      <AnimatePresence>
        {habits.length > 0 && (
          <motion.div 
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-8"
          >
            <WeeklyProgressChart habits={habits} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Habits List */}
      <div className="px-8 flex-1">
        <motion.div 
          variants={slideUp}
          className="flex justify-between items-center mb-4"
        >
          <h3 className="text-lg font-bold">Today's Habits</h3>
          <motion.button 
            {...bounceButton}
            onClick={onAddHabit}
            className="text-sm font-medium text-[var(--accent-color)] flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add New
          </motion.button>
        </motion.div>

        {habits.length === 0 ? (
          <motion.div 
            variants={slideUp}
            className="glass-card p-12 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-[var(--accent-color)]" />
            </div>
            <h4 className="text-xl font-bold mb-2">No habits yet</h4>
            <p className="text-[var(--text-secondary)] mb-8">
              Start building your first habit and master your routine!
            </p>
            <motion.button 
              {...bounceButton}
              onClick={onAddHabit}
              className="glass-button bg-[var(--accent-color)] text-white border-none px-8"
            >
              Create First Habit
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {habits.map((habit, index) => (
                <motion.div 
                  key={habit.id} 
                  layout
                  onClick={() => onHabitClick(habit.id)}
                >
                  <HabitCard habit={habit} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        {...bounceButton}
        onClick={onAddHabit}
        className="fixed bottom-28 right-8 w-14 h-14 bg-[var(--accent-color)] text-white rounded-full shadow-2xl flex items-center justify-center z-50"
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </motion.div>
  );
};

export default HomeScreen;
