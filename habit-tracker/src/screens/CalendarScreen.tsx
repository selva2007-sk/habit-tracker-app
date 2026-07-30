import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHabits } from '../context/HabitContext';
import { ChevronLeft, ChevronRight, Check, Calendar as CalendarIcon } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { fadeIn, slideUp, bounceButton, scaleIn } from '../theme/animations';

const CalendarScreen: React.FC = () => {
  const { habits } = useHabits();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getCompletionForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return habits.filter(h => h.completedDates.includes(dateStr));
  };

  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="h-full w-full flex flex-col p-8 pb-24 overflow-y-auto no-scrollbar"
    >
      <motion.h2 variants={slideUp} className="text-2xl font-bold mb-8">History</motion.h2>

      <motion.div variants={slideUp} className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">{format(currentMonth, 'MMMM yyyy')}</h3>
          <div className="flex gap-2">
            <motion.button 
              {...bounceButton}
              onClick={prevMonth} 
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button 
              {...bounceButton}
              onClick={nextMonth} 
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={`${day}-${i}`} className="text-center text-xs font-bold text-()">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, i) => {
            const completions = getCompletionForDay(day);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());
            const progress = habits.length > 0 ? completions.length / habits.length : 0;

            return (
              <div
                key={i}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg relative transition-all ${
                  !isCurrentMonth ? 'opacity-20' : 'opacity-100'
                } ${isToday ? 'border border-()/50' : ''}`}
              >
                <span className={`text-xs z-10 ${isToday ? 'text-() font-bold' : ''}`}>
                  {format(day, 'd')}
                </span>
                {progress > 0 && isCurrentMonth && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-1 rounded-md bg-()/20"
                    style={{ opacity: progress }}
                  />
                )}
                {progress === 1 && isCurrentMonth && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-() rounded-full flex items-center justify-center">
                    <Check className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={slideUp} className="mt-8 space-y-4">
        <h3 className="text-lg font-bold">Monthly Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <p className="text-() text-[10px] uppercase tracking-wider font-bold">Total Done</p>
            <p className="text-2xl font-bold mt-1 text-()">
              {habits.reduce((acc, h) => acc + h.completedDates.filter(d => isSameMonth(new Date(d), currentMonth)).length, 0)}
            </p>
          </div>
          <div className="glass-card p-4">
            <p className="text-() text-[10px] uppercase tracking-wider font-bold">Avg Progress</p>
            <p className="text-2xl font-bold mt-1 text-()">
              {Math.round(calendarDays.reduce((acc, day) => acc + (getCompletionForDay(day).length / (habits.length || 1)), 0) / calendarDays.length * 100)}%
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarScreen;
