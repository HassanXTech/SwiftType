import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useTypingStore } from '../store/useTypingStore';
import { toast } from 'react-hot-toast';
import { playKeySound } from '../utils/keyboard';

export const TypingArea: React.FC = () => {
  const { typingState, updateInput, settings } = useTypingStore();
  const { currentText, userInput, isActive, isCompleted } = typingState;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState && e.getModifierState('CapsLock')) {
        if (!capsLockOn) {
          setCapsLockOn(true);
          toast.error('Caps Lock is ON!');
        }
      } else {
        if (capsLockOn) {
          setCapsLockOn(false);
          toast.success('Caps Lock is OFF');
        }
      }

      if (!isCompleted && inputRef.current && !['Tab', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(e.key)) {
        inputRef.current.focus();
      }
    };

    const handleKeyUp = () => {

    };

    const handleClick = () => {
      if (!isCompleted && inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('click', handleClick);
    };
  }, [isCompleted, capsLockOn]);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && !isCompleted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isCompleted]);

  useEffect(() => {
    if (!isActive && userInput.length === 0) {
      setTimer(0);
    }
  }, [isActive, userInput.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isCompleted) return;

    const value = e.target.value;

    if (value.length <= currentText.content.length) {
      if (value.length > userInput.length) {
        const lastChar = value[value.length - 1];
        const expectedChar = currentText.content[value.length - 1];
        const isCorrect = lastChar === expectedChar;
        playKeySound(isCorrect, settings.soundEnabled);
      }

      updateInput(value);

      if (settings.mode === 'words') {
        const wordsTyped = value.trim() ? value.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
        if (wordsTyped >= settings.wordLimit) {
          const { endTest } = useTypingStore.getState();
          endTest();
        }
      }
    }
  };

  const renderText = () => {
    const text = currentText.content;
    const input = userInput;

    return text.split('').map((char, index) => {
      let className = '';

      if (index < input.length) {
        if (input[index] === char) {
          className = 'text-teal-400';
        } else {
          className = 'text-red-400 bg-red-400/20';
        }
      } else if (index === input.length) {
        className = 'text-gray-900 bg-teal-400 animate-pulse';
      } else {
        className = 'text-gray-500';
      }

      return (
        <span
          key={index}
          className={className}
          style={{
            padding: '1px 2px',
            borderRadius: '2px',
            minWidth: char === ' ' ? '8px' : 'auto'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  // Calculate real-time accuracy
  const calculateRealTimeAccuracy = () => {
    if (userInput.length === 0) return 100;

    const correctChars = userInput.split('').filter((char, index) => char === currentText.content[index]).length;
    return Math.round((correctChars / userInput.length) * 100);
  };

  const accuracy = calculateRealTimeAccuracy();

  const calculateRealTimeWPM = () => {
    if (timer <= 0 || userInput.length === 0) return 0;

    const correctChars = userInput.split('').filter((char, index) => char === currentText.content[index]).length;
    const timeInMinutes = timer / 60;
    const wpm = timeInMinutes > 0 ? (correctChars / 5) / timeInMinutes : 0;

    return Math.round(Math.max(0, wpm));
  };

  useEffect(() => {
    let timeoutId: number;

    if (isActive && settings.mode === 'time') {
      timeoutId = setTimeout(() => {
        const { endTest } = useTypingStore.getState();
        endTest();
      }, settings.timeLimit * 1000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive, settings.mode, settings.timeLimit]);

  useEffect(() => {
    if (inputRef.current && !isCompleted) {
      inputRef.current.focus();
    }
  }, [isCompleted]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-gray-500 text-sm uppercase tracking-wider mb-2">
          {settings.mode === 'time' ? 'TIMER' : settings.mode === 'words' ? 'WORDS' : 'TIMER'}
        </div>
        <div className="text-6xl font-light text-gray-400 mb-8">
          {settings.mode === 'time' ? (
            `${Math.max(0, settings.timeLimit - Math.floor(timer)).toString().padStart(2, '0')}`
          ) : settings.mode === 'words' ? (
            `${Math.max(0, settings.wordLimit - (userInput.trim() ? userInput.trim().split(/\s+/).filter(word => word.length > 0).length : 0)).toString().padStart(2, '0')}`
          ) : (
            `${Math.floor(timer).toString().padStart(2, '0')}`
          )}
        </div>
      </div>

      <div className="mb-8">
        <div
          className="text-center font-mono text-xl leading-relaxed whitespace-pre-wrap break-words overflow-hidden relative p-8"
          style={{ fontSize: `${settings.fontSize}px`, lineHeight: '1.8' }}
        >
          {renderText()}
          {userInput.length === currentText.content.length && (
            <span className="inline-block w-0.5 h-6 bg-teal-400 ml-1 animate-pulse" />
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isCompleted}
          placeholder=""
          className="absolute inset-0 w-full h-full bg-transparent border-none text-transparent font-mono resize-none focus:outline-none caret-transparent opacity-0"
          style={{
            fontSize: `${settings.fontSize}px`,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}
        />

        {!isFocused && !isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Click anywhere to start typing</p>
            </div>
          </div>
        )}
      </div>
      <div className="text-center mt-12">
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <span>© SwiftType</span>
            <span>•</span>
            <span><a href="https://github.com/AnomusLY/SwiftType" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">Source Code</a></span>
            <span>•</span>
            <span>Made by <a href="https://github.com/AnomusLY" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 transition-colors">Hassan Tech</a></span>
          </div>
          <div className="flex items-center space-x-4">
            <span>WPM: {calculateRealTimeWPM()}</span>
            <span>Accuracy: {accuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
