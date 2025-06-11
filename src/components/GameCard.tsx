'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '@/lib/activities';
import { formatDuration, getCategoryGradient, getTimeEmoji } from '@/lib/dealer';
import { MapPin, Clock, Lightbulb } from 'lucide-react';

interface GameCardProps {
  activity: Activity;
  isFlipped: boolean;
  onFlipComplete?: () => void;
}
const CardFront = () => (
    <motion.div
      key="front" exit={{ rotateY: -180 }} animate={{ rotateY: 0 }} initial={{ rotateY: 180 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 w-full h-full bg-card border border-border flex flex-col items-center justify-center p-4 text-center rounded-[var(--radius)]"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[var(--radius)]">
          <div className="shine-effect" />
      </div>
      <div className="text-6xl sm:text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300 ease-out">🎴</div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 z-10">Mystery Adventure</h3>
      <p className="text-sm sm:text-base text-slate-300 z-10 px-2">Click to reveal your card</p>
      <style jsx>{`
        .shine-effect {
          position: absolute;
          top: -150%;
          left: -250%;
          width: 250%;
          height: 250%;
          opacity: 0;
          transform: rotate(30deg);
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.08) 30%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 70%, rgba(255, 255, 255, 0) 100%);
          transition: opacity 0.5s ease-in-out, left 0.8s ease-in-out, top 0.8s ease-in-out;
        }
        .group:hover .shine-effect {
          opacity: 0.7;
          left: -10%;
          top: -40%;
        }
      `}</style>
    </motion.div>
);

const CardBack = ({ activity, onFlipComplete }: { activity: Activity, onFlipComplete?: () => void }) => (
    <motion.div
        key="back" exit={{ rotateY: -180 }} animate={{ rotateY: 0 }} initial={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        onAnimationComplete={onFlipComplete}
        className="absolute inset-0 w-full h-full revealed-card-back"
        style={{ backfaceVisibility: 'hidden' }}
    >
        <div
            className="w-full h-full flex flex-col revealed-card-content text-white p-4 sm:p-5"
            style={{ '--gradient': getCategoryGradient(activity.category) } as React.CSSProperties}
        >
            <div className="flex justify-between items-start mb-3 sm:mb-4">
                <span className="text-4xl sm:text-5xl drop-shadow-lg">{activity.emoji}</span>
                <div className="flex flex-col gap-1.5 text-xs sm:text-sm font-semibold items-end">
                    <span className="bg-black/30 rounded-full px-3 py-1 capitalize shadow-md">{activity.category}</span>
                    <span className="bg-black/30 rounded-full px-3 py-1 shadow-md">{getTimeEmoji(activity.bestTime)}</span>
                </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold leading-tight mb-2 sm:mb-3" style={{textShadow: '0 1px 4px rgba(0,0,0,0.4)'}}>{activity.title}</h3>
            <div className="text-xs sm:text-sm opacity-90 space-y-1.5 mb-2 sm:mb-3 font-medium">
                <div className="flex items-center gap-2"><MapPin size={14} /> <span>{activity.location}</span></div>
                <div className="flex items-center gap-2"><Clock size={14} /> <span>{formatDuration(activity.duration)}</span></div>
            </div>
            <p className="text-sm sm:text-[15px] opacity-95 leading-relaxed flex-1 overflow-y-auto scrollbar-hide my-2 sm:my-3">
                {activity.description}
            </p>
            <div className="mt-auto p-3 sm:p-4 rounded-lg bg-white/10 backdrop-blur-sm border-t border-white/20">
                <h3 className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs sm:text-sm text-yellow-300 mb-1">
                    <Lightbulb size={14}/> Local Secret
                </h3>
                <p className="text-xs sm:text-sm font-medium leading-snug text-yellow-100">{activity.localSecret}</p>
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
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      whileTap={{ scale: 0.97, transition: { duration: 0.15, ease: "easeOut" } }}
    >
      <AnimatePresence initial={false}>
          {isFlipped ? <CardBack activity={activity} onFlipComplete={onFlipComplete} /> : <CardFront />}
      </AnimatePresence>
    </motion.div>
  );
}
