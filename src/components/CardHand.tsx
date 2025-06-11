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
  const otherCards = cards.filter((_, index) => index !== selectedIndex);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Dynamic Header */}
      <AnimatePresence>
        {gamePhase === 'selecting' && (
          <motion.div
            key="selecting-header"
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

      {/* Layout Container */}
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        {/* === A. COMPLETE LAYOUT === */}
        {isComplete && selectedIndex !== null && (
          <motion.div className="w-full flex flex-col items-center gap-8">
             <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } }}
                className="text-3xl md:text-4xl font-bold text-gradient-celebrate"
              >
                🎉 Your Adventure Awaits!
              </motion.h3>

            {/* Top Container: Selected Card */}
            <motion.div
              layoutId={`card-wrapper-${selectedIndex}`}
              className="z-20"
            >
              <GameCard activity={cards[selectedIndex]} isFlipped={true} />
            </motion.div>

            {/* Bottom Container: Other Cards */}
            <div className="flex justify-center gap-4 flex-wrap">
              {otherCards.map((card) => {
                const originalIndex = cards.findIndex(c => c.id === card.id);
                return (
                  <motion.div
                    key={card.id}
                    layoutId={`card-wrapper-${originalIndex}`}
                    className="z-10 opacity-60 scale-75"
                  >
                    <GameCard activity={card} isFlipped={true} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* === B. SELECTING LAYOUT (FAN) === */}
        {!isComplete && (
          <div className="relative w-full flex-1 flex items-center justify-center">
            {cards.map((card, index) => {
              const isHovered = hoveredIndex === index;
              const offsetFromCenter = index - Math.floor(cards.length / 2);

              return (
                <motion.div
                  key={card.id}
                  layoutId={`card-wrapper-${index}`}
                  className="absolute cursor-pointer"
                  style={{ transformOrigin: 'bottom center' }}
                  onHoverStart={() => onHoverCard(index)}
                  onHoverEnd={() => onHoverCard(null)}
                  onClick={() => canSelectCard(index) && onSelectCard(index)}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  animate={{
                    x: offsetFromCenter * 60,
                    y: isHovered ? -40 : Math.abs(offsetFromCenter) * 20,
                    rotate: isHovered ? 0 : offsetFromCenter * 8,
                    scale: isHovered ? 1.1 : 1,
                    zIndex: isHovered ? 10 : cards.length - Math.abs(offsetFromCenter),
                  }}
                >
                  <GameCard activity={card} isFlipped={flipStates[index]} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
