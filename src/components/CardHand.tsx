'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GameCard } from './GameCard';
import { Activity } from '@/lib/activities';
import { GamePhase } from '@/hooks/useCardGame';

interface CardHandProps {
  cards: Activity[];
  selectedIndex: number | null;
  flipStates: boolean[];
  hoveredIndex: number | null;
  onSelectCard: (index: number) => void;
  onHoverCard: (index: number | null) => void;
  gamePhase: GamePhase;
  onDealingComplete: () => void;
  onRevealComplete: () => void;
  canSelectCard: (index: number) => boolean;
}

const handContainerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardMotionProps = {
  initial: { opacity: 0, y: 100, scale: 0.5 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
  exit: { opacity: 0, y: -100, scale: 0.5, transition: { duration: 0.3 } },
};

export function CardHand({ cards, selectedIndex, flipStates, hoveredIndex, onSelectCard, onHoverCard, gamePhase, onDealingComplete, onRevealComplete, canSelectCard }: CardHandProps) {
  const isSelecting = gamePhase === 'selecting';
  const isRevealing = gamePhase === 'revealing' || gamePhase === 'complete';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {(isSelecting || gamePhase === 'dealing') && (
          <motion.div
            key="header" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.8 } }} exit={{ opacity: 0 }}
            className="mb-20 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-2">Choose Your Adventure</h2>
            <p className="text-slate-300">Hover a card to inspect, click to choose.</p>
          </motion.div>
        )}
        {gamePhase === 'complete' && (
          <motion.h3
            key="complete-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="text-3xl md:text-4xl font-bold text-gradient-celebrate mb-8"
          >
            🎉 Your Adventure Awaits!
          </motion.h3>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-[450px] w-[800px] flex items-center justify-center"
        variants={handContainerVariants} initial="initial" animate="animate"
        onAnimationComplete={onDealingComplete}
      >
        <AnimatePresence>
          {cards.map((card, index) => {
            if (isRevealing && index !== selectedIndex) return null; // Animate unselected cards away
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={card.id}
                layoutId={`card-wrapper-${card.id}`}
                {...cardMotionProps}
                className="absolute cursor-pointer"
                onHoverStart={() => onHoverCard(index)}
                onHoverEnd={() => onHoverCard(null)}
                onClick={() => canSelectCard(index) && onSelectCard(index)}
                animate={{
                  ...cardMotionProps.animate,
                  ...(isRevealing
                    ? { y: -50, scale: 1.1, rotate: 0, zIndex: 20 }
                    : {
                        x: (index - 2) * 100,
                        y: isHovered ? -40 : Math.abs(index - 2) * 20,
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 0 : (index - 2) * 8,
                        zIndex: isHovered ? 10 : 5 - Math.abs(index - 2),
                      }
                  ),
                }}
              >
                <GameCard
                  activity={card}
                  isFlipped={flipStates[index]}
                  onFlipComplete={index === selectedIndex ? onRevealComplete : undefined}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
