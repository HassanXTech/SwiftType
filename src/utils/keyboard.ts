// Keyboard utility functions for SwiftType

export const playKeySound = (isCorrect: boolean, soundEnabled: boolean = true) => {
  if (!soundEnabled) return;
  
  try {
    // Create audio context for key sounds
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for correct/incorrect
    oscillator.frequency.setValueAtTime(isCorrect ? 800 : 400, audioContext.currentTime);
    oscillator.type = 'sine';
    
    // Volume and duration
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch {
    // Silently fail if audio context is not supported
    console.warn('Audio context not supported');
  }
};

export const getKeyboardLayout = () => {
  const qwertyLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    [' '] // spacebar
  ];
  
  return qwertyLayout;
};

export const getFingerForKey = (key: string): string => {
  const fingerMap: { [key: string]: string } = {
    // Left hand
    '`': 'left-pinky', '1': 'left-pinky', 'q': 'left-pinky', 'a': 'left-pinky', 'z': 'left-pinky',
    '2': 'left-ring', 'w': 'left-ring', 's': 'left-ring', 'x': 'left-ring',
    '3': 'left-middle', 'e': 'left-middle', 'd': 'left-middle', 'c': 'left-middle',
    '4': 'left-index', '5': 'left-index', 'r': 'left-index', 't': 'left-index', 
    'f': 'left-index', 'g': 'left-index', 'v': 'left-index', 'b': 'left-index',
    
    // Right hand
    '6': 'right-index', '7': 'right-index', 'y': 'right-index', 'u': 'right-index',
    'h': 'right-index', 'j': 'right-index', 'n': 'right-index', 'm': 'right-index',
    '8': 'right-middle', 'i': 'right-middle', 'k': 'right-middle', ',': 'right-middle',
    '9': 'right-ring', 'o': 'right-ring', 'l': 'right-ring', '.': 'right-ring',
    '0': 'right-pinky', '-': 'right-pinky', '=': 'right-pinky', 'p': 'right-pinky',
    '[': 'right-pinky', ']': 'right-pinky', '\\': 'right-pinky', ';': 'right-pinky',
    "'": 'right-pinky', '/': 'right-pinky',
    
    // Space
    ' ': 'thumb'
  };
  
  return fingerMap[key.toLowerCase()] || 'unknown';
};

export const isSpecialKey = (key: string): boolean => {
  const specialKeys = [
    'Backspace', 'Delete', 'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'Meta',
    'CapsLock', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'F1', 'F2', 'F3', 'F4',
    'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
  ];
  
  return specialKeys.includes(key);
};

export const normalizeKey = (key: string): string => {
  // Handle special cases
  if (key === 'Enter') return '\n';
  if (key === 'Tab') return '\t';
  if (key === ' ') return ' ';
  
  // Return the key as-is for normal characters
  return key;
};

export const calculateKeyDistance = (key1: string, key2: string): number => {
  const layout = getKeyboardLayout();
  let pos1 = { row: -1, col: -1 };
  let pos2 = { row: -1, col: -1 };
  
  // Find positions of both keys
  for (let row = 0; row < layout.length; row++) {
    for (let col = 0; col < layout[row].length; col++) {
      if (layout[row][col] === key1.toLowerCase()) {
        pos1 = { row, col };
      }
      if (layout[row][col] === key2.toLowerCase()) {
        pos2 = { row, col };
      }
    }
  }
  
  // Calculate Euclidean distance
  if (pos1.row !== -1 && pos2.row !== -1) {
    return Math.sqrt(
      Math.pow(pos2.row - pos1.row, 2) + Math.pow(pos2.col - pos1.col, 2)
    );
  }
  
  return 0;
};

export const getTypingDifficulty = (text: string): number => {
  let difficulty = 0;
  const chars = text.toLowerCase().split('');
  
  for (let i = 0; i < chars.length - 1; i++) {
    const current = chars[i];
    const next = chars[i + 1];
    
    // Add difficulty based on key distance
    difficulty += calculateKeyDistance(current, next);
    
    // Add difficulty for special characters
    if (!/[a-z0-9\s]/.test(current)) {
      difficulty += 2;
    }
    
    // Add difficulty for same finger usage
    if (getFingerForKey(current) === getFingerForKey(next) && current !== next) {
      difficulty += 1;
    }
  }
  
  return Math.round(difficulty / text.length * 10) / 10;
};

export const getKeyboardShortcuts = () => {
  return {
    'Ctrl+R': 'Restart test',
    'Ctrl+N': 'New test',
    'Escape': 'Reset current test',
    'Tab': 'Focus typing area',
    'Ctrl+S': 'Save results',
    'Ctrl+/': 'Show shortcuts',
  };
};
