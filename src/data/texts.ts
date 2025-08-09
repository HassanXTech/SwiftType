// Define types inline to avoid import issues
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface TypingText {
  id: string;
  content: string;
  difficulty: Difficulty;
  category: string;
  language: string;
  author?: string;
  source?: string;
}

export const typingTexts: TypingText[] = [
  // Beginner Level
  {
    id: 'beginner-1',
    content: 'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.',
    difficulty: 'beginner',
    category: 'pangram',
    language: 'en',
  },
  {
    id: 'beginner-2',
    content: 'Practice makes perfect. Start with simple words and build your speed gradually.',
    difficulty: 'beginner',
    category: 'motivational',
    language: 'en',
  },
  {
    id: 'beginner-3',
    content: 'Typing is a valuable skill in the digital age. It helps you communicate faster and more efficiently.',
    difficulty: 'beginner',
    category: 'educational',
    language: 'en',
  },
  
  // Intermediate Level
  {
    id: 'intermediate-1',
    content: 'Technology has revolutionized the way we work, communicate, and live our daily lives. From smartphones to artificial intelligence, innovation continues to shape our future.',
    difficulty: 'intermediate',
    category: 'technology',
    language: 'en',
  },
  {
    id: 'intermediate-2',
    content: 'The art of programming requires patience, logical thinking, and attention to detail. Every line of code serves a purpose in creating functional software.',
    difficulty: 'intermediate',
    category: 'programming',
    language: 'en',
  },
  {
    id: 'intermediate-3',
    content: 'Climate change is one of the most pressing challenges of our time. Sustainable practices and renewable energy sources are crucial for our planet\'s future.',
    difficulty: 'intermediate',
    category: 'environment',
    language: 'en',
  },
  
  // Advanced Level
  {
    id: 'advanced-1',
    content: 'Quantum computing represents a paradigm shift in computational capabilities, leveraging quantum mechanical phenomena such as superposition and entanglement to process information in fundamentally different ways than classical computers.',
    difficulty: 'advanced',
    category: 'science',
    language: 'en',
  },
  {
    id: 'advanced-2',
    content: 'The implementation of machine learning algorithms requires careful consideration of data preprocessing, feature engineering, model selection, hyperparameter tuning, and validation methodologies to ensure robust and generalizable results.',
    difficulty: 'advanced',
    category: 'machine-learning',
    language: 'en',
  },
  {
    id: 'advanced-3',
    content: 'Cryptocurrency and blockchain technology have introduced decentralized financial systems that challenge traditional banking paradigms, offering transparency, immutability, and peer-to-peer transactions without intermediaries.',
    difficulty: 'advanced',
    category: 'finance',
    language: 'en',
  },
  
  // Expert Level
  {
    id: 'expert-1',
    content: 'The epistemological implications of artificial general intelligence necessitate a comprehensive reevaluation of consciousness, cognition, and the fundamental nature of intelligence itself, challenging anthropocentric assumptions about sentience and self-awareness.',
    difficulty: 'expert',
    category: 'philosophy',
    language: 'en',
  },
  {
    id: 'expert-2',
    content: 'Bioinformatics algorithms for genomic sequence analysis employ sophisticated computational techniques including dynamic programming, hidden Markov models, and graph-based approaches to identify patterns, predict protein structures, and understand evolutionary relationships.',
    difficulty: 'expert',
    category: 'bioinformatics',
    language: 'en',
  },
  {
    id: 'expert-3',
    content: 'The phenomenological reduction in Husserlian philosophy involves the methodical suspension of the natural attitude toward existence, enabling the investigation of consciousness as it presents itself to itself, independent of metaphysical presuppositions.',
    difficulty: 'expert',
    category: 'philosophy',
    language: 'en',
  },
  
  // Programming Texts
  {
    id: 'programming-1',
    content: 'function calculateFibonacci(n) { if (n <= 1) return n; return calculateFibonacci(n - 1) + calculateFibonacci(n - 2); }',
    difficulty: 'intermediate',
    category: 'code',
    language: 'en',
  },
  {
    id: 'programming-2',
    content: 'const users = await fetch("/api/users").then(res => res.json()); const activeUsers = users.filter(user => user.isActive);',
    difficulty: 'intermediate',
    category: 'code',
    language: 'en',
  },
  {
    id: 'programming-3',
    content: 'class BinarySearchTree { constructor() { this.root = null; } insert(value) { this.root = this.insertNode(this.root, value); } }',
    difficulty: 'advanced',
    category: 'code',
    language: 'en',
  },
];

export const getRandomText = (difficulty?: string, category?: string): TypingText => {
  let filteredTexts = typingTexts;
  
  if (difficulty) {
    filteredTexts = filteredTexts.filter(text => text.difficulty === difficulty);
  }
  
  if (category) {
    filteredTexts = filteredTexts.filter(text => text.category === category);
  }
  
  if (filteredTexts.length === 0) {
    filteredTexts = typingTexts;
  }
  
  const randomIndex = Math.floor(Math.random() * filteredTexts.length);
  return filteredTexts[randomIndex];
};

export const getTextById = (id: string): TypingText | undefined => {
  return typingTexts.find(text => text.id === id);
};

export const getTextsByDifficulty = (difficulty: string): TypingText[] => {
  return typingTexts.filter(text => text.difficulty === difficulty);
};

export const getTextsByCategory = (category: string): TypingText[] => {
  return typingTexts.filter(text => text.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(typingTexts.map(text => text.category));
  return Array.from(categories);
};
