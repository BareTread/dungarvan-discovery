import { useState, useCallback } from 'react';
import { cardDealer } from '@/lib/dealer';
import { triggerHaptic } from '@/lib/haptics';
import type { Activity } from '@/lib/activities';

export type GamePhase = 'welcome' | 'dealing' | 'selecting' | 'revealing' | 'complete';

interface GameState {
  dealtCards: Activity[];
  selectedIndex: number | null;
  gamePhase: GamePhase;
  flipStates: boolean[];
  hoveredIndex: number | null;
}

const INITIAL_STATE: GameState = {
  dealtCards: [], selectedIndex: null, gamePhase: 'welcome',
  flipStates: Array(5).fill(false), hoveredIndex: null,
};

export function useCardGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isDealing, setIsDealing] = useState(false);

  const dealNewHand = useCallback(() => {
    setIsDealing(true);
    triggerHaptic('medium');
    setTimeout(() => {
      const newCards = cardDealer.dealBalancedHand();
      setGameState({ ...INITIAL_STATE, dealtCards: newCards, gamePhase: 'dealing' });
      setIsDealing(false);
    }, 300);
  }, []);

  const finishDealing = useCallback(() => setGameState(prev => ({ ...prev, gamePhase: 'selecting' })), []);

  const selectCard = useCallback((index: number) => {
    if (gameState.gamePhase !== 'selecting') return;
    triggerHaptic('heavy');
    setGameState(prev => ({
      ...prev, selectedIndex: index, gamePhase: 'revealing',
      flipStates: prev.flipStates.map((_, i) => i === index),
    }));
  }, [gameState.gamePhase]);

  const finishRevealing = useCallback(() => {
    triggerHaptic('notification');
    setGameState(prev => ({ ...prev, gamePhase: 'complete' }));
  }, []);

  const resetGame = useCallback(() => {
    cardDealer.reset();
    setGameState(INITIAL_STATE);
  }, []);

  const setHoveredCard = useCallback((index: number | null) => {
    if (gameState.gamePhase === 'selecting') {
      if (index !== null) triggerHaptic('light');
      setGameState(prev => ({ ...prev, hoveredIndex: index }));
    }
  }, [gameState.gamePhase]);

  const canSelectCard = (index: number): boolean => gameState.gamePhase === 'selecting';

  return {
    gameState, isDealing, hasCards: gameState.dealtCards.length > 0,
    isComplete: gameState.gamePhase === 'complete',
    dealNewHand, finishDealing, selectCard, finishRevealing,
    resetGame, setHoveredCard, canSelectCard,
  };
}
