'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '@/lib/activities';
import { formatDuration, getCategoryGradient, getCostEmoji, getDifficultyEmoji, getTimeEmoji } from '@/lib/dealer';
import { MapPin, Clock } from 'lucide-react';

interface GameCardProps {
  activity: Activity;
  isFlipped: boolean;
  // All other props are removed as the parent `CardHand` will now handle interactions.
}
const CardFront = () => (
    <motion.div
        key="front"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        exit={{ rotateY: -180 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full mystery-card-front flex flex-col items-center justify-center p-4 text-center"
        style={{ backfaceVisibility: 'hidden' }}
    >
        <div className="text-5xl mb-4">🎴</div>
        <h3 className="text-xl font-bold text-white mb-2">Mystery Adventure</h3>
        <p className="text-sm text-slate-300">Click to reveal</p>
    </motion.div>
);

const CardBack = ({ activity }: { activity: Activity }) => (
    <motion.div
        key="back"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        exit={{ rotateY: -180 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full revealed-card-back flex flex-col"
        style={{ background: getCategoryGradient(activity.category), backfaceVisibility: 'hidden' }}
    >
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex justify-between items-start mb-3">
                <span className="text-3xl">{activity.emoji}</span>
                <div className="flex flex-col gap-1.5 text-xs font-medium items-end">
                    <span className="bg-black/20 rounded-full px-2 py-0.5">{getTimeEmoji(activity.bestTime)}</span>
                    <span className="bg-black/20 rounded-full px-2 py-0.5">{getDifficultyEmoji(activity.difficulty)}</span>
                    <span className="bg-black/20 rounded-full px-2 py-0.5">{getCostEmoji(activity.cost)}</span>
                </div>
            </div>
            <h3 className="text-lg font-bold leading-tight mb-2">{activity.title}</h3>
            <div className="text-sm opacity-90 space-y-1.5 mb-3">
                <div className="flex items-center gap-2"><MapPin size={14} /> <span>{activity.location}</span></div>
                <div className="flex items-center gap-2"><Clock size={14} /> <span>{formatDuration(activity.duration)}</span></div>
            </div>
            <p className="text-sm opacity-95 leading-relaxed flex-1 overflow-y-auto scrollbar-hide mb-3">
                {activity.description}
            </p>
            <div className="local-secret">
                <h3>💡 Local Secret</h3>
                <p>{activity.localSecret}</p>
            </div>
        </div>
    </motion.div>
);

export function GameCard({ activity, isFlipped }: GameCardProps) {
  return (
    <div className="game-card" style={{ perspective: 1000 }}>
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence initial={false}>
            {isFlipped ? <CardBack activity={activity} /> : <CardFront />}
        </AnimatePresence>
      </div>
    </div>
  );
}
