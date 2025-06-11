'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardHand } from './CardHand';
import { useCardGame } from '@/hooks/useCardGame';
import { Shuffle, RotateCcw } from 'lucide-react';

export function CardDealer() {
  const {
    gameState,
    dealNewHand,
    finishDealing,
    selectCard,
    finishRevealing,
    resetGame,
    setHoveredCard,
    canSelectCard,
    hasCards,
    isDealing,
    isComplete,
  } = useCardGame();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start sm:justify-between p-4 sm:p-6 md:p-8 relative text-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-950 to-background -z-10" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl mx-auto pt-8 sm:pt-12 md:pt-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-gold mb-4">
          Dungarvan Discovery
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Discover hidden gems, local secrets, and unforgettable experiences in Ireland&apos;s Ancient East.
        </p>
      </motion.header>

      {/* Main Game Area */}
      <main className="flex-1 w-full max-w-6xl flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {!hasCards && gameState.gamePhase === 'welcome' ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center p-8 rounded-xl glass-morphism"
            >
              <div className="text-6xl mb-6">🎴</div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready for an Adventure?</h2>
              <p className="text-slate-300 mb-8 max-w-md mx-auto text-lg">
                We&apos;ll deal you 5 cards. Choose one and let serendipity guide your day!
              </p>
              <Button
                onClick={dealNewHand}
                disabled={isDealing}
                size="lg"
                className="font-semibold text-lg"
              >
                <Shuffle className={`mr-2 h-5 w-5 ${isDealing ? 'motion-safe:animate-spin' : ''}`} />
                {isDealing ? 'Dealing...' : 'Deal the Cards'}
              </Button>
            </motion.div>
          ) : (
            <CardHand
              cards={gameState.dealtCards}
              selectedIndex={gameState.selectedIndex}
              flipStates={gameState.flipStates}
              hoveredIndex={gameState.hoveredIndex}
              canSelectCard={canSelectCard}
              onSelectCard={selectCard}
              onHoverCard={setHoveredCard}
              gamePhase={gameState.gamePhase}
              onDealingComplete={finishDealing}
              onRevealComplete={finishRevealing}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Action Buttons Footer */}
      <footer className="relative z-20 w-full h-24 flex items-center justify-center">
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.5 } }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button onClick={dealNewHand} size="lg" className="font-semibold">
                <Shuffle className="mr-2 h-4 w-4" />
                Deal New Hand
              </Button>
              <Button onClick={resetGame} variant="outline" size="lg" className="bg-background/50">
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
