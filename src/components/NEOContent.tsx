import React from 'react';
import { NearEarthObject } from '../types';
import { motion } from 'framer-motion';
import { AlertTriangle, Ruler, Calendar, Gauge } from 'lucide-react';

interface NEOContentProps {
  data: NearEarthObject[] | null;
  isLoading: boolean;
}

export function NEOContent({ data, isLoading }: NEOContentProps) {
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
          Loading near-Earth objects data...
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/90 text-lg">Unable to load NEO data. Please try again later.</div>
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
        <h2 className="text-2xl font-bold text-white/90">Near Earth Objects</h2>
        <div className="text-white/60 text-sm">
          {new Date().toLocaleDateString(undefined, { 
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <div className="space-y-4">
        {data.map((neo) => (
          <motion.div
            key={neo.id}
            variants={item}
            className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-white/90">{neo.name.replace(/[()]/g, '')}</h3>
              </div>
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  neo.is_potentially_hazardous_asteroid
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {neo.is_potentially_hazardous_asteroid && (
                  <AlertTriangle size={16} className="animate-pulse" />
                )}
                <span>
                  {neo.is_potentially_hazardous_asteroid ? 'Potentially Hazardous' : 'Safe'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Ruler className="text-blue-400" size={20} />
                <div>
                  <p className="text-white/60 text-sm">Estimated Diameter</p>
                  <p className="text-white/90 font-mono">
                    {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {' '}
                    {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="text-purple-400" size={20} />
                <div>
                  <p className="text-white/60 text-sm">Close Approach</p>
                  <p className="text-white/90 font-mono">
                    {new Date(neo.close_approach_data[0]?.close_approach_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Gauge className="text-orange-400" size={20} />
                <div>
                  <p className="text-white/60 text-sm">Relative Velocity</p>
                  <p className="text-white/90 font-mono">
                    {parseInt(neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour).toLocaleString()} km/h
                  </p>
                </div>
              </div>
            </div>

            {neo.is_potentially_hazardous_asteroid && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-white/80 text-sm">
                  This asteroid is classified as potentially hazardous due to its size and proximity to Earth's orbit.
                  However, it poses no immediate threat to our planet.
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}