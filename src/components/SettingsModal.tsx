import React, { useEffect } from 'react';
import { X, Volume2, VolumeX, Type, Clock, Target } from 'lucide-react';
import { useTypingStore } from '../store/useTypingStore';

// Define types inline to avoid import issues
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type TestMode = 'time' | 'words' | 'custom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useTypingStore();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    // Update difficulty and adjust default settings based on difficulty level
    const difficultySettings = {
      beginner: { timeLimit: 120, wordLimit: 25 },
      intermediate: { timeLimit: 60, wordLimit: 50 },
      advanced: { timeLimit: 45, wordLimit: 75 },
      expert: { timeLimit: 30, wordLimit: 100 }
    };

    updateSettings({
      difficulty,
      ...difficultySettings[difficulty]
    });
  };

  const handleModeChange = (mode: TestMode) => {
    updateSettings({ mode });
  };

  const handleTimeLimitChange = (timeLimit: number) => {
    updateSettings({ timeLimit });
  };

  const handleWordLimitChange = (wordLimit: number) => {
    updateSettings({ wordLimit });
  };

  const handleFontSizeChange = (fontSize: number) => {
    updateSettings({ fontSize });
  };



  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
          <div
            className="bg-gray-800 rounded-2xl border border-gray-600 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Difficulty Settings */}
              <div>
                <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-gray-400" />
                  Difficulty Level
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                  Difficulty affects text complexity and adjusts time/word limits automatically
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['beginner', 'intermediate', 'advanced', 'expert'] as Difficulty[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => handleDifficultyChange(level)}
                      className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                        settings.difficulty === level
                          ? 'bg-teal-600 border-teal-500 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium capitalize">{level}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Mode */}
              <div>
                <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  Test Mode
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {(['time', 'words', 'custom'] as TestMode[]).map((mode) => {
                    const descriptions = {
                      time: 'Race against time',
                      words: 'Type a set number of words',
                      custom: 'No limits, type at your pace'
                    };

                    return (
                      <button
                        key={mode}
                        onClick={() => handleModeChange(mode)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                          settings.mode === mode
                            ? 'bg-teal-600 border-teal-500 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium capitalize mb-1">{mode}</div>
                        <div className="text-xs opacity-75">{descriptions[mode]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Limit */}
              {settings.mode === 'time' && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Time Limit (seconds)</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[30, 60, 120, 300].map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeLimitChange(time)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                          settings.timeLimit === time
                            ? 'bg-teal-600 border-teal-500 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium">{time}s</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Word Limit */}
              {settings.mode === 'words' && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Word Limit</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 100, 200].map((words) => (
                      <button
                        key={words}
                        onClick={() => handleWordLimitChange(words)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                          settings.wordLimit === words
                            ? 'bg-teal-600 border-teal-500 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium">{words}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Font Size */}
              <div>
                <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                  <Type className="w-4 h-4 mr-2 text-gray-400" />
                  Font Size
                </h3>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-xs">Small</span>
                  <input
                    type="range"
                    min="14"
                    max="24"
                    value={settings.fontSize}
                    onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-gray-400 text-xs">Large</span>
                  <span className="text-white font-medium text-sm min-w-10">{settings.fontSize}px</span>
                </div>
              </div>

              {/* Toggle Settings */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white">Preferences</h3>

                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {settings.soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-gray-400 mr-3" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-gray-400 mr-3" />
                    )}
                    <div>
                      <div className="text-white text-sm font-medium">Sound Effects</div>
                      <div className="text-gray-400 text-xs">Play sounds for keystrokes</div>
                    </div>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      settings.soundEnabled ? 'bg-teal-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                        settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-600">
              <button
                onClick={onClose}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
