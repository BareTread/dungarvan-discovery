'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardHand } from './CardHand';
import { useCardGame } from '@/hooks/useCardGame';
import { Shuffle, RotateCcw } from 'lucide-react';

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
    isComplete
  } = useCardGame();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-4 pb-4 px-4 md:px-8 relative">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Dungarvan Discovery
        </h1>

        <motion.p
          className="text-lg text-slate-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Discover hidden gems, local secrets, and unforgettable experiences in Ireland&apos;s Ancient East
        </motion.p>
      </motion.header>

      {/* Main Game Area */}
      <section className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl relative z-20 px-2 md:px-4" aria-label="Interactive card game">
        <AnimatePresence mode="wait">
          {!hasCards ? (
            // Welcome State
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-6xl mb-6">
                🎴
              </div>

              <motion.h2
                className="text-3xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Ready for an Adventure?
              </motion.h2>

              <motion.p
                className="text-slate-300 mb-8 max-w-lg mx-auto text-lg px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                We&apos;ll deal you 5 cards from over 60 amazing Dungarvan experiences.
                Choose one and let serendipity guide your day!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Button
                  onClick={dealNewHand}
                  disabled={isDealing}
                  size="lg"
                  className="btn-magnetic text-white font-semibold px-8 py-4 text-lg rounded-xl"
                  aria-label={isDealing ? 'Dealing cards, please wait' : 'Deal 5 random adventure cards'}
                >
                  <motion.div
                    className="flex items-center"
                    animate={isDealing ? { scale: [1, 1.05, 1] } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isDealing ? Infinity : 0
                    }}
                  >
                    <motion.div
                      animate={isDealing ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: isDealing ? Infinity : 0, ease: "linear" }}
                    >
                      <Shuffle className="mr-2 h-5 w-5" />
                    </motion.div>
                    {isDealing ? 'Dealing Cards...' : 'Deal the Cards'}
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            // Game State
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
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
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 relative z-30 px-4"
          >
            <Button
              onClick={dealNewHand}
              size="lg"
              className="btn-magnetic text-white font-semibold px-6 py-3 rounded-xl w-full sm:w-auto"
              aria-label="Deal a new hand of 5 adventure cards"
            >
              <div className="flex items-center">
                <Shuffle className="mr-2 h-4 w-4" />
                Deal New Hand
              </div>
            </Button>

            <Button
              onClick={resetGame}
              variant="outline"
              size="lg"
              className="text-slate-300 hover:text-white px-6 py-3 rounded-xl w-full sm:w-auto"
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(148, 163, 184, 0.3)'
              }}
              aria-label="Reset the game and return to the beginning"
            >
              <div className="flex items-center">
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12 text-center text-slate-400 px-4"
      >
        <p>Discover the magic of Dungarvan • Ireland&apos;s Ancient East</p>
      </motion.footer>
    </main>
  );
}
