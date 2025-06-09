import { useState, useCallback } from 'react';
import { cardDealer, GameState, ANIMATION_TIMINGS } from '@/lib/dealer';

export function useCardGame() {
  const [gameState, setGameState] = useState<GameState>({
    dealtCards: [],
    selectedIndex: null,
    isRevealing: false,
    gamePhase: 'dealing'
  });

  const [animationState, setAnimationState] = useState({
    flipStates: [false, false, false, false, false],
    hoveredIndex: null as number | null,
    isDealing: false
  });

  /**
   * Deal a new hand of cards
   */
  const dealNewHand = useCallback(() => {
    setAnimationState(prev => ({ ...prev, isDealing: true }));
    
    // Reset game state
    setGameState({
      dealtCards: [],
      selectedIndex: null,
      isRevealing: false,
      gamePhase: 'dealing'
    });

    // Reset flip states
    setAnimationState(prev => ({
      ...prev,
      flipStates: [false, false, false, false, false]
    }));

    // Deal new cards after a brief delay
    setTimeout(() => {
      const newCards = cardDealer.dealBalancedHand();
      setGameState(prev => ({
        ...prev,
        dealtCards: newCards,
        gamePhase: 'selecting'
      }));
      
      setAnimationState(prev => ({ ...prev, isDealing: false }));
    }, 200);
  }, []);

  /**
   * Select a card and trigger reveal sequence
   */
  const selectCard = useCallback((index: number) => {
    if (gameState.isRevealing || gameState.selectedIndex !== null) return;

    // Phase 1: Mark card as selected, start revealing, and flip immediately
    setGameState(prev => ({
      ...prev,
      selectedIndex: index,
      isRevealing: true,
      gamePhase: 'revealing'
    }));

    // Phase 2: Flip the selected card immediately (no delay)
    setAnimationState(prev => ({
      ...prev,
      flipStates: prev.flipStates.map((state, i) => i === index ? true : state)
    }));

    // Phase 3: Pause to let user see the selected card content
    setTimeout(() => {
      // Phase 4: Flip the other cards one by one
      const otherIndices = [0, 1, 2, 3, 4].filter(i => i !== index);

      otherIndices.forEach((cardIndex, staggerIndex) => {
        setTimeout(() => {
          setAnimationState(prev => ({
            ...prev,
            flipStates: prev.flipStates.map((state, i) =>
              i === cardIndex ? true : state
            )
          }));
        }, staggerIndex * ANIMATION_TIMINGS.REVEAL_STAGGER);
      });

      // Phase 5: After all cards are flipped, transition to final layout
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          isRevealing: false,
          gamePhase: 'complete'
        }));
      }, otherIndices.length * ANIMATION_TIMINGS.REVEAL_STAGGER + ANIMATION_TIMINGS.LAYOUT_TRANSITION);

    }, ANIMATION_TIMINGS.PAUSE_AFTER_FLIP);
  }, [gameState.isRevealing, gameState.selectedIndex]);

  /**
   * Reset the entire game
   */
  const resetGame = useCallback(() => {
    cardDealer.reset();
    setGameState({
      dealtCards: [],
      selectedIndex: null,
      isRevealing: false,
      gamePhase: 'dealing'
    });
    setAnimationState({
      flipStates: [false, false, false, false, false],
      hoveredIndex: null,
      isDealing: false
    });
  }, []);

  /**
   * Set hovered card for animations
   */
  const setHoveredCard = useCallback((index: number | null) => {
    if (gameState.isRevealing) return;
    setAnimationState(prev => ({ ...prev, hoveredIndex: index }));
  }, [gameState.isRevealing]);

  /**
   * Get the selected activity
   */
  const selectedActivity = gameState.selectedIndex !== null 
    ? gameState.dealtCards[gameState.selectedIndex] 
    : null;

  /**
   * Get the rejected activities (non-selected cards)
   */
  const rejectedActivities = gameState.selectedIndex !== null
    ? gameState.dealtCards.filter((_, index) => index !== gameState.selectedIndex)
    : [];

  /**
   * Check if a card can be selected
   */
  const canSelectCard = (index: number): boolean => {
    return gameState.gamePhase === 'selecting' && 
           !gameState.isRevealing && 
           gameState.selectedIndex === null &&
           index < gameState.dealtCards.length;
  };

  /**
   * Check if a card is flipped
   */
  const isCardFlipped = (index: number): boolean => {
    return animationState.flipStates[index] || false;
  };

  /**
   * Check if a card is hovered
   */
  const isCardHovered = (index: number): boolean => {
    return animationState.hoveredIndex === index;
  };

  /**
   * Get game statistics
   */
  const getGameStats = useCallback(() => {
    return {
      ...cardDealer.getStats(),
      currentHand: gameState.dealtCards.length,
      hasSelection: gameState.selectedIndex !== null,
      isComplete: gameState.gamePhase === 'complete'
    };
  }, [gameState]);

  return {
    // Game state
    gameState,
    animationState,
    
    // Derived state
    selectedActivity,
    rejectedActivities,
    
    // Actions
    dealNewHand,
    selectCard,
    resetGame,
    setHoveredCard,
    
    // Helpers
    canSelectCard,
    isCardFlipped,
    isCardHovered,
    getGameStats,
    
    // Computed properties
    hasCards: gameState.dealtCards.length > 0,
    isDealing: animationState.isDealing,
    isSelecting: gameState.gamePhase === 'selecting',
    isRevealing: gameState.isRevealing,
    isComplete: gameState.gamePhase === 'complete',
    canDealNewHand: gameState.gamePhase === 'complete' || gameState.dealtCards.length === 0
  };
}
