import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useHabits } from '../context/HabitContext';
import { ArrowLeft, Check, User, Camera, Tag } from 'lucide-react';
import { fadeIn, slideUp, bounceButton } from '../theme/animations';

interface EditProfileScreenProps {
  onBack: () => void;
}

const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ruby',
];

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack }) => {
  const { user, updateProfile } = useHabits();
  const [name, setName] = useState(user?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || AVATARS[0]);

  const handleSave = () => {
    updateProfile({ name, avatar: selectedAvatar });
    onBack();
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
        <h2 className="text-2xl font-bold">Edit Profile</h2>
      </motion.div>

      <div className="space-y-8">
        {/* Avatar Selection */}
        <motion.div variants={slideUp} className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[var(--accent-color)] bg-white/10">
              <img 
                src={selectedAvatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--accent-color)] rounded-full flex items-center justify-center border-2 border-[var(--background-color)]">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full no-scrollbar justify-center">
            {AVATARS.map((avatar, i) => (
              <motion.button
                key={i}
                {...bounceButton}
                onClick={() => setSelectedAvatar(avatar)}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                  selectedAvatar === avatar ? 'border-[var(--accent-color)] scale-110' : 'border-transparent opacity-50'
                }`}
              >
                <img src={avatar} alt={`Avatar ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Form Fields */}
        <div className="space-y-6">
          <motion.div variants={slideUp} className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
              <Tag className="w-4 h-4" /> Display Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input w-full focus:border-[var(--accent-color)]/50 transition-all"
            />
          </motion.div>

        </div>

        <motion.button
          variants={slideUp}
          {...bounceButton}
          onClick={handleSave}
          className="glass-button w-full flex items-center justify-center gap-2 bg-[var(--accent-color)] text-white border-none py-4 mt-8 shadow-xl shadow-[var(--accent-color)]/20"
        >
          <Check className="w-5 h-5" /> Save Changes
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EditProfileScreen;
