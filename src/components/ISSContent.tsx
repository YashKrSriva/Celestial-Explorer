import React from 'react';
import { ISSLocation } from '../types';
import { motion } from 'framer-motion';
import { Compass, Ruler, Gauge } from 'lucide-react';

interface ISSContentProps {
  data: ISSLocation | null;
  isLoading: boolean;
}

export function ISSContent({ data, isLoading }: ISSContentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white/90 text-lg"
        >
          Tracking ISS location...
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/90 text-lg">Unable to track ISS. Please try again later.</div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white/90">International Space Station Location</h2>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-emerald-400 text-sm font-medium px-3 py-1 bg-emerald-400/10 rounded-full"
        >
          Live Tracking
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          variants={item}
          className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Compass className="text-blue-400" size={20} />
            <h3 className="text-white/60 font-medium">Coordinates</h3>
          </div>
          <div className="space-y-2">
            <p className="text-white/90">
              Lat: <span className="font-mono">{data.latitude.toFixed(4)}°</span>
            </p>
            <p className="text-white/90">
              Long: <span className="font-mono">{data.longitude.toFixed(4)}°</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Ruler className="text-purple-400" size={20} />
            <h3 className="text-white/60 font-medium">Altitude</h3>
          </div>
          <p className="text-3xl font-bold text-white/90 font-mono">
            {data.altitude.toFixed(2)}
            <span className="text-lg ml-1 text-white/60">km</span>
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Gauge className="text-orange-400" size={20} />
            <h3 className="text-white/60 font-medium">Velocity</h3>
          </div>
          <p className="text-3xl font-bold text-white/90 font-mono">
            {data.velocity.toFixed(2)}
            <span className="text-lg ml-1 text-white/60">km/h</span>
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={item}
        className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/5"
      >
        <p className="text-white/80 text-sm">
          Last updated: {new Date(data.timestamp * 1000).toLocaleTimeString()}
        </p>
      </motion.div>
    </motion.div>
  );
}