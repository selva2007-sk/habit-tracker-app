import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Calendar, Target } from 'lucide-react';
import { fadeIn, slideUp, bounceButton, scaleIn } from '../theme/animations';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  return (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="h-full w-full flex flex-col p-8 justify-between"
    >
      <div className="mt-12">
        <motion.div variants={slideUp}>
          <div className="w-16 h-16 bg-[var(--accent-color)]/20 rounded-2xl flex items-center justify-center mb-8">
            <Target className="w-8 h-8 text-[var(--accent-color)]" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Build Better <br />
            <span className="text-[var(--accent-color)]">Habits Today.</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 text-lg">
            Track your progress, build streaks, and achieve your goals with ease.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6">
          {[
            { icon: <CheckCircle2 className="text-[var(--success-color)]" />, title: "Daily Tracking", desc: "Mark your habits as done daily." },
            { icon: <TrendingUp className="text-orange-400" />, title: "Streak System", desc: "Stay motivated with visual streaks." },
            { icon: <Calendar className="text-[var(--accent-color)]" />, title: "History View", desc: "See your journey in a calendar." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 glass-card flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        variants={slideUp}
        {...bounceButton}
        onClick={onComplete}
        className="glass-button w-full py-4 text-lg bg-[var(--accent-color)] text-white border-none shadow-xl shadow-[var(--accent-color)]/20 mb-8"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;
