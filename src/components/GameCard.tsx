'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/lib/activities';
import { getCategoryColor, formatDuration, getTimeEmoji, getDifficultyEmoji, getCostEmoji } from '@/lib/dealer';
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
  index,
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
        y: 120,
        opacity: 0,
        scale: 0.8,
        rotateX: 15,
        filter: "blur(4px)"
      }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)"
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.175, 0.885, 0.32, 1.275],
        filter: { duration: 0.6 }
      }}
      className="relative transform-gpu"
    >
      <motion.div
        className={cn(
          "relative cursor-pointer focus-ring",
          "w-48 h-72 sm:w-52 sm:h-80 md:w-56 md:h-84 lg:w-60 lg:h-88",
          !canSelect && "cursor-default",
          isSelected && "z-10"
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
          scale: isSelected ? 1.05 : (isFlipped && !isSelected) ? 0.9 : 1,
          y: isSelected ? -20 : (isFlipped && !isSelected) ? 4 : 0,
          rotateX: isSelected ? -2 : (isFlipped && !isSelected) ? 0.5 : 0,
          rotateZ: isSelected ? 0 : (isFlipped && !isSelected) ? Math.random() * 3 - 1.5 : 0,
          zIndex: isSelected ? 20 : (isFlipped && !isSelected) ? 5 : 1,
          opacity: isSelected ? 1 : (isFlipped && !isSelected) ? 0.85 : 1,
          filter: isSelected
            ? "brightness(1.15) saturate(1.1) drop-shadow(0 8px 32px rgba(0,0,0,0.3))"
            : (isFlipped && !isSelected)
              ? "brightness(0.75) blur(0.8px) saturate(0.9)"
              : "brightness(1)"
        }}
        transition={{
          scale: {
            duration: isSelected ? 0.7 : 0.8,
            ease: isSelected ? [0.175, 0.885, 0.32, 1.275] : [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: isSelected ? 250 : 180,
            damping: isSelected ? 25 : 30,
            delay: isSelected ? 0 : (index * 0.06)
          },
          y: {
            duration: isSelected ? 0.6 : 0.9,
            ease: [0.175, 0.885, 0.32, 1.275],
            type: "spring",
            stiffness: isSelected ? 300 : 200,
            damping: isSelected ? 28 : 35,
            delay: isSelected ? 0 : (index * 0.08)
          },
          rotateX: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: isSelected ? 0 : (index * 0.04)
          },
          rotateZ: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: isSelected ? 0 : (index * 0.05)
          },
          opacity: {
            duration: isSelected ? 0.4 : 0.6,
            ease: "easeOut",
            delay: isSelected ? 0 : (index * 0.03)
          },
          filter: {
            duration: isSelected ? 0.5 : 0.7,
            ease: "easeOut",
            delay: isSelected ? 0 : (index * 0.04)
          },
          zIndex: { duration: 0 }
        }}
        whileHover={canSelect && !showActivityDetails ? {
          scale: 1.08,
          y: -12,
          rotateX: 3,
          rotateZ: 1,
          transition: {
            duration: 0.3,
            ease: [0.175, 0.885, 0.32, 1.275]
          }
        } : (isFlipped && !isSelected) ? {
          scale: 0.95,
          y: -2,
          opacity: 0.95,
          filter: "brightness(0.9) blur(0.3px) saturate(1.05)",
          transition: {
            duration: 0.3,
            ease: "easeOut"
          }
        } : {}}
        whileTap={canSelect ? {
          scale: 0.98,
          transition: { duration: 0.1 }
        } : {}}
      >
        {/* Subtle breathing animation for non-selected flipped cards */}
        {isFlipped && !isSelected && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{
              scale: [1, 1.005, 1],
              opacity: [0.8, 0.85, 0.8]
            }}
            transition={{
              duration: 3 + (index * 0.2),
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Floating animation for selected card */}
        {isSelected && (
          <>
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                y: [0, -2, 0],
                rotateX: [-3, -2, -3],
                scale: [1, 1.002, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(168, 85, 247, 0.06) 50%, rgba(236, 72, 153, 0.08) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Magical particles around selected card */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: `${20 + (i * 12)}%`,
                  top: `${15 + (i % 2) * 70}%`,
                }}
                animate={{
                  y: [0, -8, 0],
                  x: [0, Math.sin(i) * 4, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2 + (i * 0.3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </>
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
            {/* Animated background effects */}
            {isSelected && (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: 360 }}
                  transition={{ duration: 1.2, ease: [0.175, 0.885, 0.32, 1.275] }}
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 via-purple-500/10 to-pink-500/15 rounded-lg"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: [0, 0.8, 0.3] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent rounded-lg"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(251, 191, 36, 0.2) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 2s linear infinite'
                  }}
                />
              </>
            )}

            {/* Hover glow effect */}
            {isHovered && !isSelected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-lg"
              />
            )}

            <motion.div
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4 relative z-10"
              animate={isSelected ? {
                scale: [1, 1.3, 1.1],
                rotate: [0, 15, -10, 5, 0],
                y: [0, -5, 0]
              } : isHovered ? {
                scale: [1, 1.1, 1.05],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{
                duration: isSelected ? 1.2 : 0.6,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
            >
              🎲
            </motion.div>

            <motion.h3
              className="text-card-title-enhanced text-white mb-3 relative z-10"
              animate={isSelected ? {
                scale: [1, 1.05, 1],
                y: [0, -2, 0]
              } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {isSelected ? "✨ Chosen!" : "Mystery Adventure"}
            </motion.h3>

            <motion.p
              className="text-card-meta-enhanced text-slate-300 relative z-10 px-1 sm:px-0 text-center"
              animate={isSelected ? {
                opacity: [0.7, 1, 0.9],
                y: [0, -1, 0]
              } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {isSelected ? "Revealing your discovery..." : "Click to reveal your Dungarvan discovery"}
            </motion.p>

            {/* Enhanced progress indicator */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
              <motion.div
                className={cn(
                  "h-1 sm:h-1.5 rounded-full relative overflow-hidden",
                  isSelected
                    ? "bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 opacity-60"
                )}
                animate={isSelected ? {
                  opacity: [0.6, 1, 0.8, 1],
                  scale: [1, 1.02, 1]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: isSelected ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
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
              <motion.div
                className="text-xl sm:text-2xl md:text-3xl flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {activity.emoji}
              </motion.div>
              <div className="flex gap-1 sm:gap-1.5 flex-wrap">
                <motion.span
                  className="text-responsive-xs bg-white/25 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-white/20 font-medium leading-tight"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {getTimeEmoji(activity.bestTime)}
                </motion.span>
                <motion.span
                  className="text-responsive-xs bg-white/25 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-white/20 font-medium leading-tight"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {getDifficultyEmoji(activity.difficulty)}
                </motion.span>
                {activity.cost && (
                  <motion.span
                    className={`text-responsive-xs backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border font-medium leading-tight ${
                      activity.cost === 'free'
                        ? 'bg-green-500/25 border-green-400/30 text-green-200'
                        : 'bg-white/25 border-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getCostEmoji(activity.cost)}
                  </motion.span>
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
              <div className="flex items-center gap-2 bg-white/12 rounded-lg px-3 py-2 backdrop-blur-sm border border-white/10 mb-2">
                <span className="text-base">📍</span>
                <span className="font-medium text-card-meta-enhanced truncate">{activity.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/12 rounded-lg px-3 py-2 backdrop-blur-sm border border-white/10">
                <span className="text-base">⏱️</span>
                <span className="font-medium text-card-meta-enhanced">{formatDuration(activity.duration)}</span>
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
                <motion.button
                  className="text-card-meta-enhanced text-white/70 hover:text-white/90 mt-2 font-medium transition-colors duration-200"
                  onClick={() => setIsDescriptionExpanded(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  Read more...
                </motion.button>
              )}
            </motion.div>

            {/* Enhanced Local Secret */}
            <motion.div
              className="bg-gradient-to-r from-white/18 to-white/12 rounded-xl backdrop-blur-sm border border-white/25 relative overflow-hidden cursor-pointer card-depth-subtle"
              style={{ padding: 'var(--spacing-card-padding)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onClick={() => setIsSecretExpanded(!isSecretExpanded)}
              whileHover={{ scale: 1.01, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 rounded-lg" />

              <div className="flex items-start relative z-10" style={{ gap: 'var(--spacing-card-gap)' }}>
                <motion.span
                  className="text-yellow-300 text-lg mt-1 flex-shrink-0"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💡
                </motion.span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-card-meta-enhanced font-bold text-yellow-300 tracking-wide uppercase">
                      Local Secret
                    </div>
                    <motion.span
                      className="text-yellow-300/70 text-sm flex-shrink-0"
                      animate={{ rotate: isSecretExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </div>
                  <motion.p
                    className={cn(
                      "text-card-body-enhanced text-white/96 font-medium",
                      !isSecretExpanded && "line-clamp-2"
                    )}
                    animate={{ opacity: isSecretExpanded ? 1 : 0.92 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activity.localSecret}
                  </motion.p>
                  {!isSecretExpanded && activity.localSecret.length > 80 && (
                    <motion.div
                      className="text-card-meta-enhanced text-yellow-300/70 mt-2 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Tap to reveal more...
                    </motion.div>
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
