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
  canSelectCard: () => boolean;
}

const handContainerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardMotionProps = {
  initial: { opacity: 0, y: 150, scale: 0.6, rotate: Math.random() * 20 - 10 },
  animate: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 150, damping: 20, mass: 1 } },
  exit: { opacity: 0, y: -120, scale: 0.6, rotate: Math.random() * -20 + 10, transition: { duration: 0.4, ease: 'anticipate' } },
};

export function CardHand({ cards, selectedIndex, flipStates, hoveredIndex, onSelectCard, onHoverCard, gamePhase, onDealingComplete, onRevealComplete, canSelectCard }: CardHandProps) {
  const isSelecting = gamePhase === 'selecting';
  const isRevealing = gamePhase === 'revealing' || gamePhase === 'complete';

  // Dynamic card positioning calculations
  const cardWidthVW = 20; // From --card-width: clamp(260px, 20vw, 300px)
  const gap = -cardWidthVW / 2;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {(isSelecting || gamePhase === 'dealing') && (
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0, transition: { delay: isSelecting ? 0.8 : 0.2, duration: 0.6, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 sm:mb-16 md:mb-20 text-center px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-gold mb-3 sm:mb-4">Choose Your Adventure</h2>
            <p className="text-slate-300 text-base sm:text-lg">Hover a card to inspect, click to choose your path.</p>
          </motion.div>
        )}
        {gamePhase === 'complete' && (
          <motion.h3
            key="complete-header"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 100, damping: 12 } }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-celebrate mb-8 sm:mb-12 px-4"
          >
            🎉 Your Adventure Awaits!
          </motion.h3>
        )}
      </AnimatePresence>

      <motion.div
        className="relative w-[90%] max-w-[800px] h-[60vh] max-h-[450px] flex items-center justify-center"
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
                onClick={() => canSelectCard() && onSelectCard(index)}
                animate={{
                  ...cardMotionProps.animate,
                  ...(isRevealing
                    ? { y: -50, scale: 1.15, rotate: 0, zIndex: 20 }
                    : {
                        x: (index - (cards.length - 1) / 2) * (cardWidthVW * 0.6 + gap),
                        y: isHovered ? -60 : Math.abs(index - (cards.length - 1) / 2) * 15,
                        scale: isHovered ? 1.15 : 1,
                        rotate: isHovered ? 0 : (index - (cards.length - 1) / 2) * 5,
                        zIndex: isHovered ? 10 : 5 - Math.abs(index - (cards.length - 1) / 2),
                        transition: { type: 'spring', stiffness: 120, damping: 15 }
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
