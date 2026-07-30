export type Frequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  title: string;
  icon: string;
  goal: number;
  unit: string;
  frequency: Frequency;
  completedDates: string[]; // ISO dates
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  reminderTime?: string; // HH:mm format
  createdAt: string;
}

export interface User {
  name: string;
  avatar?: string;
  isFirstLaunch: boolean;
}

export interface HabitState {
  habits: Habit[];
  user: User | null;
}
