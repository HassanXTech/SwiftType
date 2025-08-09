export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
  charactersTyped: number;
  correctCharacters: number;
}

export interface TestResult {
  id: string;
  date: Date;
  stats: TypingStats;
  textId: string;
  difficulty: Difficulty;
  mode: TestMode;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  level: number;
  experience: number;
  totalTests: number;
  bestWpm: number;
  averageWpm: number;
  averageAccuracy: number;
  achievements: Achievement[];
  createdAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface TypingText {
  id: string;
  content: string;
  difficulty: Difficulty;
  category: string;
  language: string;
  author?: string;
  source?: string;
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type TestMode = 'time' | 'words' | 'custom';
export type Theme = 'light' | 'dark' | 'neon' | 'retro';

export interface GameSettings {
  difficulty: Difficulty;
  mode: TestMode;
  timeLimit: number; // in seconds
  wordLimit: number;
  showKeyboard: boolean;
  soundEnabled: boolean;
  theme: Theme;
  fontSize: number;
}

export interface TypingState {
  currentText: TypingText;
  userInput: string;
  currentIndex: number;
  isActive: boolean;
  isCompleted: boolean;
  startTime: number | null;
  endTime: number | null;
  errors: number[];
  stats: TypingStats;
}

export interface LeaderboardEntry {
  rank: number;
  user: Pick<User, 'id' | 'username' | 'avatar'>;
  wpm: number;
  accuracy: number;
  date: Date;
}
