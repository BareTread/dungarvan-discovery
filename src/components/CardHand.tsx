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
            {/* Selected Card Container with Proper Spacing */}
            <motion.div
              layout
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full flex justify-center"
              style={{
                marginBottom: 'clamp(6rem, 15vw, 10rem)', // Massive spacing to prevent overlap
                paddingBottom: 'clamp(3rem, 8vw, 5rem)',
                overflow: 'visible'
              }}
            >
              <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-20"
                style={{
                  overflow: 'visible',
                  maxWidth: 'min(400px, 90vw)', // Constrain card width
                  width: '100%'
                }}
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

            {/* Success Message with Guaranteed Separation */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              className="text-center w-full relative z-10"
              style={{
                marginTop: 'clamp(8rem, 20vw, 12rem)', // Even more spacing
                marginBottom: 'clamp(4rem, 10vw, 6rem)',
                paddingTop: 'clamp(3rem, 8vw, 5rem)',
                clear: 'both'
              }}
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

            {/* Other Cards (Enhanced size for better content visibility) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center w-full px-2"
              style={{
                marginTop: 'clamp(3rem, 6vw, 4rem)', // Increased spacing for larger cards
                paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)',
                paddingBottom: 'clamp(2rem, 5vw, 3rem)' // Bottom padding for better layout
              }}
            >
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-4">
                {cards.map((card, index) => {
                  if (index === selectedIndex) return null;

                  return (
                    <motion.div
                      key={card.id}
                      initial={{
                        scale: 0.2,
                        opacity: 0,
                        rotateY: 180,
                        y: 50,
                        filter: "blur(4px)"
                      }}
                      animate={{
                        scale: 1.0, // Full size - no scaling down for final cards
                        opacity: 0.9,
                        rotateY: 0,
                        y: 0,
                        filter: "blur(0px)"
                      }}
                      transition={{
                        delay: 1.4 + (index * 0.1),
                        duration: 0.8,
                        ease: [0.175, 0.885, 0.32, 1.275],
                        filter: { duration: 0.6 }
                      }}
                      className="transform-gpu flex-shrink-0 relative"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '2px'
                        // Removed size restrictions - let cards be full size
                      }}
                      whileHover={{
                        scale: 1.05, // Slight hover scale increase from full size
                        opacity: 1,
                        y: -8,
                        rotateX: 2,
                        filter: "brightness(1.05) saturate(1.05)",
                        transition: {
                          duration: 0.2,
                          ease: [0.175, 0.885, 0.32, 1.275]
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
          // Enhanced Initial Layout: 5 cards in premium fan formation
          <motion.div
            className="flex justify-center items-center max-w-6xl mx-auto px-2 sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                minHeight: 'clamp(350px, 60vh, 450px)', // Increased height for better mobile experience
                paddingBottom: 'clamp(2rem, 8vw, 4rem)' // Bottom padding for thumb reach
              }}
            >
              {cards.map((card, index) => {
                // Calculate premium fan positioning with mobile optimization
                const totalCards = cards.length;
                const centerIndex = Math.floor(totalCards / 2);
                const offsetFromCenter = index - centerIndex;

                // Mobile-first responsive spacing and rotation
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const xOffset = offsetFromCenter * (isMobile ? 35 : 40);
                const rotation = offsetFromCenter * (isMobile ? 4 : 6); // Reduced rotation for mobile stability
                const yOffset = Math.abs(offsetFromCenter) * (isMobile ? 2 : 3); // Reduced for tighter mobile layout
                const zIndex = totalCards - Math.abs(offsetFromCenter);

                return (
                  <motion.div
                    key={card.id}
                    className="absolute card-fan-item"
                    style={{
                      zIndex: zIndex,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                      x: index * 120,
                      y: 60,
                      rotate: 0,
                      filter: "blur(8px)"
                    }}
                    animate={{
                      opacity: 1,
                      scale: isMobile ? 0.9 : 0.85, // Larger on mobile for 44px+ touch targets
                      x: xOffset,
                      y: yOffset,
                      rotate: rotation,
                      filter: "blur(0px)"
                    }}
                    transition={{
                      delay: index * 0.12,
                      duration: 0.9,
                      ease: [0.175, 0.885, 0.32, 1.275],
                      filter: { duration: 0.6 }
                    }}
                    whileHover={{
                      scale: isMobile ? 1.05 : 1.1, // Optimized hover for mobile
                      zIndex: 50,
                      y: yOffset - (isMobile ? 15 : 25), // Reduced lift on mobile
                      rotate: 0,
                      filter: "brightness(1.1) saturate(1.1)",
                      transition: {
                        duration: 0.4,
                        ease: [0.175, 0.885, 0.32, 1.275]
                      }
                    }}
                    whileTap={{
                      scale: isMobile ? 0.95 : 1.0, // Touch feedback
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
