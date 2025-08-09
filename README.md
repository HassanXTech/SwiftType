# SwiftType - Master Your Typing Speed

A modern, responsive typing speed trainer built with React, TypeScript, and Tailwind CSS. Practice your typing skills with real-time feedback, customizable settings, and detailed performance analytics.

![SwiftType Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-blue)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Typing Test**: Practice with immediate visual feedback
- **Multiple Test Modes**: Time-based, word-based, and custom tests
- **Difficulty Levels**: Beginner, Intermediate, Advanced, and Expert texts
- **Live Statistics**: WPM, accuracy, and error tracking in real-time
- **Performance Analytics**: Detailed results with improvement suggestions

### 🎨 User Experience
- **Modern UI**: Clean, dark theme with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Visual Feedback**: Color-coded text for correct/incorrect typing
- **Sound Effects**: Optional keystroke sounds for better feedback
- **Customizable Settings**: Font size, test duration, and difficulty preferences

### 📊 Analytics & Progress
- **Detailed Results**: Comprehensive performance breakdown
- **Performance Levels**: Categorized skill levels with achievements
- **Error Analysis**: Track and improve on common mistakes
- **Progress Tracking**: Monitor improvement over time

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anomusly/SwiftType.git
   cd SwiftType
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start typing!

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Project Structure

```
src/
├── components/          # React components
│   ├── GameComplete.tsx # Results screen
│   ├── Header.tsx       # App header with controls
│   ├── SettingsModal.tsx# Settings configuration
│   └── TypingArea.tsx   # Main typing interface
├── data/
│   └── texts.ts         # Typing test content
├── store/
│   └── useTypingStore.ts# Zustand state management
├── types/
│   └── index.ts         # TypeScript type definitions
├── utils/
│   └── keyboard.ts      # Keyboard utilities and sounds
└── styles/
    └── index.css        # Global styles and Tailwind imports
```

### Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Zustand 5.0.7
- **Icons**: Lucide React 0.539.0
- **Notifications**: React Hot Toast 2.5.2
- **Build Tool**: Vite 7.1.0
- **Linting**: ESLint with TypeScript support

## 🎮 How to Use

1. **Start Typing**: Click anywhere in the text area or start typing immediately
2. **Track Progress**: Watch your WPM and accuracy update in real-time
3. **Complete Test**: Finish the text or reach the time/word limit
4. **View Results**: See detailed performance analytics and improvement tips
5. **Try Again**: Click "Start Over" to begin a new test

### Settings Options

- **Test Mode**: Choose between time-based, word-based, or custom tests
- **Difficulty**: Select from beginner to expert level texts
- **Time Limit**: Set custom time limits for timed tests
- **Word Limit**: Set custom word counts for word-based tests
- **Font Size**: Adjust text size for comfortable reading
- **Sound Effects**: Enable/disable keystroke sounds

## 🎯 Performance Levels

- **🏆 Exceptional**: 80+ WPM with 95%+ accuracy
- **🌟 Excellent**: 60+ WPM with 90%+ accuracy  
- **👍 Good**: 40+ WPM with 85%+ accuracy
- **📈 Fair**: 20+ WPM with 80%+ accuracy
- **💪 Keep Practicing**: Below 20 WPM or 80% accuracy

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Run `npm run lint` before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Inspired by popular typing trainers with a focus on user experience
- Thanks to the open-source community for the amazing tools and libraries

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/anomusly/SwiftType/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer: [Hassan XLY](https://github.com/AnomusLY)

---

**Happy Typing! 🚀**

Made with ❤️ by [Hassan XLY](https://github.com/AnomusLY)
