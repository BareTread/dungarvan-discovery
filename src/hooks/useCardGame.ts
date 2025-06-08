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

    setGameState(prev => ({
      ...prev,
      selectedIndex: index,
      isRevealing: true,
      gamePhase: 'revealing'
    }));

    // Start the reveal sequence
    setTimeout(() => {
      // First flip the selected card
      setAnimationState(prev => ({
        ...prev,
        flipStates: prev.flipStates.map((state, i) => i === index ? true : state)
      }));

      // Then flip the other cards with stagger
      setTimeout(() => {
        setAnimationState(prev => ({
          ...prev,
          flipStates: prev.flipStates.map((state, i) => i === index ? state : true)
        }));

        // Mark as complete
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            isRevealing: false,
            gamePhase: 'complete'
          }));
        }, ANIMATION_TIMINGS.FLIP_DURATION);
      }, ANIMATION_TIMINGS.FLIP_DURATION + ANIMATION_TIMINGS.REVEAL_STAGGER);
    }, ANIMATION_TIMINGS.SELECTION_DELAY);
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
