'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GameCard } from './GameCard';
import { Activity } from '@/lib/activities';
import { ANIMATION_TIMINGS } from '@/lib/dealer';

interface CardHandProps {
  cards: Activity[];
  selectedIndex: number | null;
  flipStates: boolean[];
  hoveredIndex: number | null;
  canSelectCard: (index: number) => boolean;
  onSelectCard: (index: number) => void;
  onHoverCard: (index: number | null) => void;
  gamePhase: 'dealing' | 'selecting' | 'revealing' | 'complete';
}

export function CardHand({
  cards,
  selectedIndex,
  flipStates,
  hoveredIndex,
  canSelectCard,
  onSelectCard,
  onHoverCard,
  gamePhase
}: CardHandProps) {
  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Enhanced Instruction Text */}
      <AnimatePresence mode="wait">
        {gamePhase === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="mb-8 text-center"
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Choose Your Adventure
            </motion.h2>
            <motion.p
              className="text-slate-400 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Click on a card to reveal your Dungarvan discovery
            </motion.p>
          </motion.div>
        )}

        {gamePhase === 'revealing' && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="mb-8 text-center"
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                  "0 0 40px rgba(251, 191, 36, 0.8)",
                  "0 0 20px rgba(251, 191, 36, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨ Revealing Your Adventure...
            </motion.h2>
            <motion.p
              className="text-slate-400 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Take a moment to explore your chosen discovery!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards Layout */}
      <div className="relative">
        {gamePhase === 'complete' && selectedIndex !== null ? (
          // Final Layout: Selected card prominent, others smaller below
          <div className="flex flex-col items-center max-w-6xl mx-auto px-4">
            {/* Selected Card (Large) */}
            <motion.div
              layout
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GameCard
                  activity={cards[selectedIndex]}
                  index={selectedIndex}
                  isFlipped={flipStates[selectedIndex]}
                  isSelected={true}
                  isHovered={false}
                  canSelect={false}
                  onSelect={() => {}}
                  onHover={() => {}}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              className="text-center mb-8 z-10 relative"
            >
              <motion.h3
                className="text-xl md:text-2xl font-bold text-white mb-3"
                animate={{
                  scale: [1, 1.02, 1],
                  textShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.3)",
                    "0 0 30px rgba(251, 191, 36, 0.5)",
                    "0 0 20px rgba(251, 191, 36, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎉 Your Adventure Awaits!
              </motion.h3>
              <motion.p
                className="text-slate-300 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Perfect choice! Here&apos;s what you didn&apos;t pick:
              </motion.p>
            </motion.div>

            {/* Other Cards (Smaller, in a row) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center w-full"
            >
              <div className="flex gap-4 justify-center flex-wrap max-w-5xl mx-auto">
                {cards.map((card, index) => {
                  if (index === selectedIndex) return null;

                  return (
                    <motion.div
                      key={card.id}
                      initial={{
                        scale: 0.3,
                        opacity: 0,
                        rotateY: 180,
                        y: 50,
                        filter: "blur(4px)"
                      }}
                      animate={{
                        scale: 0.6,
                        opacity: 0.9,
                        rotateY: 0,
                        y: 0,
                        filter: "blur(0px)"
                      }}
                      transition={{
                        delay: 1.2 + (index * 0.15),
                        duration: 0.8,
                        ease: [0.175, 0.885, 0.32, 1.275],
                        filter: { duration: 0.6 }
                      }}
                      className="transform-gpu"
                      whileHover={{
                        scale: 0.68,
                        opacity: 1,
                        y: -4,
                        rotateX: 2,
                        transition: {
                          duration: 0.3,
                          ease: [0.175, 0.885, 0.32, 1.275]
                        }
                      }}
                    >
                      <GameCard
                        activity={card}
                        index={index}
                        isFlipped={flipStates[index]}
                        isSelected={false}
                        isHovered={false}
                        canSelect={false}
                        onSelect={() => {}}
                        onHover={() => {}}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        ) : (
          // Enhanced Initial Layout: 5 cards in a row
          <motion.div
            className="flex gap-6 justify-center flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.175, 0.885, 0.32, 1.275]
                }}
              >
                <GameCard
                  activity={card}
                  index={index}
                  isFlipped={flipStates[index]}
                  isSelected={selectedIndex === index}
                  isHovered={hoveredIndex === index}
                  canSelect={canSelectCard(index)}
                  onSelect={() => onSelectCard(index)}
                  onHover={(hovered) => onHoverCard(hovered ? index : null)}
                  delay={index * ANIMATION_TIMINGS.DEAL_STAGGER / 1000}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
