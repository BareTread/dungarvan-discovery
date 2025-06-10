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
          "relative cursor-pointer focus-ring",
          "w-36 h-52 sm:w-40 sm:h-60 md:w-44 md:h-64 lg:w-48 lg:h-72",
          !canSelect && "cursor-default",
          isSelected && "z-10 game-card-selected",
          canSelect && "hover:z-20",
          !showActivityDetails && "card-stack"
        )}
        style={{
          width: 'var(--card-width-md)',
          height: 'var(--card-height-md)'
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
          scale: isSelected ? 1.02 : (isFlipped && !isSelected) ? 0.95 : 1,
          y: isSelected ? -8 : 0,
          opacity: isSelected ? 1 : (isFlipped && !isSelected) ? 0.8 : 1
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
      >


        {/* Simple glow for selected card */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(168, 85, 247, 0.06) 50%, rgba(236, 72, 153, 0.08) 100%)',
            }}
          />
        )}

        {/* Conditional rendering based on flip state */}
        {!showActivityDetails ? (
          /* Card Front (Mystery Side) */
          <div className="mystery-card-wrapper">
            {/* Card stack shadows */}
            <div className="mystery-card-shadow-1"></div>
            <div className="mystery-card-shadow-2"></div>

            <div
              className={cn(
                "mystery-card absolute inset-0 rounded-xl border-2 card-glow",
                "backdrop-blur-sm",
                "transition-all duration-500 ease-out",
                isHovered && !isSelected && "shadow-elegant-hover border-purple-500/60",
                isSelected && "shadow-elegant-selected border-yellow-400/80",
                !isHovered && !isSelected && "shadow-elegant"
              )}
              style={{
                padding: 'var(--spacing-card-padding)'
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
              padding: 'var(--spacing-card-padding)'
            }}
          >
            <div className="flex flex-col h-full relative overflow-hidden">
              {/* Scrollable content area with enhanced spacing */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide"
                   style={{
                     scrollbarWidth: 'none',
                     msOverflowStyle: 'none',
                     gap: 'var(--spacing-section-gap)'
                   }}>
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                     radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                  }} />
                </div>

                {/* Compact Header */}
                <motion.div
                  className="flex items-start justify-between mb-2 sm:mb-3 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">
                    {activity.emoji}
                  </div>
                  <div className="flex gap-1 sm:gap-1.5 flex-wrap">
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

                {/* Enhanced Title */}
                <motion.h3
                  className="text-card-title-enhanced font-bold relative z-10 line-clamp-2"
                  style={{ marginBottom: 'var(--spacing-section-gap)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {activity.title}
                </motion.h3>

                {/* Enhanced Location & Duration */}
                <motion.div
                  className="text-card-meta-enhanced relative z-10"
                  style={{
                    marginBottom: 'var(--spacing-section-gap)',
                    gap: 'var(--spacing-card-gap)'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="info-section-enhanced card-section flex items-center gap-2 mb-2">
                    <span className="info-icon icon-location text-base transition-transform duration-300">📍</span>
                    <span className="font-semibold text-card-meta-enhanced truncate text-white">{activity.location}</span>
                  </div>
                  <div className="info-section-enhanced card-section flex items-center gap-2">
                    <span className="info-icon icon-clock text-base transition-transform duration-300">⏱️</span>
                    <span className="font-semibold text-card-meta-enhanced text-white">{formatDuration(activity.duration)}</span>
                  </div>
                </motion.div>

                {/* Enhanced Description with expand/collapse */}
                <motion.div
                  className="relative z-10"
                  style={{ marginBottom: 'var(--spacing-section-gap)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.p
                    className={cn(
                      "text-card-body-enhanced cursor-pointer",
                      !isDescriptionExpanded && "line-clamp-3"
                    )}
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  >
                    {activity.description}
                  </motion.p>
                  {activity.description.length > 120 && !isDescriptionExpanded && (
                    <button
                      className="text-card-meta-enhanced text-white/70 hover:text-white/90 mt-2 font-medium transition-colors duration-200"
                      onClick={() => setIsDescriptionExpanded(true)}
                    >
                      Read more...
                    </button>
                  )}
                </motion.div>

                {/* Enhanced Local Secret with Premium Design */}
                <motion.div
                  className="local-secret-premium cursor-pointer hover:scale-[1.01] transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  onClick={() => setIsSecretExpanded(!isSecretExpanded)}
                >
                  {/* Animated golden border */}
                  <div className="local-secret-border"></div>

                  {/* Content container */}
                  <div className="local-secret-content">
                    <div className="flex items-start" style={{ gap: 'var(--spacing-card-gap)' }}>
                      <span className="text-amber-400 text-lg mt-1 flex-shrink-0">
                        💡
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="local-secret-title">
                            Local Secret
                          </div>
                          <span
                            className="text-amber-400/70 text-sm flex-shrink-0 transition-transform duration-300"
                            style={{ transform: isSecretExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            ▼
                          </span>
                        </div>
                        <p
                          className={cn(
                            "local-secret-text transition-opacity duration-300",
                            !isSecretExpanded && "line-clamp-2"
                          )}
                          style={{
                            opacity: isSecretExpanded ? 1 : 0.92
                          }}
                        >
                          {activity.localSecret}
                        </p>
                        {!isSecretExpanded && activity.localSecret.length > 80 && (
                          <div className="local-secret-title mt-2">
                            Tap to reveal more...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-lg" />
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
