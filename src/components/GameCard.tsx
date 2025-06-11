'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/lib/activities';
import { formatDuration, getTimeEmoji, getDifficultyEmoji, getCostEmoji } from '@/lib/dealer';
import { cn } from '@/lib/utils';

interface GameCardProps {
  activity: Activity;
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
  // Show activity details when flipped (either selected or revealed)
  const showActivityDetails = isFlipped;
  const [isSecretExpanded, setIsSecretExpanded] = React.useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
  return (
    <motion.div
      initial={{
        y: 30,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
      className="relative transform-gpu"
    >
      <motion.div
        className={cn(
          "game-card cursor-pointer focus-ring relative",
          !canSelect && "cursor-default",
          isSelected && "z-30",
          canSelect && "hover:z-20"
        )}
        style={{
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
        onClick={canSelect ? onSelect : undefined}
        onMouseEnter={() => canSelect && !showActivityDetails && onHover(true)}
        onMouseLeave={() => onHover(false)}
        role={canSelect ? "button" : "img"}
        tabIndex={canSelect ? 0 : -1}
        aria-label={
          canSelect
            ? `Select mystery adventure card ${activity.id}`
            : showActivityDetails
              ? `${activity.title} in ${activity.location}. Duration: ${activity.duration}. ${activity.description}`
              : "Mystery adventure card"
        }
        onKeyDown={(e) => {
          if (canSelect && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect();
          }
        }}
        animate={{
          scale: isSelected ? 1.0 : 1,
          opacity: isSelected ? 1 : (isFlipped && !isSelected) ? 0.85 : 1
        }}
        whileTap={canSelect ? {
          scale: 0.98,
          transition: { duration: 0.1 }
        } : {}}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >


        {/* Enhanced glow for selected card */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)',
              filter: 'blur(8px)',
              transform: 'scale(1.1)'
            }}
          />
        )}

        {/* Conditional rendering based on flip state */}
        {!showActivityDetails ? (
          /* Card Front (Mystery Side) */
          <div className="mystery-card-wrapper relative">
            <div
              className={cn(
                "mystery-card-premium absolute inset-0 rounded-xl",
                "transition-all duration-300 ease-out relative z-10",
                isHovered && !isSelected && "shadow-elegant-hover",
                isSelected && "shadow-elegant-selected",
                !isHovered && !isSelected && "shadow-elegant"
              )}
              style={{
                padding: 'var(--spacing-sm)'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center relative">
                <div className="mb-4 relative z-10">
                  {isSelected ? (
                    <div className="text-4xl">✨</div>
                  ) : (
                    <div className="text-4xl">🎲</div>
                  )}
                </div>

                <h3 className="text-xl text-white mb-4 relative z-10 font-bold">
                  {isSelected ? "✨ Chosen!" : "Mystery Adventure"}
                </h3>

                <p className="text-sm text-slate-200 relative z-10 text-center font-medium">
                  {isSelected ? (
                    "Revealing your discovery..."
                  ) : (
                    "Click to reveal your Dungarvan discovery"
                  )}
                </p>

                {/* Simple progress indicator */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className={cn(
                    "h-1 rounded-full",
                    isSelected
                      ? "bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 opacity-60"
                  )} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Card Back (Activity Details) */
          <div
            className={cn(
              "revealed-card-glass absolute inset-0 rounded-xl",
              "text-white",
              "transition-all duration-300"
            )}
            style={{
              padding: 'var(--spacing-sm)',
              overflow: 'hidden'
            }}
          >
            <div className="flex flex-col h-full relative">
              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3"
                   style={{
                     scrollbarWidth: 'none',
                     msOverflowStyle: 'none'
                   }}>

                {/* Header */}
                <motion.div
                  className="flex items-start justify-between mb-3 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="text-2xl">
                    {activity.emoji}
                  </div>
                  <div className="flex gap-1 flex-wrap ml-2">
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                      {getTimeEmoji(activity.bestTime)}
                    </span>
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                      {getDifficultyEmoji(activity.difficulty)}
                    </span>
                    {activity.cost && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                          activity.cost === 'free'
                            ? 'bg-green-500/40 text-green-100'
                            : 'bg-white/20 text-white'
                        }`}>
                        {getCostEmoji(activity.cost)}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-lg font-bold mb-3 leading-tight relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {activity.title}
                </motion.h3>

                {/* Location & Duration */}
                <motion.div
                  className="text-sm opacity-90 mb-3 space-y-2 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <span>📍</span>
                    <span className="font-medium truncate">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <span>⏱️</span>
                    <span className="font-medium">{formatDuration(activity.duration)}</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="mb-3 relative z-10 flex-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <p
                    className={cn(
                      "text-sm opacity-95 break-words leading-relaxed",
                      !isDescriptionExpanded && "line-clamp-3"
                    )}
                  >
                    {activity.description}
                  </p>
                  {activity.description.length > 120 && !isDescriptionExpanded && (
                    <button
                      className="text-sm text-white/60 hover:text-white/80 mt-2"
                      onClick={() => setIsDescriptionExpanded(true)}
                    >
                      Read more...
                    </button>
                  )}
                </motion.div>

                {/* Local Secret */}
                <motion.div
                  className="local-secret-premium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  onClick={() => setIsSecretExpanded(!isSecretExpanded)}
                >
                  <div className="local-secret-content">
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-600 text-sm">💡</span>
                      <div className="flex-1">
                        <div className="local-secret-title">
                          Local Secret
                        </div>
                        <p
                          className={cn(
                            "local-secret-text",
                            !isSecretExpanded && "line-clamp-2"
                          )}
                        >
                          {activity.localSecret}
                        </p>
                        {!isSecretExpanded && activity.localSecret.length > 80 && (
                          <div className="text-xs text-amber-700 mt-1">
                            Tap to expand...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
