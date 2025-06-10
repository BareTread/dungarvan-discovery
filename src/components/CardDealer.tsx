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

      {/* Premium animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: `linear-gradient(45deg,
                rgba(139, 92, 246, ${Math.random() * 0.4 + 0.2}),
                rgba(236, 72, 153, ${Math.random() * 0.4 + 0.2})
              )`,
              filter: 'blur(1px)',
              boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(139, 92, 246, 0.3)`
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Ambient glow orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute rounded-full blur-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              background: `radial-gradient(circle,
                rgba(139, 92, 246, ${Math.random() * 0.08 + 0.03}) 0%,
                rgba(236, 72, 153, ${Math.random() * 0.06 + 0.02}) 50%,
                transparent 70%
              )`
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      {/* Enhanced Header with Better Spacing */}
      <motion.header
        initial={{ opacity: 0, y: -50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 1.2,
          ease: [0.175, 0.885, 0.32, 1.275],
          filter: { duration: 0.8 }
        }}
        className="text-center mb-8 md:mb-12 lg:mb-16 relative z-10 px-4"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 lg:mb-8 relative leading-tight"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 25%, #06B6D4 50%, #8B5CF6 75%, #EC4899 100%)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Dungarvan Discovery

          {/* Premium aurora glow effect */}
          <motion.div
            className="absolute inset-0 blur-2xl -z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 25%, rgba(6, 182, 212, 0.3) 50%, rgba(139, 92, 246, 0.3) 75%, rgba(236, 72, 153, 0.3) 100%)',
              backgroundSize: '400% 400%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Sparkle effects */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${15 + (i * 18)}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 font-light text-wrap-balance"
          style={{
            background: 'linear-gradient(135deg, rgba(203, 213, 225, 0.95) 0%, rgba(148, 163, 184, 0.9) 50%, rgba(203, 213, 225, 0.95) 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          initial={{ opacity: 0, y: 20 }}
        >
          Discover hidden gems, local secrets, and unforgettable experiences in Ireland&apos;s Ancient East
        </motion.p>
      </motion.header>

      {/* Main Game Area */}
      <section className="flex-1 flex flex-col items-center justify-start w-full max-w-7xl relative z-10 px-2 md:px-4" aria-label="Interactive card game">
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
              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.1, 1],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl sm:text-7xl md:text-8xl mb-3 md:mb-4 relative"
              >
                🎴
                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl blur-xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎴
                </motion.div>
              </motion.div>

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
                  className="glass-morphism-strong text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-elegant hover:shadow-elegant-hover transition-all duration-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 relative overflow-hidden group animate-magnetic-hover"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
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
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 md:mt-4 relative z-10 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={dealNewHand}
                size="lg"
                className="btn-magnetic glass-morphism-strong text-white font-semibold px-6 py-3 rounded-xl shadow-elegant hover:shadow-elegant-hover transition-all duration-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 relative overflow-hidden group w-full sm:w-auto"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(236, 72, 153, 0.9) 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
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
