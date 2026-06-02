import React from 'react';
import { motion } from 'framer-motion';

interface SpaceCardProps {
  title: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export function SpaceCard({ title, icon, isSelected, onClick }: SpaceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl backdrop-blur-md transition-all duration-300 ${
        isSelected
          ? 'bg-white/20 border border-white/40 shadow-lg shadow-white/10'
          : 'bg-white/10 border border-white/5 hover:bg-white/15 hover:border-white/20'
      }`}
    >
      <motion.div
        initial={false}
        animate={isSelected ? {
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4"
      >
        <div className={`text-white/90 transition-colors ${isSelected ? 'text-blue-400' : ''}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white/90">{title}</h3>
      </motion.div>
    </motion.div>
  );
}