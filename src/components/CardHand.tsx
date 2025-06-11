'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GameCard } from './GameCard';
import { Activity } from '@/lib/activities';

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

const cardDropIn = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.175, 0.885, 0.32, 1.275], // Spring-like ease
    },
  }),
};

export function CardHand({
  cards,
  selectedIndex,
  flipStates,
  hoveredIndex,
  canSelectCard,
  onSelectCard,
  onHoverCard,
  gamePhase,
}: CardHandProps) {
  if (cards.length === 0) return null;

  const isComplete = gamePhase === 'complete';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence>
        {gamePhase === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-2">
              Choose Your Adventure
            </h2>
            <p className="text-slate-300">Hover and click a card to reveal your discovery.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full flex items-center justify-center" style={{ minHeight: '450px' }}>
        <AnimatePresence>
          {isComplete && selectedIndex !== null ? (
            // Final Layout: Selected card prominent, others below
            <motion.div
              layout
              key="final-layout"
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Success Message */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
                className="text-3xl md:text-4xl font-bold mb-8 text-gradient-celebrate"
              >
                🎉 Your Adventure Awaits!
              </motion.h3>
              {/* Selected Card */}
              <motion.div layoutId={`card-container-${selectedIndex}`} className="z-20">
                <GameCard
                  activity={cards[selectedIndex]}
                  isFlipped={true}
                  isSelected={true}
                  isHovered={false}
                  canSelect={false}
                  onSelect={() => {}}
                  onHover={() => {}}
                />
              </motion.div>

              <p className="text-slate-400 mt-8 mb-4">Here's what you didn't choose:</p>

              {/* Other Cards */}
              <div className="flex flex-wrap justify-center items-center gap-4 mt-4 relative z-10">
                {cards.map((card, index) => {
                  if (index === selectedIndex) return null;
                  return (
                    <motion.div
                      key={card.id}
                      layoutId={`card-container-${index}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 0.8, opacity: 0.7, transition: { delay: 0.8 } }}
                      whileHover={{ scale: 0.85, opacity: 1, y: -5 }}
                      className="cursor-pointer"
                      onClick={() => onSelectCard(index)}
                    >
                      <GameCard
                        activity={card}
                        isFlipped={true}
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
          ) : (
            // Initial Fan Layout
            cards.map((card, index) => {
              const totalCards = cards.length;
              const centerIndex = Math.floor(totalCards / 2);
              const offsetFromCenter = index - centerIndex;
              const rotation = offsetFromCenter * 6;
              const yOffset = Math.abs(offsetFromCenter) * 12;
              return (
                <motion.div
                  key={card.id}
                  layoutId={`card-container-${index}`}
                  custom={index}
                  variants={cardDropIn}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.5 }}
                  onHoverStart={() => onHoverCard(index)}
                  onHoverEnd={() => onHoverCard(null)}
                  onClick={() => canSelectCard(index) && onSelectCard(index)}
                  className="absolute cursor-pointer"
                  style={{ transformOrigin: 'bottom center' }}
                  animate={{
                    x: offsetFromCenter * 40,
                    y: yOffset,
                    rotate: rotation,
                    zIndex: hoveredIndex === index ? 10 : totalCards - Math.abs(offsetFromCenter),
                  }}
                  whileHover={{
                    y: yOffset - 20,
                    rotate: 0,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <GameCard
                    activity={card}
                    isFlipped={flipStates[index]}
                    isSelected={selectedIndex === index}
                    isHovered={hoveredIndex === index}
                    canSelect={canSelectCard(index)}
                    onSelect={() => {}} // Click handled by parent
                    onHover={() => {}} // Hover handled by parent
                  />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
