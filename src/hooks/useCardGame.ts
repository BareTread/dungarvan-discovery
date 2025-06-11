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

  const selectCard = useCallback((index: number) => {
    if (gameState.gamePhase !== 'selecting' || gameState.selectedIndex !== null) return;

    setGameState(prev => ({
      ...prev,
      selectedIndex: index,
      gamePhase: 'revealing',
      flipStates: Array(5).fill(true) // Flip all cards at once
    }));

    // Transition to the final layout after the flip animation has had time to complete.
    setTimeout(() => {
        setGameState(prev => ({ ...prev, gamePhase: 'complete' }));
    }, 2000); // Increased delay for a smoother visual transition
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
