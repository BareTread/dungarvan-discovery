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
    selectedActivity,
    dealNewHand,
    selectCard,
    resetGame,
    setHoveredCard,
    canSelectCard,
    isCardFlipped,
    isCardHovered,
    hasCards,
    isDealing,
    isSelecting,
    isRevealing,
    isComplete,
    canDealNewHand
  } = useCardGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Dungarvan Discovery
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Discover hidden gems, local secrets, and unforgettable experiences in Ireland's Ancient East
        </p>
      </motion.div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl">
        <AnimatePresence mode="wait">
          {!hasCards ? (
            // Welcome State
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-8"
              >
                🎴
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready for an Adventure?
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                We'll deal you 5 cards from over 60 amazing Dungarvan experiences. 
                Choose one and let serendipity guide your day!
              </p>
              <Button
                onClick={dealNewHand}
                disabled={isDealing}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Shuffle className="mr-2 h-5 w-5" />
                {isDealing ? 'Dealing Cards...' : 'Deal the Cards'}
              </Button>
            </motion.div>
          ) : (
            // Game State
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
      </div>

      {/* Action Buttons */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex gap-4 mt-8"
          >
            <Button
              onClick={dealNewHand}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Deal New Hand
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-6 py-3 rounded-xl transition-all duration-200"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Activity Details (if revealed) */}
      <AnimatePresence>
        {selectedActivity && isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-8 text-center max-w-md"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">
                Your Adventure Awaits!
              </h3>
              <p className="text-slate-300 text-sm">
                Ready to explore <strong>{selectedActivity.title}</strong> in {selectedActivity.location}? 
                This {selectedActivity.duration} experience is perfect for creating unforgettable memories.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12 text-center text-slate-500 text-sm"
      >
        <p>Discover the magic of Dungarvan • Ireland's Ancient East</p>
      </motion.div>
    </div>
  );
}
