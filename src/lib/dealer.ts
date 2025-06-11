import { Activity, activities } from './activities';

export class CardDealer {
  private usedCards: Set<string> = new Set();
  private readonly DECK_RESET_THRESHOLD = 0.7; // Reset after 70% of cards are used

  /**
   * Deal a balanced hand of 5 cards with varied categories.
   */
  dealBalancedHand(): Activity[] {
    if (this.usedCards.size > activities.length * this.DECK_RESET_THRESHOLD) {
      this.reset();
    }

    const availableCards = activities.filter(activity => !this.usedCards.has(activity.id));

    // Shuffle the available cards
    availableCards.sort(() => Math.random() - 0.5);

    const hand: Activity[] = [];
    const usedCategories = new Set<Activity['category']>();

    // Prioritize unique categories
    for (const card of availableCards) {
        if (hand.length >= 5) break;
        if (!usedCategories.has(card.category)) {
            hand.push(card);
            usedCategories.add(card.category);
        }
    }

    // Fill the rest of the hand if needed
    if (hand.length < 5) {
        const remainingCards = availableCards.filter(card => !hand.some(h => h.id === card.id));
        hand.push(...remainingCards.slice(0, 5 - hand.length));
    }

    hand.forEach(card => this.usedCards.add(card.id));
    return hand;
  }

  reset(): void {
    this.usedCards.clear();
  }
}

export const cardDealer = new CardDealer();

// UTILITY FUNCTIONS
export function getCategoryGradient(category: Activity['category']): string {
  const gradients = {
    adventure: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    coastal: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    foodie: 'linear-gradient(135deg, #F97316, #C2410C)',
    heritage: 'linear-gradient(135deg, #A855F7, #7E22CE)',
    hidden: 'linear-gradient(135deg, #EC4899, #BE185D)',
    culture: 'linear-gradient(135deg, #10B981, #047857)',
  };
  return gradients[category];
}

export function formatDuration(duration: string): string {
  return duration.replace('-', '–');
}

export const getTimeEmoji = (bestTime?: Activity['bestTime']) => {
  const emojis = { dawn: '🌅', morning: '🌄', afternoon: '☀️', sunset: '🌇', night: '🌙' };
  return bestTime ? emojis[bestTime] : '⏰';
};

export const getDifficultyEmoji = (difficulty?: Activity['difficulty']) => {
  const emojis = { easy: '🟢', moderate: '🟡', challenging: '🔴' };
  return difficulty ? emojis[difficulty] : '⚪️';
};

export const getCostEmoji = (cost?: Activity['cost']) => {
  const emojis = { free: 'Free', low: '€', medium: '€€', high: '€€€' };
  return cost ? emojis[cost] : '';
};
