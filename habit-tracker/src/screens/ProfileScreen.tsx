import React from 'react';
import { motion } from 'motion/react';
import { useHabits } from '../context/HabitContext';
import { LogOut, User, Flame, Trophy, Settings, Shield, HelpCircle, Palette } from 'lucide-react';
import { useAppTheme } from '../theme/ThemeProvider';
import { themes } from '../theme/colors';
import { bounceButton } from '../theme/animations';

interface ProfileScreenProps {
  onLogout: () => void;
  onEditProfile: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, onEditProfile }) => {
  const { user, habits, logout } = useHabits();
  const { theme, setTheme } = useAppTheme();

  const totalStreaks = habits.reduce((acc, h) => acc + h.currentStreak, 0);
  const longestStreak = Math.max(...habits.map(h => h.longestStreak), 0);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="h-full w-full flex flex-col p-8 pb-24 overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Profile</h2>
        <motion.button
          {...bounceButton}
          onClick={onEditProfile}
          className="text-sm font-medium text-()"
        >
          Edit Profile
        </motion.button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 glass-card flex items-center justify-center mb-4 relative overflow-hidden">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <User className="w-12 h-12 text-() opacity-80" />
          )}
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-() rounded-full border-4 border-() flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        <h3 className="text-xl font-bold">{user?.name || 'Habit User'}</h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-card p-4 flex flex-col items-center">
          <Flame className="w-6 h-6 text-orange-400 mb-2" />
          <p className="text-2xl font-bold">{totalStreaks}</p>
          <p className="text-() text-xs uppercase">Total Streaks</p>
        </div>
        <div className="glass-card p-4 flex flex-col items-center">
          <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
          <p className="text-2xl font-bold">{longestStreak}</p>
          <p className="text-() text-xs uppercase">Best Streak</p>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="glass-card p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-5 h-5 text-()" />
          <h4 className="font-bold">App Theme</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(themes).map((t) => (
            <motion.button
              key={t.id}
              {...bounceButton}
              onClick={() => setTheme(t.id)}
              className={`p-3 rounded-xl border-2 transition-all text-left ${
                theme.id === t.id 
                  ? 'border-() bg-white/10' 
                  : 'border-transparent bg-white/5'
              }`}
            >
              <div 
                className="w-full h-2 rounded-full mb-2" 
                style={{ background: t.primaryGradient }}
              />
              <span className="text-xs font-semibold">{t.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Options */}
      <div className="glass-card overflow-hidden mb-8">
        {[
          { icon: <Settings className="w-5 h-5" />, label: "Settings" },
          { icon: <Shield className="w-5 h-5" />, label: "Privacy" },
          { icon: <HelpCircle className="w-5 h-5" />, label: "Help Center" },
        ].map((item, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-4 p-4 hover:bg-white/5 border-b border-white/5 last:border-0"
          >
            <div className="text-()">{item.icon}</div>
            <span className="flex-1 text-left font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="glass-button w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-200 mt-8 border-red-500/30"
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
      
      <p className="text-center text-white/20 mt-8 text-xs">
        Habit Tracker v2.0.0
      </p>
    </div>
  );
};

export default ProfileScreen;

