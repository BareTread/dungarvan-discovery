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
          "relative w-44 h-64 xs:w-48 xs:h-72 sm:w-52 sm:h-80 md:w-60 md:h-96 lg:w-64 lg:h-[26rem] cursor-pointer focus-ring",
          !canSelect && "cursor-default",
          isSelected && "z-30",
          canSelect && "hover:z-20",
          !showActivityDetails && "card-stack"
        )}
        style={{
          touchAction: 'manipulation', // Prevents double-tap zoom on mobile
          WebkitTapHighlightColor: 'transparent' // Removes default mobile tap highlight
        }}
        onClick={canSelect ? onSelect : undefined}
        onMouseEnter={() => canSelect && !showActivityDetails && onHover(true)}
        onMouseLeave={() => onHover(false)}
        onTouchStart={() => canSelect && !showActivityDetails && onHover(true)}
        onTouchEnd={() => onHover(false)}
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
          scale: isSelected ? 1.0 : (isFlipped && !isSelected) ? 0.95 : 1,
          y: isSelected ? 0 : 0,
          opacity: isSelected ? 1 : (isFlipped && !isSelected) ? 0.8 : 1
        }}
        whileTap={canSelect ? {
          scale: 0.98,
          transition: { duration: 0.1 }
        } : {}}
        transition={{
          duration: 0.3,
          ease: [0.175, 0.885, 0.32, 1.275]
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
            {/* Enhanced card stack shadows */}
            <div className="mystery-card-shadow-1"></div>
            <div className="mystery-card-shadow-2"></div>

            <div
              className={cn(
                "mystery-card-premium absolute inset-0 rounded-xl",
                "transition-all duration-500 ease-out relative z-10",
                isHovered && !isSelected && "shadow-elegant-hover transform scale-105",
                isSelected && "shadow-elegant-selected",
                !isHovered && !isSelected && "shadow-elegant"
              )}
              style={{
                padding: 'clamp(0.75rem, 3vw, 1.25rem)',
                background: 'linear-gradient(135deg, rgba(15, 12, 41, 0.98) 0%, rgba(45, 27, 105, 0.95) 50%, rgba(26, 26, 62, 0.98) 100%)',
                border: '2px solid',
                borderImage: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.6) 50%, rgba(59, 130, 246, 0.8) 100%) 1'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
                <div className="dice-container mb-2 sm:mb-3 md:mb-4 relative z-10">
                  {isSelected ? (
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">✨</div>
                  ) : (
                    <div className="dice dice-glow text-3xl sm:text-4xl md:text-5xl lg:text-6xl flex items-center justify-center">
                      🎲
                    </div>
                  )}
                </div>

                <h3
                  className="text-card-title-enhanced text-white mb-3 relative z-10 font-bold"
                  style={{
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {isSelected ? "✨ Chosen!" : "Mystery Adventure"}
                </h3>

                <p
                  className="text-card-meta-enhanced text-slate-200 relative z-10 px-1 sm:px-0 text-center font-medium"
                  style={{
                    textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {isSelected ? (
                    <span className="inline-flex items-center">
                      Revealing your discovery
                      <span className="loading-dots">
                        <span className="loading-dot"></span>
                        <span className="loading-dot"></span>
                        <span className="loading-dot"></span>
                      </span>
                    </span>
                  ) : (
                    "Click to reveal your Dungarvan discovery"
                  )}
                </p>

                {/* Simple progress indicator */}
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
                  <div className={cn(
                    "h-1 sm:h-1.5 rounded-full",
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
              "revealed-card-glass absolute inset-0 rounded-xl border-2",
              "text-white",
              "focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2",
              "transition-all duration-300"
            )}
            style={{
              padding: 'clamp(0.75rem, 3vw, 1rem)',
              overflow: 'hidden',
              maxHeight: '100%', // Ensure content doesn't overflow
              background: 'linear-gradient(135deg, rgba(0, 184, 217, 0.9) 0%, rgba(0, 119, 182, 0.9) 100%)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 184, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="flex flex-col h-full relative overflow-hidden">
              {/* Scrollable content area with improved spacing */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide space-y-1.5 sm:space-y-2 max-h-full"
                   style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                     radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                  }} />
                </div>

                {/* Compact Header */}
                <motion.div
                  className="flex items-start justify-between mb-1.5 sm:mb-2 relative z-10 flex-shrink-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">
                    {activity.emoji}
                  </div>
                  <div className="flex gap-1 flex-wrap flex-shrink-0 ml-2">
                    <span className="category-pill-modern text-responsive-xs text-white">
                      {getTimeEmoji(activity.bestTime)}
                    </span>
                    <span className="category-pill-modern text-responsive-xs text-white">
                      {getDifficultyEmoji(activity.difficulty)}
                    </span>
                    {activity.cost && (
                      <span className={`category-pill-modern text-responsive-xs ${
                          activity.cost === 'free'
                            ? 'bg-green-500/40 border-green-400/50 text-green-100'
                            : 'text-white'
                        }`}>
                        {getCostEmoji(activity.cost)}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Compact Title */}
                <motion.h3
                  className="text-xs sm:text-sm font-bold mb-1.5 leading-tight relative z-10 line-clamp-2 card-text-compact flex-shrink-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {activity.title}
                </motion.h3>

                {/* Compact Location & Duration */}
                <motion.div
                  className="text-xs opacity-90 mb-1.5 space-y-1 relative z-10 flex-shrink-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-md px-2 py-1 backdrop-blur-sm">
                    <span className="text-sm">📍</span>
                    <span className="font-medium text-xs card-text-tight truncate max-w-32 sm:max-w-40">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-md px-2 py-1 backdrop-blur-sm">
                    <span className="text-sm">⏱️</span>
                    <span className="font-medium text-xs card-text-tight">{formatDuration(activity.duration)}</span>
                  </div>
                </motion.div>

                {/* Compact Description with expand/collapse */}
                <motion.div
                  className="mb-1.5 sm:mb-2 relative z-10 flex-1 min-h-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.p
                    className={cn(
                      "text-xs card-text-compact opacity-95 cursor-pointer break-words",
                      !isDescriptionExpanded && "line-clamp-2"
                    )}
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  >
                    {activity.description}
                  </motion.p>
                  {activity.description.length > 80 && !isDescriptionExpanded && (
                    <motion.button
                      className="text-xs text-white/60 hover:text-white/80 mt-1 font-medium"
                      onClick={() => setIsDescriptionExpanded(true)}
                      whileHover={{ scale: 1.05 }}
                    >
                      Read more...
                    </motion.button>
                  )}
                </motion.div>

                {/* Compact Local Secret */}
                <motion.div
                  className="bg-gradient-to-r from-white/15 to-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20 relative overflow-hidden cursor-pointer flex-shrink-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  onClick={() => setIsSecretExpanded(!isSecretExpanded)}
                >
                  <div className="flex items-start gap-1.5">
                    <motion.span
                      className="text-yellow-300 text-sm mt-0.5 flex-shrink-0"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      💡
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-bold text-yellow-300 tracking-wide uppercase">
                          Local Secret
                        </div>
                        <motion.span
                          className="text-yellow-300/70 text-xs flex-shrink-0"
                          animate={{ rotate: isSecretExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▼
                        </motion.span>
                      </div>
                      <motion.p
                        className={cn(
                          "text-xs card-text-compact text-white/95 font-medium break-words",
                          !isSecretExpanded && "line-clamp-1"
                        )}
                        animate={{ opacity: isSecretExpanded ? 1 : 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activity.localSecret}
                      </motion.p>
                      {!isSecretExpanded && activity.localSecret.length > 50 && (
                        <motion.div
                          className="text-xs text-yellow-300/60 mt-0.5 font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Tap to expand...
                        </motion.div>
                      )}
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
