import React from 'react';
import { motion } from 'motion/react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Reusable Gradient Button with glassmorphism styling.
 */
const GradientButton: React.FC<GradientButtonProps> = ({ children, onClick, className = '', disabled }) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.4)' } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        px-6 py-4 rounded-2xl font-bold text-white
        bg-white/30 backdrop-blur-md
        border border-white/20 shadow-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GradientButton;
