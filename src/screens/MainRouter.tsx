import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useHabits } from '../context/HabitContext';
import GradientBackground from '../components/GradientBackground';
import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import AddHabitScreen from './AddHabitScreen';
import HabitDetailScreen from './HabitDetailScreen';
import BottomNavBar from '../widgets/BottomNavBar';

type Screen = 'splash' | 'welcome' | 'login' | 'home' | 'calendar' | 'profile' | 'edit_profile' | 'add_habit' | 'edit_habit' | 'habit_detail';

const MainRouter: React.FC = () => {
  const { user } = useHabits();
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        if (!user) {
          setCurrentScreen('welcome');
        } else {
          setCurrentScreen('home');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, currentScreen]);

  const navigate = (screen: Screen, habitId?: string) => {
    if (habitId) setSelectedHabitId(habitId);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen />;
      case 'welcome': return <WelcomeScreen onComplete={() => navigate('login')} />;
      case 'login': return <LoginScreen onLogin={() => navigate('home')} />;
      case 'home': return (
        <HomeScreen 
          onAddHabit={() => navigate('add_habit')} 
          onHabitClick={(id) => navigate('habit_detail', id)}
        />
      );
      case 'calendar': return <CalendarScreen />;
      case 'profile': return <ProfileScreen onLogout={() => navigate('login')} onEditProfile={() => navigate('edit_profile')} />;
      case 'edit_profile': return <EditProfileScreen onBack={() => navigate('profile')} />;
      case 'add_habit': return <AddHabitScreen onBack={() => navigate('home')} />;
      case 'edit_habit': return <AddHabitScreen habitId={selectedHabitId || ''} onBack={() => navigate('habit_detail', selectedHabitId || '')} />;
      case 'habit_detail': return (
        <HabitDetailScreen 
          habitId={selectedHabitId || ''} 
          onBack={() => navigate('home')} 
          onEdit={() => navigate('edit_habit')}
        />
      );
      default: return <HomeScreen onAddHabit={() => navigate('add_habit')} onHabitClick={(id) => navigate('habit_detail', id)} />;
    }
  };

  const showNavBar = ['home', 'calendar', 'profile'].includes(currentScreen);

  return (
    <GradientBackground>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {showNavBar && (
        <BottomNavBar 
          currentScreen={currentScreen} 
          onNavigate={(s) => navigate(s as Screen)} 
        />
      )}
    </GradientBackground>
  );
};

export default MainRouter;
