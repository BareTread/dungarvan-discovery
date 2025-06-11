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
            className="mb-8 md:mb-12 text-center px-4"
          >
            <motion.h2
              className="golden-title text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFED4B 20%, #FFD700 40%, #FFA500 60%, #FFD700 80%, #FFED4B 100%)',
                backgroundSize: '300% 300%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'goldShine 3s linear infinite',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
              }}
            >
              ✨ Choose Your Adventure
            </motion.h2>
            <motion.p
              className="text-slate-100 text-lg md:text-xl font-medium leading-relaxed max-w-md mx-auto"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                color: 'rgba(248, 250, 252, 0.95)' // Improved contrast ratio
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hover and click on a card to reveal your Dungarvan discovery
            </motion.p>
          </motion.div>
        )}

        {gamePhase === 'revealing' && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="mb-6 md:mb-8 text-center px-4"
          >
            <motion.h2
              className="revealing-text text-xl md:text-2xl lg:text-3xl font-bold mb-3"
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨ Revealing Your Adventure
              <span className="loading-dots">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
              </span>
            </motion.h2>
            <motion.p
              className="text-slate-400 text-base md:text-lg"
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
      <div className="relative w-full">
        {gamePhase === 'complete' && selectedIndex !== null ? (
          // Final Layout: Selected card prominent, others smaller below
          <div className="flex flex-col items-center max-w-7xl mx-auto px-2 md:px-4">
            {/* Selected Card Container */}
            <motion.div
              layout
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full flex justify-center mb-8"
            >
              <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-20"
              >
                <GameCard
                  activity={cards[selectedIndex]}
                  isFlipped={flipStates[selectedIndex]}
                  isSelected={true}
                  isHovered={false}
                  canSelect={false}
                  onSelect={() => {}}
                  onHover={() => {}}
                />
              </motion.div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              className="text-center w-full relative z-10 my-8"
            >
              <motion.h3
                className="celebration-gradient text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 leading-tight px-4"
                animate={{
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                🎉 Your Adventure Awaits!
              </motion.h3>
              <motion.p
                className="text-slate-100 text-lg md:text-xl font-medium leading-relaxed max-w-lg mx-auto px-4"
                style={{
                  color: 'rgba(248, 250, 252, 0.9)', // Better contrast
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                Here&apos;s what you didn&apos;t choose:
              </motion.p>
            </motion.div>

            {/* Other Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center w-full px-2 mt-6"
            >
              <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto px-4">
                {cards.map((card, index) => {
                  if (index === selectedIndex) return null;

                  return (
                    <motion.div
                      key={card.id}
                      initial={{
                        scale: 0.8,
                        opacity: 0,
                        y: 20
                      }}
                      animate={{
                        scale: 0.8,
                        opacity: 0.9,
                        y: 0
                      }}
                      transition={{
                        delay: 1.4 + (index * 0.1),
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                      className="transform-gpu"
                      whileHover={{
                        scale: 0.85,
                        opacity: 1,
                        y: -4,
                        transition: {
                          duration: 0.3
                        }
                      }}
                    >
                      <GameCard
                        activity={card}
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
          // Initial Layout: 5 cards in fan formation
          <motion.div
            className="flex justify-center items-center max-w-6xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                minHeight: '450px',
                paddingBottom: '2rem'
              }}
            >
              {cards.map((card, index) => {
                // Calculate fan positioning
                const totalCards = cards.length;
                const centerIndex = Math.floor(totalCards / 2);
                const offsetFromCenter = index - centerIndex;

                // Simple responsive spacing and rotation
                const xOffset = offsetFromCenter * 35;
                const rotation = offsetFromCenter * 5;
                const yOffset = Math.abs(offsetFromCenter) * 10;
                const zIndex = totalCards - Math.abs(offsetFromCenter);

                return (
                  <motion.div
                    key={card.id}
                    className="absolute"
                    style={{
                      zIndex: zIndex
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      x: index * 60,
                      y: 30,
                      rotate: 0
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: xOffset,
                      y: yOffset,
                      rotate: rotation
                    }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      scale: 1.05,
                      zIndex: 50,
                      y: yOffset - 20,
                      rotate: 0,
                      transition: {
                        duration: 0.3
                      }
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <GameCard
                      activity={card}
                      isFlipped={flipStates[index]}
                      isSelected={selectedIndex === index}
                      isHovered={hoveredIndex === index}
                      canSelect={canSelectCard(index)}
                      onSelect={() => onSelectCard(index)}
                      onHover={(hovered) => onHoverCard(hovered ? index : null)}
                      delay={index * ANIMATION_TIMINGS.DEAL_STAGGER / 1000}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
