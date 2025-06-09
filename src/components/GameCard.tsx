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
          "relative w-52 h-72 sm:w-60 sm:h-80 md:w-72 md:h-96 cursor-pointer focus-ring",
          !canSelect && "cursor-default",
          isSelected && "z-10"
        )}
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
              "absolute inset-0 rounded-xl border-2 p-3 sm:p-4 md:p-5 lg:p-6 card-glow",
              "bg-gradient-to-br from-slate-800/95 via-slate-850/95 to-slate-900/95",
              "backdrop-blur-sm border-slate-700/80",
              "transition-all duration-500 ease-out",
              isHovered && !isSelected && "shadow-elegant-hover border-purple-500/60 bg-gradient-to-br from-slate-800/98 via-slate-850/98 to-slate-900/98",
              isSelected && "shadow-elegant-selected border-yellow-400/80 bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900",
              !isHovered && !isSelected && "shadow-elegant"
            )}
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
              className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 relative z-10"
              animate={isSelected ? {
                scale: [1, 1.05, 1],
                y: [0, -2, 0]
              } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {isSelected ? "✨ Chosen!" : "Mystery Adventure"}
            </motion.h3>

            <motion.p
              className="text-slate-300 text-xs sm:text-sm relative z-10 leading-relaxed px-1 sm:px-0"
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
              "absolute inset-0 rounded-xl border-2 p-4 sm:p-5 md:p-6 lg:p-7",
              "bg-gradient-to-br backdrop-blur-sm",
              getCategoryColor(activity.category),
              "border-white/30 shadow-2xl text-white",
              "focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2",
              "transition-all duration-300"
            )}
          >
          <div className="flex flex-col h-full relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
              }} />
            </div>

            {/* Header */}
            <motion.div
              className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5 relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {activity.emoji}
              </motion.div>
              <div className="flex gap-2">
                <motion.span
                  className="text-xs bg-white/25 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {getTimeEmoji(activity.bestTime)}
                </motion.span>
                <motion.span
                  className="text-xs bg-white/25 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {getDifficultyEmoji(activity.difficulty)}
                </motion.span>
                {activity.cost && (
                  <motion.span
                    className={`text-xs backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border font-medium ${
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

            {/* Title */}
            <motion.h3
              className="text-base sm:text-lg md:text-xl font-bold mb-3 leading-tight relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {activity.title}
            </motion.h3>

            {/* Location & Duration */}
            <motion.div
              className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-base">📍</span>
                <span className="font-medium">{activity.location}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-base">⏱️</span>
                <span className="font-medium">{formatDuration(activity.duration)}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 relative z-10 opacity-95"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {activity.description}
            </motion.p>

            {/* Enhanced Local Secret */}
            <motion.div
              className="bg-gradient-to-r from-white/15 to-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-white/20 relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onClick={() => setIsSecretExpanded(!isSecretExpanded)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 rounded-xl" />

              <div className="flex items-start gap-2 sm:gap-3 relative z-10">
                <motion.span
                  className="text-yellow-300 text-base sm:text-lg mt-0.5"
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
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="text-xs font-bold text-yellow-300 tracking-wide uppercase">
                      Local Secret
                    </div>
                    <motion.span
                      className="text-yellow-300/70 text-xs"
                      animate={{ rotate: isSecretExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </div>
                  <motion.p
                    className="text-xs leading-relaxed text-white/95 font-medium"
                    animate={{ opacity: isSecretExpanded ? 1 : 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activity.localSecret}
                  </motion.p>
                  {!isSecretExpanded && (
                    <motion.div
                      className="text-xs text-yellow-300/60 mt-1 font-medium"
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
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-xl" />
            </motion.div>
          </div>
        </div>
        )}
      </motion.div>
    </motion.div>
  );
}
