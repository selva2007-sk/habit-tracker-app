import React from 'react';
import { motion } from 'motion/react';

interface ProgressCircleProps {
  percentage: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke="white"
          strokeWidth="8"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
