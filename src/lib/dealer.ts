import { Activity, activities } from './activities';

export interface GameState {
  dealtCards: Activity[];
  selectedIndex: number | null;
  isRevealing: boolean;
  gamePhase: 'dealing' | 'selecting' | 'revealing' | 'complete';
}

export class CardDealer {
  private usedCards: Set<string> = new Set();

  /**
   * Deal a fresh hand of 5 cards, ensuring no duplicates from recent hands
   */
  dealNewHand(): Activity[] {
    // If we've used more than half the deck, reset to avoid repetition
    if (this.usedCards.size > activities.length / 2) {
      this.usedCards.clear();
    }

    const availableCards = activities.filter(
      activity => !this.usedCards.has(activity.id)
    );

    // Shuffle available cards
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    
    // Take first 5 cards
    const hand = shuffled.slice(0, 5);
    
    // Mark these cards as used
    hand.forEach(card => this.usedCards.add(card.id));
    
    return hand;
  }

  /**
   * Get a balanced hand with variety across categories
   */
  dealBalancedHand(): Activity[] {
    const categories: Activity['category'][] = ['adventure', 'coastal', 'foodie', 'heritage', 'hidden', 'culture'];
    const hand: Activity[] = [];
    const usedCategories = new Set<Activity['category']>();

    // Try to get one card from each category first
    for (const category of categories) {
      if (hand.length >= 5) break;
      
      const categoryCards = activities.filter(
        activity => 
          activity.category === category && 
          !this.usedCards.has(activity.id) &&
          !hand.includes(activity)
      );
      
      if (categoryCards.length > 0) {
        const randomCard = categoryCards[Math.floor(Math.random() * categoryCards.length)];
        hand.push(randomCard);
        usedCategories.add(category);
      }
    }

    // Fill remaining slots with any available cards
    while (hand.length < 5) {
      const availableCards = activities.filter(
        activity => 
          !this.usedCards.has(activity.id) && 
          !hand.includes(activity)
      );
      
      if (availableCards.length === 0) {
        // Reset if we run out of cards
        this.usedCards.clear();
        return this.dealBalancedHand();
      }
      
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      hand.push(randomCard);
    }

    // Mark cards as used
    hand.forEach(card => this.usedCards.add(card.id));
    
    // Shuffle the final hand so categories aren't predictable
    return hand.sort(() => Math.random() - 0.5);
  }

  /**
   * Reset the dealer state
   */
  reset(): void {
    this.usedCards.clear();
  }

  /**
   * Get statistics about card usage
   */
  getStats() {
    return {
      totalCards: activities.length,
      usedCards: this.usedCards.size,
      remainingCards: activities.length - this.usedCards.size,
      usagePercentage: Math.round((this.usedCards.size / activities.length) * 100)
    };
  }
}

// Singleton instance
export const cardDealer = new CardDealer();

/**
 * Animation timing constants - Improved for better UX
 */
export const ANIMATION_TIMINGS = {
  DEAL_STAGGER: 150, // ms between each card appearing
  DEAL_DURATION: 800, // ms for each card to animate in
  FLIP_DURATION: 800, // ms for card flip animation (slower to see content)
  SELECTION_DELAY: 300, // ms before starting flip sequence
  REVEAL_STAGGER: 200, // ms between revealing other cards
  PAUSE_AFTER_FLIP: 2000, // ms to pause and show selected card
  LAYOUT_TRANSITION: 800, // ms for final layout transition
  TOTAL_DEAL_TIME: 1500, // Total time for dealing animation
  TOTAL_REVEAL_TIME: 4000, // Total time for reveal sequence
} as const;

/**
 * Get category gradient for styling
 */
export function getCategoryGradient(category: Activity['category']): string {
  const gradients = {
    adventure: 'var(--adventure)',
    coastal: 'var(--coastal)',
    foodie: 'var(--foodie)',
    heritage: 'var(--heritage)',
    hidden: 'var(--hidden)',
    culture: 'var(--culture)',
  };
  
  return gradients[category];
}

/**
 * Get category color for UI elements
 */
export function getCategoryColor(category: Activity['category']): string {
  const colors = {
    adventure: 'from-blue-500 to-cyan-500',
    coastal: 'from-cyan-500 to-blue-400',
    foodie: 'from-orange-500 to-red-500',
    heritage: 'from-purple-500 to-pink-500',
    hidden: 'from-pink-500 to-rose-500',
    culture: 'from-emerald-500 to-teal-500',
  };
  
  return colors[category];
}

/**
 * Format duration for display
 */
export function formatDuration(duration: string): string {
  return duration.replace(/(\d+)-(\d+)/, '$1–$2');
}

/**
 * Get time of day emoji
 */
export function getTimeEmoji(bestTime?: Activity['bestTime']): string {
  const timeEmojis = {
    dawn: '🌅',
    morning: '🌄',
    afternoon: '☀️',
    sunset: '🌅',
    night: '🌙',
  };
  
  return bestTime ? timeEmojis[bestTime] : '⏰';
}

/**
 * Get difficulty emoji
 */
export function getDifficultyEmoji(difficulty?: Activity['difficulty']): string {
  const difficultyEmojis = {
    easy: '🟢',
    moderate: '🟡',
    challenging: '🔴',
  };

  return difficulty ? difficultyEmojis[difficulty] : '⚪';
}

/**
 * Get cost emoji
 */
export function getCostEmoji(cost?: Activity['cost']): string {
  const costEmojis = {
    free: '🆓',
    low: '💰',
    medium: '💰💰',
    high: '💰💰💰',
  };

  return cost ? costEmojis[cost] : '';
}
