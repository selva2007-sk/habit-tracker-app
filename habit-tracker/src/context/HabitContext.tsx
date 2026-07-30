import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, User } from '../types';
import { format, isSameDay, parseISO, subDays } from 'date-fns';

interface HabitContextType {
  habits: Habit[];
  user: User | null;
  addHabit: (habit: Omit<Habit, 'id' | 'completedDates' | 'currentStreak' | 'longestStreak' | 'createdAt' | 'totalCompletions'>) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  removeHabit: (id: string) => void;
  toggleHabitCompletion: (habitId: string, date: Date) => void;
  login: (name: string) => void;
  logout: () => void;
  completeFirstLaunch: () => void;
  updateProfile: (data: { name?: string; avatar?: string }) => void;
  getDailyProgress: (date: Date) => number;
  isCompletedToday: (habit: Habit) => boolean;
  getCompletionRate: (habit: Habit) => number;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

/**
 * HabitProvider manages the global state for habits and user data.
 * It handles local storage persistence and streak calculations.
 */
export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Load data from LocalStorage on app start (equivalent to SharedPreferences)
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    const savedUser = localStorage.getItem('user');

    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Persist habits to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Persist user data to LocalStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (name: string) => {
    setUser({ name, isFirstLaunch: false });
  };

  const logout = () => {
    setUser(null);
    setHabits([]);
    localStorage.clear();
  };

  const completeFirstLaunch = () => {
    if (user) {
      setUser({ ...user, isFirstLaunch: false });
    }
  };

  const updateProfile = (data: { name?: string; avatar?: string }) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const updateHabit = (id: string, habitData: Partial<Habit>) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...habitData } : h));
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'completedDates' | 'currentStreak' | 'longestStreak' | 'totalCompletions' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
      totalCompletions: 0,
    };
    setHabits([...habits, newHabit]);
  };

  /**
   * Calculates the current streak by checking consecutive days backwards from today.
   */
  const calculateStreak = (completedDates: string[]) => {
    if (completedDates.length === 0) return 0;
    
    // Sort dates descending
    const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const yesterdayStr = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    
    // If not completed today or yesterday, streak is broken
    if (!completedDates.includes(todayStr) && !completedDates.includes(yesterdayStr)) {
      return 0;
    }

    let streak = 0;
    let checkDate = completedDates.includes(todayStr) ? new Date() : subDays(new Date(), 1);

    while (true) {
      const dateStr = format(checkDate, 'yyyy-MM-dd');
      if (completedDates.includes(dateStr)) {
        streak++;
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }
    return streak;
  };

  /**
   * Toggles a habit's completion for a specific date and updates streaks.
   */
  const removeHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const toggleHabitCompletion = (habitId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setHabits(prevHabits => prevHabits.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(dateStr);
        const newCompletedDates = isCompleted
          ? habit.completedDates.filter(d => d !== dateStr)
          : [...habit.completedDates, dateStr];
        
        const currentStreak = calculateStreak(newCompletedDates);
        const longestStreak = Math.max(habit.longestStreak, currentStreak);
        const totalCompletions = newCompletedDates.length;
        
        return { 
          ...habit, 
          completedDates: newCompletedDates, 
          currentStreak, 
          longestStreak,
          totalCompletions
        };
      }
      return habit;
    }));
  };

  const getDailyProgress = (date: Date) => {
    if (habits.length === 0) return 0;
    const dateStr = format(date, 'yyyy-MM-dd');
    const completedCount = habits.filter(h => h.completedDates.includes(dateStr)).length;
    return Math.round((completedCount / habits.length) * 100);
  };

  const isCompletedToday = (habit: Habit) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return habit.completedDates.includes(today);
  };

  const getCompletionRate = (habit: Habit) => {
    if (habit.totalCompletions === 0) return 0;
    const daysSinceCreated = Math.max(1, Math.floor((new Date().getTime() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
    return Math.min(100, Math.round((habit.totalCompletions / daysSinceCreated) * 100));
  };

  return (
    <HabitContext.Provider value={{ 
      habits, 
      user, 
      addHabit, 
      updateHabit,
      removeHabit, 
      toggleHabitCompletion, 
      login, 
      logout, 
      completeFirstLaunch,
      updateProfile,
      getDailyProgress,
      isCompletedToday,
      getCompletionRate
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
