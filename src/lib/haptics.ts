/**
 * Haptic feedback utilities for enhanced mobile experience
 */

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification' | 'success';

// Extend Navigator interface for haptic feedback
interface NavigatorWithHaptics extends Navigator {
  hapticFeedback?: {
    impactOccurred: (intensity: 'light' | 'medium' | 'heavy') => void;
    selectionChanged: () => void;
    notificationOccurred: (type: 'success' | 'warning' | 'error') => void;
  };
}

/**
 * Trigger haptic feedback on supported devices
 */
export function triggerHaptic(pattern: HapticPattern = 'light'): void {
  // Check if device supports haptic feedback
  if (!('vibrate' in navigator)) {
    return;
  }

  // Modern iOS devices with Haptic Engine
  const nav = navigator as NavigatorWithHaptics;
  if ('hapticFeedback' in nav && nav.hapticFeedback) {
    try {
      switch (pattern) {
        case 'light':
          nav.hapticFeedback.impactOccurred('light');
          break;
        case 'medium':
          nav.hapticFeedback.impactOccurred('medium');
          break;
        case 'heavy':
          nav.hapticFeedback.impactOccurred('heavy');
          break;
        case 'selection':
          nav.hapticFeedback.selectionChanged();
          break;
        case 'notification':
          nav.hapticFeedback.notificationOccurred('success');
          break;
        case 'success':
          nav.hapticFeedback.notificationOccurred('success');
          break;
        default:
          nav.hapticFeedback.impactOccurred('light');
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
    success: [50, 50, 50],
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
