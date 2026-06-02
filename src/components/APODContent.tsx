import React from 'react';
import { APOD } from '../types';
import { motion } from 'framer-motion';

interface APODContentProps {
  data: APOD | null;
  isLoading: boolean;
}

export function APODContent({ data, isLoading }: APODContentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/90 text-lg">Loading today's astronomy picture...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/90 text-lg">Unable to load APOD data. Please try again later.</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white/90">{data.title}</h2>
        <p className="text-white/60 text-sm">Date: {data.date}</p>
      </div>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black/30">
        {data.media_type === 'image' ? (
          <img
            src={data.hdurl || data.url}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : data.media_type === 'video' ? (
          <iframe
            src={data.url}
            title={data.title}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/90">
            Unsupported media type
          </div>
        )}
      </div>
      <div className="bg-black/30 rounded-lg p-4">
        <p className="text-white/80 leading-relaxed">{data.explanation}</p>
      </div>
    </motion.div>
  );
}