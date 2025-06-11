'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '@/lib/activities';
import { formatDuration, getCategoryGradient, getCostEmoji, getDifficultyEmoji, getTimeEmoji } from '@/lib/dealer';
import { MapPin, Clock, Zap, Lightbulb } from 'lucide-react';

interface GameCardProps {
  activity: Activity;
  isFlipped: boolean;
  onFlipComplete?: () => void;
}
const CardFront = () => (
    <motion.div
      key="front" exit={{ rotateY: -180 }} animate={{ rotateY: 0 }} initial={{ rotateY: 180 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="absolute inset-0 w-full h-full bg-card border border-border flex flex-col items-center justify-center p-4 text-center rounded-[var(--radius)]"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[var(--radius)]">
          <div className="shine-effect" />
      </div>
      <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">🎴</div>
      <h3 className="text-xl font-bold text-white mb-2 z-10">Mystery Adventure</h3>
      <p className="text-sm text-slate-300 z-10">Click to reveal</p>
      <style jsx>{`
        .shine-effect {
          position: absolute;
          top: -110%;
          left: -210%;
          width: 200%;
          height: 200%;
          opacity: 0;
          transform: rotate(30deg);
          background: linear-gradient(to right, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.13) 77%, rgba(255, 255, 255, 0.5) 92%, rgba(255, 255, 255, 0.0) 100%);
          transition: opacity 0.4s ease-in-out;
        }
        .group:hover .shine-effect {
          opacity: 1;
          left: -30%;
          transition-property: left, top, opacity;
          transition-duration: 0.7s, 0.7s, 0.15s;
          transition-timing-function: ease-in-out;
        }
      `}</style>
    </motion.div>
);

const CardBack = ({ activity, onFlipComplete }: { activity: Activity, onFlipComplete?: () => void }) => (
    <motion.div
        key="back" exit={{ rotateY: -180 }} animate={{ rotateY: 0 }} initial={{ rotateY: 180 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onAnimationComplete={onFlipComplete}
        className="absolute inset-0 w-full h-full revealed-card-back"
        style={{ backfaceVisibility: 'hidden' }}
    >
        <div
            className="w-full h-full flex flex-col revealed-card-content text-white"
            style={{ '--gradient': getCategoryGradient(activity.category) } as React.CSSProperties}
        >
            <div className="flex justify-between items-start mb-3">
                <span className="text-4xl drop-shadow-lg">{activity.emoji}</span>
                <div className="flex flex-col gap-1.5 text-xs font-semibold items-end">
                    <span className="bg-black/25 rounded-full px-2.5 py-1 capitalize">{activity.category}</span>
                    <span className="bg-black/25 rounded-full px-2.5 py-1">{getTimeEmoji(activity.bestTime)}</span>
                </div>
            </div>
            <h3 className="text-xl font-bold leading-tight mb-2" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>{activity.title}</h3>
            <div className="text-sm opacity-90 space-y-1.5 mb-3 font-medium">
                <div className="flex items-center gap-2"><MapPin size={14} /> <span>{activity.location}</span></div>
                <div className="flex items-center gap-2"><Clock size={14} /> <span>{formatDuration(activity.duration)}</span></div>
            </div>
            <p className="text-[15px] opacity-95 leading-snug flex-1 overflow-y-auto scrollbar-hide my-3">
                {activity.description}
            </p>
            <div className="local-secret">
                <h3><Lightbulb size={14}/> Local Secret</h3>
                <p>{activity.localSecret}</p>
            </div>
        </div>
    </motion.div>
);

export function GameCard({ activity, isFlipped, onFlipComplete }: GameCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current?.style.setProperty('--x', `${x}px`);
      cardRef.current?.style.setProperty('--y', `${y}px`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className="game-card group"
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      <AnimatePresence initial={false}>
          {isFlipped ? <CardBack activity={activity} onFlipComplete={onFlipComplete} /> : <CardFront />}
      </AnimatePresence>
    </motion.div>
  );
}
