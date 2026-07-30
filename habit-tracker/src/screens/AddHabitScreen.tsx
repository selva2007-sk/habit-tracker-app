import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHabits } from '../context/HabitContext';
import { ArrowLeft, Check, Activity, Book, Coffee, Dumbbell, Heart, Moon, Music, Pencil, Smile, Sun, Clock } from 'lucide-react';
import { Frequency } from '../types';
import { bounceButton, slideUp, fadeIn } from '../theme/animations';

interface AddHabitScreenProps {
  onBack: () => void;
  habitId?: string;
}

const ICONS = [
  { name: 'Activity', icon: Activity },
  { name: 'Book', icon: Book },
  { name: 'Coffee', icon: Coffee },
  { name: 'Dumbbell', icon: Dumbbell },
  { name: 'Heart', icon: Heart },
  { name: 'Moon', icon: Moon },
  { name: 'Music', icon: Music },
  { name: 'Pencil', icon: Pencil },
  { name: 'Smile', icon: Smile },
  { name: 'Sun', icon: Sun },
];

const AddHabitScreen: React.FC<AddHabitScreenProps> = ({ onBack, habitId }) => {
  const { habits, addHabit, updateHabit } = useHabits();
  const existingHabit = habitId ? habits.find(h => h.id === habitId) : null;

  const [title, setTitle] = useState(existingHabit?.title || '');
  const [selectedIcon, setSelectedIcon] = useState(existingHabit?.icon || 'Activity');
  const [goal, setGoal] = useState(existingHabit?.goal || 1);
  const [unit, setUnit] = useState(existingHabit?.unit || 'times');
  const [frequency, setFrequency] = useState<Frequency>(existingHabit?.frequency || 'daily');
  const [reminderTime, setReminderTime] = useState(existingHabit?.reminderTime || '08:00');

  const handleSave = () => {
    if (title.trim()) {
      const habitData = {
        title,
        icon: selectedIcon,
        goal,
        unit,
        frequency,
        reminderTime,
      };

      if (existingHabit) {
        updateHabit(existingHabit.id, habitData);
      } else {
        addHabit(habitData);
      }
      onBack();
    }
  };

  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="h-full w-full flex flex-col p-8 overflow-y-auto no-scrollbar"
    >
      <motion.div variants={slideUp} className="flex items-center gap-4 mb-8">
        <motion.button 
          {...bounceButton}
          onClick={onBack} 
          className="w-10 h-10 glass-card flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <h2 className="text-2xl font-bold">{existingHabit ? 'Edit Habit' : 'New Habit'}</h2>
      </motion.div>

      <div className="space-y-8">
        {/* Title Input */}
        <motion.div variants={slideUp} className="space-y-2">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Habit Title</label>
          <input
            type="text"
            placeholder="e.g. Read for 30 mins"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="glass-input w-full focus:border-[var(--accent-color)]/50 transition-all"
          />
        </motion.div>

        {/* Icon Selection */}
        <motion.div variants={slideUp} className="space-y-3">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Choose Icon</label>
          <div className="grid grid-cols-5 gap-3">
            {ICONS.map((item) => (
              <motion.button
                key={item.name}
                {...bounceButton}
                onClick={() => setSelectedIcon(item.name)}
                className={`w-full aspect-square glass-card flex items-center justify-center transition-all ${
                  selectedIcon === item.name 
                    ? 'bg-[var(--accent-color)] text-white scale-110 border-none shadow-lg shadow-[var(--accent-color)]/30' 
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                <item.icon className="w-6 h-6" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Goal Slider */}
        <motion.div variants={slideUp} className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Daily Goal</label>
            <motion.span 
              key={goal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-lg font-bold text-[var(--accent-color)]"
            >
              {goal} {unit}
            </motion.span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={goal}
            onChange={(e) => setGoal(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
          />
          <div className="flex gap-2">
            {['times', 'mins', 'km', 'cups'].map(u => (
              <motion.button 
                key={u}
                {...bounceButton}
                onClick={() => setUnit(u)}
                className={`flex-1 py-1 text-[10px] uppercase tracking-wider rounded-lg border transition-all ${
                  unit === u 
                    ? 'bg-[var(--accent-color)]/20 border-[var(--accent-color)]/50 text-[var(--accent-color)]' 
                    : 'border-white/10 text-[var(--text-secondary)]'
                }`}
              >
                {u}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Reminder Time */}
        <motion.div variants={slideUp} className="space-y-3">
          <label className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
            <Clock className="w-4 h-4" /> Reminder Time
          </label>
          <input 
            type="time" 
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="glass-input w-full"
          />
        </motion.div>

        {/* Frequency */}
        <motion.div variants={slideUp} className="space-y-3">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Frequency</label>
          <div className="flex gap-4">
            {['daily', 'weekly'].map((f) => (
              <motion.button
                key={f}
                {...bounceButton}
                onClick={() => setFrequency(f as Frequency)}
                className={`flex-1 py-3 rounded-xl border transition-all capitalize font-semibold ${
                  frequency === f 
                    ? 'bg-[var(--accent-color)] text-white border-none shadow-lg shadow-[var(--accent-color)]/30' 
                    : 'bg-white/5 border-white/10 text-[var(--text-secondary)]'
                }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.button
          variants={slideUp}
          {...bounceButton}
          onClick={handleSave}
          disabled={!title.trim()}
          className="glass-button w-full flex items-center justify-center gap-2 bg-[var(--accent-color)] text-white border-none py-4 mt-8 disabled:opacity-50 shadow-xl shadow-[var(--accent-color)]/20"
        >
          <Check className="w-5 h-5" /> Save Habit
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AddHabitScreen;

