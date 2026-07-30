import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, User } from '../types';
import { format, subDays } from 'date-fns';

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

const HABITS_STORAGE_KEY = 'habits';
const USER_STORAGE_KEY = 'user';

const generateHabitId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `habit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const normalizeCompletedDates = (completedDates: string[] = []) =>
  Array.from(new Set(completedDates)).sort((a, b) => a.localeCompare(b));

const calculateStreak = (completedDates: string[]) => {
  if (completedDates.length === 0) return 0;

  const normalizedDates = normalizeCompletedDates(completedDates);
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const yesterday = subDays(today, 1);
  const yesterdayStr = format(yesterday, 'yyyy-MM-dd');

  if (!normalizedDates.includes(todayStr) && !normalizedDates.includes(yesterdayStr)) {
    return 0;
  }

  let streak = 0;
  let checkDate = normalizedDates.includes(todayStr) ? today : yesterday;

  while (true) {
    const dateStr = format(checkDate, 'yyyy-MM-dd');
    if (!normalizedDates.includes(dateStr)) {
      break;
    }

    streak += 1;
    checkDate = subDays(checkDate, 1);
  }

  return streak;
};

const normalizeHabit = (habit: Habit): Habit => {
  const completedDates = normalizeCompletedDates(habit.completedDates);
  const currentStreak = calculateStreak(completedDates);

  return {
    ...habit,
    completedDates,
    totalCompletions: completedDates.length,
    currentStreak,
    longestStreak: Math.max(habit.longestStreak, currentStreak),
  };
};

/**
 * HabitProvider manages the global state for habits and user data.
 * It handles local storage persistence and streak calculations.
 */
export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Load data from LocalStorage on app start (equivalent to SharedPreferences)
  useEffect(() => {
    const savedHabits = localStorage.getItem(HABITS_STORAGE_KEY);
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (savedHabits) {
      const parsedHabits = JSON.parse(savedHabits) as Habit[];
      setHabits(parsedHabits.map(normalizeHabit));
    }
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Persist habits to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  // Persist user data to LocalStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = (name: string) => {
    setUser({ name, isFirstLaunch: false });
  };

  const logout = () => {
    setUser(null);
    setHabits([]);
    localStorage.removeItem(HABITS_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
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
      id: generateHabitId(),
      createdAt: new Date().toISOString(),
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
      totalCompletions: 0,
    };
    setHabits([...habits, newHabit]);
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
        const newCompletedDates = normalizeCompletedDates(isCompleted
          ? habit.completedDates.filter(d => d !== dateStr)
          : [...habit.completedDates, dateStr]);
        
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
