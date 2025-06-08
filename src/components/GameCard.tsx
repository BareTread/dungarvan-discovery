'use client';

import { motion } from 'framer-motion';
import { Activity } from '@/lib/activities';
import { getCategoryColor, formatDuration, getTimeEmoji, getDifficultyEmoji } from '@/lib/dealer';
import { cn } from '@/lib/utils';

interface GameCardProps {
  activity: Activity;
  index: number;
  isFlipped: boolean;
  isSelected: boolean;
  isHovered: boolean;
  canSelect: boolean;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
  delay?: number;
}

export function GameCard({
  activity,
  isFlipped,
  isSelected,
  isHovered,
  canSelect,
  onSelect,
  onHover,
  delay = 0
}: GameCardProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="relative"
    >
      <motion.div
        className={cn(
          "relative w-64 h-80 cursor-pointer card-flip",
          isFlipped && "flipped",
          !canSelect && "cursor-default"
        )}
        onClick={canSelect ? onSelect : undefined}
        onMouseEnter={() => canSelect && onHover(true)}
        onMouseLeave={() => onHover(false)}
        whileHover={canSelect ? { 
          scale: 1.05, 
          y: -8,
          transition: { duration: 0.2 }
        } : {}}
        animate={{
          scale: isSelected ? 1.1 : 1,
          y: isSelected ? -16 : 0,
          transition: { duration: 0.3 }
        }}
      >
        {/* Card Front (Mystery Side) */}
        <div className={cn(
          "card-face rounded-xl border-2 p-6 card-glow",
          "bg-gradient-to-br from-slate-800 to-slate-900",
          "border-slate-700 shadow-2xl",
          isHovered && "shadow-purple-500/20"
        )}>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">🎲</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Mystery Adventure
            </h3>
            <p className="text-slate-300 text-sm">
              Click to reveal your<br />Dungarvan discovery
            </p>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60" />
            </div>
          </div>
        </div>

        {/* Card Back (Activity Details) */}
        <div className={cn(
          "card-face card-back rounded-xl border-2 p-6",
          "bg-gradient-to-br",
          getCategoryColor(activity.category),
          "border-white/20 shadow-2xl text-white"
        )}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{activity.emoji}</div>
              <div className="flex gap-1">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {getTimeEmoji(activity.bestTime)}
                </span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {getDifficultyEmoji(activity.difficulty)}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 leading-tight">
              {activity.title}
            </h3>

            {/* Location & Duration */}
            <div className="text-sm opacity-90 mb-3">
              <div className="flex items-center gap-1 mb-1">
                <span>📍</span>
                <span>{activity.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{formatDuration(activity.duration)}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-4 flex-grow">
              {activity.description}
            </p>

            {/* Local Secret */}
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <span className="text-yellow-300 text-sm">💡</span>
                <div>
                  <div className="text-xs font-semibold text-yellow-300 mb-1">
                    Local Secret
                  </div>
                  <p className="text-xs leading-relaxed">
                    {activity.localSecret}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
