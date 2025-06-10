'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/lib/activities';
import { getCategoryColor, formatDuration, getTimeEmoji, getDifficultyEmoji, getCostEmoji } from '@/lib/dealer';
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
          isSelected && "z-10",
          canSelect && "hover:z-20"
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
          <div
            className={cn(
              "absolute inset-0 rounded-xl border-2 card-glow",
              "bg-gradient-to-br from-slate-800/95 via-slate-850/95 to-slate-900/95",
              "backdrop-blur-sm border-slate-700/80",
              "transition-all duration-500 ease-out",
              isHovered && !isSelected && "shadow-elegant-hover border-purple-500/60 bg-gradient-to-br from-slate-800/98 via-slate-850/98 to-slate-900/98",
              isSelected && "shadow-elegant-selected border-yellow-400/80 bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900",
              !isHovered && !isSelected && "shadow-elegant"
            )}
            style={{
              padding: 'var(--spacing-card-padding)'
            }}
          >
          <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden">


            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4 relative z-10">
              {isSelected ? "✨" : "🎲"}
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
              {isSelected ? "Revealing your discovery..." : "Click to reveal your Dungarvan discovery"}
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
        ) : (
          /* Card Back (Activity Details) */
          <div
            className={cn(
              "absolute inset-0 rounded-xl border-2 backdrop-blur-sm",
              "bg-gradient-to-br",
              getCategoryColor(activity.category),
              "border-white/30 card-depth-medium text-white",
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
                <span className="text-responsive-xs bg-white/30 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-white/40 font-semibold leading-tight text-white shadow-lg">
                  {getTimeEmoji(activity.bestTime)}
                </span>
                <span className="text-responsive-xs bg-white/30 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-white/40 font-semibold leading-tight text-white shadow-lg">
                  {getDifficultyEmoji(activity.difficulty)}
                </span>
                {activity.cost && (
                  <span className={`text-responsive-xs backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border font-semibold leading-tight shadow-lg ${
                      activity.cost === 'free'
                        ? 'bg-green-500/40 border-green-400/50 text-green-100'
                        : 'bg-white/30 border-white/40 text-white'
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
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm border border-white/30 mb-2 shadow-lg">
                <span className="text-base">📍</span>
                <span className="font-semibold text-card-meta-enhanced truncate text-white">{activity.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm border border-white/30 shadow-lg">
                <span className="text-base">⏱️</span>
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

            {/* Enhanced Local Secret */}
            <motion.div
              className="relative overflow-hidden cursor-pointer hover:scale-[1.01] transition-all duration-300"
              style={{
                padding: 'var(--spacing-card-padding)',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                color: '#1a1a1a'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onClick={() => setIsSecretExpanded(!isSecretExpanded)}
            >
              {/* Enhanced shimmer effect */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                  animation: 'shimmer 3s infinite',
                  transform: 'translateX(-100%)'
                }}
              />

              <div className="flex items-start relative z-10" style={{ gap: 'var(--spacing-card-gap)' }}>
                <span className="text-amber-900 text-lg mt-1 flex-shrink-0">
                  💡
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-card-meta-enhanced font-bold text-amber-900 tracking-wide uppercase">
                      Local Secret
                    </div>
                    <span
                      className="text-amber-800/70 text-sm flex-shrink-0 transition-transform duration-300"
                      style={{ transform: isSecretExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      ▼
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-card-body-enhanced text-amber-900 font-semibold transition-opacity duration-300",
                      !isSecretExpanded && "line-clamp-2"
                    )}
                    style={{ opacity: isSecretExpanded ? 1 : 0.92 }}
                  >
                    {activity.localSecret}
                  </p>
                  {!isSecretExpanded && activity.localSecret.length > 80 && (
                    <div className="text-card-meta-enhanced text-amber-800/70 mt-2 font-medium">
                      Tap to reveal more...
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-lg" />
            </motion.div>
            </div>
          </div>
        </div>
        )}
      </motion.div>
    </motion.div>
  );
}
