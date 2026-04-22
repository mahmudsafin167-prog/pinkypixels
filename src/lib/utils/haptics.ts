export const triggerHaptic = (duration: number = 50) => {
    // Check if the browser supports vibration
    if (typeof window !== 'undefined' && navigator.vibrate) {
        // 50ms is a very short, subtle physical "tick" rather than an annoying buzz.
        navigator.vibrate(duration);
    }
};
