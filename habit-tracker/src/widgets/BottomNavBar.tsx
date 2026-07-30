import React from 'react';
import { Home, Calendar, User, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 z-40">
      <div className="max-w-md mx-auto glass-card flex justify-around items-center p-2">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          const Icon = tab.icon as LucideIcon;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-col items-center p-3 transition-all"
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-white/40'}`}>
                <Icon size={24} />
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
