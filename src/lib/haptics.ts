/**
 * Haptic feedback utilities for enhanced mobile experience
 */

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification';

/**
 * Trigger haptic feedback on supported devices
 */
export function triggerHaptic(pattern: HapticPattern = 'light'): void {
  // Check if device supports haptic feedback
  if (!('vibrate' in navigator)) {
    return;
  }

  // Modern iOS devices with Haptic Engine
  if ('hapticFeedback' in navigator) {
    try {
      switch (pattern) {
        case 'light':
          (navigator as any).hapticFeedback.impactOccurred('light');
          break;
        case 'medium':
          (navigator as any).hapticFeedback.impactOccurred('medium');
          break;
        case 'heavy':
          (navigator as any).hapticFeedback.impactOccurred('heavy');
          break;
        case 'selection':
          (navigator as any).hapticFeedback.selectionChanged();
          break;
        case 'notification':
          (navigator as any).hapticFeedback.notificationOccurred('success');
          break;
        default:
          (navigator as any).hapticFeedback.impactOccurred('light');
      }
      return;
    } catch (error) {
      console.debug('Haptic feedback not available:', error);
    }
  }

  // Fallback to vibration API
  const vibrationPatterns: Record<HapticPattern, number | number[]> = {
    light: 10,
    medium: 20,
    heavy: 50,
    selection: [10, 10, 10],
    impact: 30,
    notification: [50, 50, 50],
  };

  try {
    navigator.vibrate(vibrationPatterns[pattern]);
  } catch (error) {
    console.debug('Vibration not available:', error);
  }
}

/**
 * Check if haptic feedback is supported
 */
export function isHapticSupported(): boolean {
  return 'vibrate' in navigator || 'hapticFeedback' in navigator;
}

/**
 * Haptic feedback for card interactions
 */
export const cardHaptics = {
  deal: () => triggerHaptic('medium'),
  select: () => triggerHaptic('selection'),
  flip: () => triggerHaptic('light'),
  hover: () => triggerHaptic('light'),
  success: () => triggerHaptic('notification'),
} as const;
