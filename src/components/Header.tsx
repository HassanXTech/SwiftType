import React, { useState } from 'react';
import { Settings, RotateCcw } from 'lucide-react';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  onNewTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewTest }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-800">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-medium text-white">SwiftType</h1>
        <span className="text-sm text-gray-500">Practice Mode</span>
        <span className="text-xs text-gray-600">by Hassan Tech</span>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onNewTest}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over</span>
        </button>

        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </header>
  );
};
