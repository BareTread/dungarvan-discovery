'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardHand } from './CardHand';
import { useCardGame } from '@/hooks/useCardGame';
import { Shuffle, RotateCcw } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } },
};

export function CardDealer() {
  const {
    gameState,
    animationState,
    dealNewHand,
    selectCard,
    resetGame,
    setHoveredCard,
    canSelectCard,
    hasCards,
    isDealing,
    isComplete,
  } = useCardGame();

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative text-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-950 to-background -z-10" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="relative z-10 w-full max-w-4xl mx-auto mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
          Dungarvan Discovery
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Discover hidden gems, local secrets, and unforgettable experiences in Ireland&apos;s Ancient East.
        </p>
      </motion.header>

      {/* Main Game Area */}
      <section className="flex-1 w-full max-w-6xl flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {!hasCards ? (
            // Welcome State
            <motion.div
              key="welcome"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center p-6 rounded-xl glass-morphism"
            >
              <div className="text-6xl mb-6 motion-safe:animate-bounce">🎴</div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready for an Adventure?</h2>
              <p className="text-slate-300 mb-8 max-w-md mx-auto text-lg">
                We&apos;ll deal you 5 cards from over 60 amazing experiences. Choose one and let serendipity guide your day!
              </p>
              <Button
                onClick={dealNewHand}
                disabled={isDealing}
                size="lg"
                className="font-semibold text-lg"
                aria-label={isDealing ? 'Dealing cards...' : 'Deal 5 random adventure cards'}
              >
                <Shuffle className={`mr-2 h-5 w-5 ${isDealing ? 'motion-safe:animate-spin' : ''}`} />
                {isDealing ? 'Dealing...' : 'Deal the Cards'}
              </Button>
            </motion.div>
          ) : (
            // Game State
            <motion.div
              key="game"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full flex items-center justify-center"
            >
              <CardHand
                cards={gameState.dealtCards}
                selectedIndex={gameState.selectedIndex}
                flipStates={animationState.flipStates}
                hoveredIndex={animationState.hoveredIndex}
                canSelectCard={canSelectCard}
                onSelectCard={selectCard}
                onHoverCard={setHoveredCard}
                gamePhase={gameState.gamePhase}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Action Buttons */}
      <div className="h-24 relative z-20">
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.5 } }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Button
                onClick={dealNewHand}
                size="lg"
                className="font-semibold"
                aria-label="Deal a new hand of 5 adventure cards"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Deal New Hand
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                size="lg"
                className="bg-slate-900/50"
                aria-label="Start over"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
