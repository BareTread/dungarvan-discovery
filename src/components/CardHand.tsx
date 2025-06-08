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
      {/* Instruction Text */}
      <AnimatePresence mode="wait">
        {gamePhase === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Choose Your Adventure
            </h2>
            <p className="text-slate-400">
              Click on a card to reveal your Dungarvan discovery
            </p>
          </motion.div>
        )}
        
        {gamePhase === 'revealing' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Revealing Your Adventure...
            </h2>
            <p className="text-slate-400">
              Get ready for your Dungarvan discovery!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards Layout */}
      <div className="relative">
        {gamePhase === 'complete' && selectedIndex !== null ? (
          // Final Layout: Selected card prominent, others smaller below
          <div className="flex flex-col items-center">
            {/* Selected Card (Large) */}
            <motion.div
              layout
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="mb-8"
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

            {/* Other Cards (Smaller, in a row) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-center mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                What you didn&apos;t choose:
              </h3>
              <div className="flex gap-4 justify-center">
                {cards.map((card, index) => {
                  if (index === selectedIndex) return null;
                  
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 0.6, opacity: 0.8 }}
                      transition={{ 
                        delay: 1 + (index * 0.1), 
                        duration: 0.3 
                      }}
                      className="transform-gpu"
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
          // Initial Layout: 5 cards in a row
          <div className="flex gap-6 justify-center flex-wrap">
            {cards.map((card, index) => (
              <GameCard
                key={card.id}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
