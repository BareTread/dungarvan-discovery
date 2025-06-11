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
  gamePhase: 'welcome' | 'selecting' | 'revealing' | 'complete';
}

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
  const isComplete = gamePhase === 'complete';

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      {/* Dynamic Header */}
      <AnimatePresence mode="wait">
        {gamePhase === 'selecting' && (
          <motion.div
            key="selecting-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-2">Choose Your Adventure</h2>
            <p className="text-slate-300">Hover and click a card to reveal your discovery.</p>
          </motion.div>
        )}
        {isComplete && (
            <motion.h3
              key="complete-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
              className="text-3xl md:text-4xl font-bold mb-8 text-gradient-celebrate"
            >
              🎉 Your Adventure Awaits!
            </motion.h3>
        )}
      </AnimatePresence>

      {/* Card Layout Area */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        {cards.map((card, index) => {
          const isSelected = index === selectedIndex;
          const totalCards = cards.length;
          const centerIndex = Math.floor(totalCards / 2);
          const offsetFromCenter = index - centerIndex;

          // Fan layout properties
          const fanRotation = offsetFromCenter * 6;
          const fanYOffset = Math.abs(offsetFromCenter) * 12;
          const fanXOffset = offsetFromCenter * 40;

          return (
            <motion.div
              key={card.id}
              layout // This is the magic prop for smooth transitions!
              className="absolute cursor-pointer"
              style={{ transformOrigin: 'bottom center' }}
              onHoverStart={() => onHoverCard(index)}
              onHoverEnd={() => onHoverCard(null)}
              onClick={() => canSelectCard(index) && onSelectCard(index)}
              transition={{
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1], // Smooth cinematic ease
              }}
              animate={
                isComplete
                  ? { // Final "complete" state position
                      x: isSelected ? 0 : (offsetFromCenter < 0 ? -150 : 150) + (offsetFromCenter * 20),
                      y: isSelected ? -80 : 280,
                      scale: isSelected ? 1.05 : 0.7,
                      opacity: isSelected ? 1 : 0.5,
                      zIndex: isSelected ? 20 : 1,
                      rotate: isSelected ? 0 : 0,
                    }
                  : { // "Selecting" state position (fan)
                      x: fanXOffset,
                      y: fanYOffset,
                      rotate: fanRotation,
                      zIndex: hoveredIndex === index ? 10 : totalCards - Math.abs(offsetFromCenter),
                    }
              }
              whileHover={gamePhase === 'selecting' ? {
                y: fanYOffset - 20,
                rotate: 0,
                scale: 1.05,
              } : {}}
            >
              <GameCard
                activity={card}
                isFlipped={flipStates[index]}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
