import React from 'react';
import { motion } from 'motion/react';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
      {/* Animated Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [-50, 50, -50],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-30"
        style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)' }}
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
          x: [50, -50, 50],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-20"
        style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)' }}
      />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
