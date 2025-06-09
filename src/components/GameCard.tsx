'use client';

import React from 'react';
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
          "relative w-64 h-80 cursor-pointer",
          !canSelect && "cursor-default",
          isSelected && "z-10"
        )}
        onClick={canSelect ? onSelect : undefined}
        onMouseEnter={() => canSelect && !isFlipped && onHover(true)}
        onMouseLeave={() => onHover(false)}
        role={canSelect ? "button" : "img"}
        tabIndex={canSelect ? 0 : -1}
        aria-label={
          canSelect
            ? `Select mystery adventure card ${activity.id}`
            : isFlipped
              ? `${activity.title} in ${activity.location}. Duration: ${activity.duration}. ${activity.description}`
              : "Mystery adventure card"
        }
        onKeyDown={(e) => {
          if (canSelect && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect();
          }
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        animate={{
          scale: isSelected ? 1.15 : 1,
          y: isSelected ? -20 : 0,
          rotateY: isFlipped ? 180 : 0,
          zIndex: isSelected ? 10 : 1
        }}
        transition={{
          scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          y: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          rotateY: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
          zIndex: { duration: 0 }
        }}
        whileHover={canSelect && !isFlipped ? {
          scale: 1.05,
          y: -8,
          transition: { duration: 0.2 }
        } : {}}
      >
        {/* Card Front (Mystery Side) */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl border-2 p-6 card-glow",
            "bg-gradient-to-br from-slate-800 to-slate-900",
            "border-slate-700 shadow-2xl",
            "focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900",
            isHovered && "shadow-purple-500/30 border-purple-500/50",
            isSelected && "border-yellow-400/70 shadow-yellow-400/30"
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          <div className="flex flex-col items-center justify-center h-full text-center relative">
            {isSelected && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-500/10 rounded-lg"
              />
            )}
            <motion.div
              className="text-6xl mb-4"
              animate={isSelected ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              🎲
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">
              {isSelected ? "✨ Chosen!" : "Mystery Adventure"}
            </h3>
            <p className="text-slate-300 text-sm relative z-10">
              {isSelected ? "Revealing your discovery..." : "Click to reveal your Dungarvan discovery"}
            </p>
            <div className="absolute bottom-4 left-4 right-4">
              <motion.div
                className={cn(
                  "h-1 rounded-full",
                  isSelected
                    ? "bg-gradient-to-r from-yellow-400 to-purple-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 opacity-60"
                )}
                animate={isSelected ? {
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.05, 1]
                } : {}}
                transition={{ duration: 1, repeat: isSelected ? Infinity : 0 }}
              />
            </div>
          </div>
        </div>

        {/* Card Back (Activity Details) */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl border-2 p-6",
            "bg-gradient-to-br",
            getCategoryColor(activity.category),
            "border-white/20 shadow-2xl text-white",
            "focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2"
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
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
