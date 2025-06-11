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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-start pt-4 pb-4 px-4 md:px-8 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/5 to-transparent" />

      {/* Simplified static background - no animations to prevent conflicts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static ambient glow orbs */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 25}%`,
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              background: `radial-gradient(circle,
                rgba(139, 92, 246, 0.1) 0%,
                rgba(236, 72, 153, 0.05) 50%,
                transparent 70%
              )`
            }}
          />
        ))}
      </div>
      {/* Enhanced Header with Premium Typography */}
      <motion.header
        initial={{ opacity: 0, y: -50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 1.2,
          ease: [0.175, 0.885, 0.32, 1.275],
          filter: { duration: 0.8 }
        }}
        className="content-center relative z-10 px-4"
      >
        <h1 className="text-hero-enhanced">
          Dungarvan
          <br />
          Discovery
        </h1>

        <motion.p
          className="text-subtitle-enhanced"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Discover hidden gems, local secrets, and unforgettable experiences in Ireland&apos;s Ancient East
        </motion.p>
      </motion.header>

      {/* Main Game Area */}
      <section className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl relative z-20 px-2 md:px-4" aria-label="Interactive card game">
        <AnimatePresence mode="wait">
          {!hasCards ? (
            // Enhanced Welcome State
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="text-center"
            >
              <div className="text-6xl sm:text-7xl md:text-8xl mb-3 md:mb-4 relative">
                🎴
              </div>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Ready for an Adventure?
              </motion.h2>

              <motion.p
                className="text-slate-300 mb-6 md:mb-8 max-w-lg mx-auto leading-relaxed text-lg sm:text-xl px-4 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                We&apos;ll deal you 5 cards from over 60 amazing Dungarvan experiences.
                Choose one and let serendipity guide your day!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Button
                  onClick={dealNewHand}
                  disabled={isDealing}
                  size="lg"
                  className="btn-magnetic text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-elegant hover:shadow-elegant-hover focus-premium relative overflow-hidden group"
                  aria-label={isDealing ? 'Dealing cards, please wait' : 'Deal 5 random adventure cards'}
                >
                  {/* Premium shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out" />

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    className="flex items-center relative z-10"
                    animate={isDealing ? {
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isDealing ? Infinity : 0
                    }}
                  >
                    <motion.div
                      animate={isDealing ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: isDealing ? Infinity : 0, ease: "linear" }}
                    >
                      <Shuffle className="mr-2 h-5 w-5" aria-hidden="true" />
                    </motion.div>
                    {isDealing ? 'Dealing Cards...' : 'Deal the Cards'}
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            // Enhanced Game State
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
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

      {/* Enhanced Action Buttons */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{
              delay: 1.5,
              duration: 0.8,
              ease: [0.175, 0.885, 0.32, 1.275]
            }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-8 relative z-30 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={dealNewHand}
                size="lg"
                className="btn-magnetic text-white font-semibold px-6 py-3 rounded-xl shadow-elegant hover:shadow-elegant-hover focus-premium relative overflow-hidden group w-full sm:w-auto"
                aria-label="Deal a new hand of 5 adventure cards"
              >
                {/* Premium shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out" />

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center relative z-10">
                  <Shuffle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Deal New Hand
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={resetGame}
                variant="outline"
                size="lg"
                className="btn-magnetic glass-morphism text-slate-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-500 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-elegant w-full sm:w-auto group relative overflow-hidden"
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(148, 163, 184, 0.3)'
                }}
                aria-label="Reset the game and return to the beginning"
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-400/10 via-slate-300/10 to-slate-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center relative z-10">
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                  Start Over
                </div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 md:mt-12 text-center text-slate-400 text-base px-4"
      >
        <p className="font-light">Discover the magic of Dungarvan • Ireland&apos;s Ancient East</p>
      </motion.footer>
    </main>
  );
}
