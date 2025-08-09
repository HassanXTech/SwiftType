import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTypingStore } from './store/useTypingStore';
import { Header } from './components/Header';
import { TypingArea } from './components/TypingArea';
import { GameComplete } from './components/GameComplete';
import { getRandomText } from './data/texts';

function App() {
  const { typingState, setTypingState, resetTypingState, settings } = useTypingStore();
  const { isCompleted, currentText } = typingState;

  useEffect(() => {
    // Initialize with a random text if none is set
    if (!currentText.content) {
      const randomText = getRandomText(settings.difficulty);
      setTypingState({ currentText: randomText });
    }
  }, [currentText.content, settings.difficulty, setTypingState]);

  const handleNewTest = () => {
    const randomText = getRandomText(settings.difficulty);
    resetTypingState();
    setTypingState({
      currentText: randomText,
    });
  };

  // Always show the typing interface for now (skip welcome screen)
  if (!currentText.content) {
    // Force load a text immediately
    const randomText = getRandomText(settings.difficulty);
    setTypingState({ currentText: randomText });
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#f9fafb',
            border: '1px solid #374151',
          },
        }}
      />

      <div className="w-full max-w-5xl bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        {isCompleted ? (
          <GameComplete onNewTest={handleNewTest} />
        ) : (
          <>
            <Header onNewTest={handleNewTest} />
            <div className="p-8">
              <TypingArea />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
