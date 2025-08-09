import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useTypingStore } from '../store/useTypingStore';

interface GameCompleteProps {
  onNewTest: () => void;
}

export const GameComplete: React.FC<GameCompleteProps> = ({ onNewTest }) => {
  const { typingState } = useTypingStore();
  const { stats } = typingState;

  const getPerformanceLevel = (wpm: number, accuracy: number) => {
    if (wpm >= 80 && accuracy >= 95) return { level: 'Exceptional', color: 'text-purple-400', emoji: '🏆' };
    if (wpm >= 60 && accuracy >= 90) return { level: 'Excellent', color: 'text-green-400', emoji: '🌟' };
    if (wpm >= 40 && accuracy >= 85) return { level: 'Good', color: 'text-blue-400', emoji: '👍' };
    if (wpm >= 20 && accuracy >= 80) return { level: 'Fair', color: 'text-yellow-400', emoji: '📈' };
    return { level: 'Keep Practicing', color: 'text-gray-400', emoji: '💪' };
  };

  const performance = getPerformanceLevel(stats.wpm, stats.accuracy);

  const improvements = [];
  if (stats.accuracy < 95) improvements.push('Focus on accuracy over speed');
  if (stats.wpm < 40) improvements.push('Practice regularly to build muscle memory');
  if (stats.errors > 5) improvements.push('Take your time with difficult words');

  return (
    <div className="p-8 text-center">
      {/* Header */}
      <div className="mb-8">
        <div className="text-6xl mb-4">{performance.emoji}</div>
        <h1 className="text-3xl font-light text-white mb-2">Test Complete!</h1>
        <p className={`text-lg ${performance.color} font-medium`}>
          {performance.level} Performance
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {/* WPM */}
        <div className="text-center">
          <div className="text-4xl font-light text-white mb-2">{stats.wpm}</div>
          <div className="text-gray-400 text-sm">Net WPM</div>
          {stats.grossWpm && stats.grossWpm !== stats.wpm && (
            <div className="text-xs text-gray-500 mt-1">Gross: {stats.grossWpm}</div>
          )}
        </div>

        {/* Accuracy */}
        <div className="text-center">
          <div className="text-4xl font-light text-white mb-2">{stats.accuracy}%</div>
          <div className="text-gray-400 text-sm">Accuracy</div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.correctCharacters}/{stats.charactersTyped} chars
          </div>
        </div>

        {/* Time */}
        <div className="text-center">
          <div className="text-4xl font-light text-white mb-2">{stats.timeElapsed}s</div>
          <div className="text-gray-400 text-sm">Time</div>
          {stats.errors > 0 && (
            <div className="text-xs text-red-400 mt-1">{stats.errors} errors</div>
          )}
        </div>
      </div>



      {/* Actions */}
      <div className="flex justify-center">
        <button
          onClick={onNewTest}
          className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Start Over</span>
        </button>
      </div>

      {/* Detailed Stats */}
      <div className="mt-8 bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Statistics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Characters Typed:</span>
            <span className="text-white">{stats.charactersTyped}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Correct Characters:</span>
            <span className="text-green-400">{stats.correctCharacters}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Errors:</span>
            <span className="text-red-400">{stats.errors}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Net WPM:</span>
            <span className="text-white">{stats.wpm}</span>
          </div>
          {stats.grossWpm && (
            <div className="flex justify-between">
              <span className="text-gray-400">Gross WPM:</span>
              <span className="text-gray-300">{stats.grossWpm}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-400">Test Mode:</span>
            <span className="text-white capitalize">{settings.mode}</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Net WPM = (Correct Characters ÷ 5) ÷ Time in Minutes
        </div>
      </div>

      {/* Personal Best */}
      {user && stats.wpm > user.bestWpm && (
        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <h3 className="text-xl font-bold text-yellow-400 mb-2">New Personal Best!</h3>
          <p className="text-gray-400">
            You beat your previous best of {user.bestWpm} WPM!
          </p>
        </div>
      )}

      {/* Attribution Footer */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <div className="text-center text-xs text-gray-600">
          <p>
            Made with ❤️ by{' '}
            <a
              href="https://github.com/AnomusLY"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              Hassan XLY
            </a>
            {' '} • {' '}
            <a
              href="https://github.com/AnomusLY/SwiftType"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              View Source Code
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
