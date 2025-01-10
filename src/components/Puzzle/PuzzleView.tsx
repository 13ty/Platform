import React from 'react';
import { PuzzleCanvas } from './PuzzleCanvas';
import { PuzzleNotification } from './PuzzleNotification';
import { useAgentStore } from '../../store/agentStore';

export function PuzzleView() {
  const { agents } = useAgentStore();
  const [notification, setNotification] = React.useState<{
    type: 'info' | 'success' | 'error';
    message: string;
  } | null>(null);

  const handlePuzzleCreated = (puzzleId: string) => {
    // Trigger agents to start working on the puzzle
    const creator = agents.find(a => a.name === 'PuzzleCreator');
    const analyzer = agents.find(a => a.name === 'PuzzleAnalyzer');
    const solver = agents.find(a => a.name === 'PuzzleSolver');
    const checker = agents.find(a => a.name === 'SolutionChecker');

    if (!creator || !analyzer || !solver || !checker) {
      setNotification({
        type: 'error',
        message: 'Missing required agents. Please create all necessary agents first.'
      });
      return;
    }

    // Agents would be triggered here to work on the puzzle
    setNotification({
      type: 'info',
      message: 'Agents are working on the puzzle...'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Puzzle System</h2>
      
      <PuzzleCanvas
        id={crypto.randomUUID()}
        onPuzzleCreated={handlePuzzleCreated}
      />

      {notification && (
        <PuzzleNotification
          type={notification.type}
          message={notification.message}
        />
      )}
    </div>
  );
}
