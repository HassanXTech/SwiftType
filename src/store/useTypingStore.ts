import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types inline to avoid import issues
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type TestMode = 'time' | 'words' | 'custom';
type Theme = 'light' | 'dark' | 'neon' | 'retro';

interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
  charactersTyped: number;
  correctCharacters: number;
  grossWpm?: number;
}

interface TypingText {
  id: string;
  content: string;
  difficulty: Difficulty;
  category: string;
  language: string;
  author?: string;
  source?: string;
}

interface GameSettings {
  difficulty: Difficulty;
  mode: TestMode;
  timeLimit: number;
  wordLimit: number;
  showKeyboard: boolean;
  soundEnabled: boolean;
  theme: Theme;
  fontSize: number;
}

interface TypingState {
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

interface User {
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
  achievements: string[];
  createdAt: Date;
}

interface TestResult {
  id: string;
  date: Date;
  stats: TypingStats;
  textId: string;
  difficulty: Difficulty;
  mode: TestMode;
}

interface TypingStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Game settings
  settings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;
  
  // Typing state
  typingState: TypingState;
  setTypingState: (state: Partial<TypingState>) => void;
  resetTypingState: () => void;
  
  // Test results
  testResults: TestResult[];
  addTestResult: (result: TestResult) => void;
  
  // Statistics
  calculateStats: (input: string, text: string, startTime: number, endTime: number) => TypingStats;
  
  // Actions
  startTest: () => void;
  endTest: () => void;
  updateInput: (input: string) => void;
}

const defaultSettings: GameSettings = {
  difficulty: 'intermediate',
  mode: 'time',
  timeLimit: 60,
  wordLimit: 50,
  showKeyboard: true,
  soundEnabled: true,
  theme: 'dark',
  fontSize: 18,
};

const defaultTypingState: TypingState = {
  currentText: {
    id: '',
    content: '',
    difficulty: 'intermediate',
    category: 'general',
    language: 'en',
  },
  userInput: '',
  currentIndex: 0,
  isActive: false,
  isCompleted: false,
  startTime: null,
  endTime: null,
  errors: [],
  stats: {
    wpm: 0,
    accuracy: 0,
    errors: 0,
    timeElapsed: 0,
    charactersTyped: 0,
    correctCharacters: 0,
  },
};

export const useTypingStore = create<TypingStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      
      typingState: defaultTypingState,
      setTypingState: (newState) =>
        set((state) => ({
          typingState: { ...state.typingState, ...newState },
        })),
      resetTypingState: () => set((state) => ({
        typingState: {
          ...defaultTypingState,
          currentText: state.typingState.currentText, // Keep the current text
        }
      })),
      
      testResults: [],
      addTestResult: (result) =>
        set((state) => ({
          testResults: [result, ...state.testResults].slice(0, 100), // Keep last 100 results
        })),
      
      calculateStats: (input, text, startTime, endTime) => {
        const timeElapsed = (endTime - startTime) / 1000; // in seconds
        const timeElapsedMinutes = timeElapsed / 60;

        // Count correct and incorrect characters
        let correctCharacters = 0;
        let errors = 0;
        const charactersTyped = input.length;

        // Compare each character typed with the expected character
        for (let i = 0; i < input.length; i++) {
          if (i < text.length && input[i] === text[i]) {
            correctCharacters++;
          } else {
            errors++;
          }
        }

        // Calculate accuracy: (correct characters / total characters typed) * 100
        const accuracy = charactersTyped > 0 ? (correctCharacters / charactersTyped) * 100 : 100;

        // Calculate WPM: (correct characters / 5) / time in minutes
        // Standard WPM calculation uses 5 characters per word
        const wpm = timeElapsedMinutes > 0 ? (correctCharacters / 5) / timeElapsedMinutes : 0;

        // Calculate gross WPM (including errors) for comparison
        const grossWpm = timeElapsedMinutes > 0 ? (charactersTyped / 5) / timeElapsedMinutes : 0;

        return {
          wpm: Math.round(Math.max(0, wpm)),
          accuracy: Math.round(accuracy * 100) / 100,
          errors,
          timeElapsed: Math.round(timeElapsed),
          charactersTyped,
          correctCharacters,
          grossWpm: Math.round(Math.max(0, grossWpm)),
        };
      },
      
      startTest: () => {
        const now = Date.now();
        set((state) => ({
          typingState: {
            ...state.typingState,
            isActive: true,
            startTime: now,
            userInput: '',
            currentIndex: 0,
            errors: [],
          },
        }));
      },
      
      endTest: () => {
        const state = get();
        const now = Date.now();
        
        if (state.typingState.startTime) {
          const stats = state.calculateStats(
            state.typingState.userInput,
            state.typingState.currentText.content,
            state.typingState.startTime,
            now
          );
          
          set((prevState) => ({
            typingState: {
              ...prevState.typingState,
              isActive: false,
              isCompleted: true,
              endTime: now,
              stats,
            },
          }));
        }
      },
      
      updateInput: (input) => {
        const state = get();
        const { typingState, settings } = state;
        const { currentText } = typingState;

        // Start test if not already started
        if (!typingState.isActive && !typingState.startTime) {
          state.startTest();
        }

        // Check if test is completed
        if (input.length >= currentText.content.length) {
          state.endTest();
          return;
        }

        // Check time limit
        if (typingState.startTime && settings.mode === 'time') {
          const elapsed = (Date.now() - typingState.startTime) / 1000;
          if (elapsed >= settings.timeLimit) {
            state.endTest();
            return;
          }
        }

        set((prevState) => ({
          typingState: {
            ...prevState.typingState,
            userInput: input,
            currentIndex: input.length,
          },
        }));
      },
    }),
    {
      name: 'SwiftType-store',
      partialize: (state) => ({
        user: state.user,
        settings: state.settings,
        testResults: state.testResults,
      }),
    }
  )
);
