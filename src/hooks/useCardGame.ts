import { useState, useCallback } from 'react';
import { cardDealer } from '@/lib/dealer';
import type { Activity } from '@/lib/activities';

// A single, unified state interface for simplicity and reliability.
interface GameState {
  dealtCards: Activity[];
  selectedIndex: number | null;
  gamePhase: 'welcome' | 'selecting' | 'revealing' | 'complete';
  flipStates: boolean[];
  hoveredIndex: number | null;
}

const INITIAL_STATE: GameState = {
  dealtCards: [],
  selectedIndex: null,
  gamePhase: 'welcome',
  flipStates: Array(5).fill(false),
  hoveredIndex: null,
};

export function useCardGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isDealing, setIsDealing] = useState(false);

  // Deals a new hand and resets the game to the 'selecting' phase.
  const dealNewHand = useCallback(() => {
    setIsDealing(true);
    const newCards = cardDealer.dealBalancedHand();
    setGameState({
      ...INITIAL_STATE,
      dealtCards: newCards,
      gamePhase: 'selecting',
    });
    setIsDealing(false);
  }, []);

  // Handles the entire card selection and reveal sequence.
  // No more setTimeouts! Framer Motion will handle delays in the components.
  const selectCard = useCallback((index: number) => {
    if (gameState.gamePhase !== 'selecting' || gameState.selectedIndex !== null) return;

    // 1. Immediately set the selected index and change phase.
    setGameState(prev => ({
      ...prev,
      selectedIndex: index,
      gamePhase: 'revealing',
    }));

    // 2. Flip all cards. The animation delay will be handled in the GameCard component.
    setGameState(prev => ({
        ...prev,
        flipStates: Array(5).fill(true)
    }));

    // 3. After a delay (handled by Framer Motion's `layout` transition), move to the complete phase.
    // We'll use a delayed state update to trigger the final layout change.
    setTimeout(() => {
        setGameState(prev => ({ ...prev, gamePhase: 'complete' }));
    }, 1500); // This single timeout ensures the layout animates after cards have flipped.
  }, [gameState.gamePhase, gameState.selectedIndex]);

  // Resets the game to the initial welcome screen.
  const resetGame = useCallback(() => {
    cardDealer.reset();
    setGameState(INITIAL_STATE);
  }, []);

  // Tracks which card is being hovered over.
  const setHoveredCard = useCallback((index: number | null) => {
    if (gameState.gamePhase === 'selecting') {
      setGameState(prev => ({ ...prev, hoveredIndex: index }));
    }
  }, [gameState.gamePhase]);

  // Determines if a card can be selected.
  const canSelectCard = (index: number): boolean => {
    return gameState.gamePhase === 'selecting' && index < gameState.dealtCards.length;
  };

  return {
    gameState,
    isDealing,
    hasCards: gameState.dealtCards.length > 0,
    isComplete: gameState.gamePhase === 'complete',
    dealNewHand,
    selectCard,
    resetGame,
    setHoveredCard,
    canSelectCard,
  };
}
