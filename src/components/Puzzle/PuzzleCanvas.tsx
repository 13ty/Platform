import React from 'react';
import { PuzzleManager } from '../../utils/puzzle/PuzzleManager';

interface Props {
  id: string;
  onPuzzleCreated?: (puzzleId: string) => void;
}

export function PuzzleCanvas({ id, onPuzzleCreated }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [puzzleManager, setPuzzleManager] = React.useState<PuzzleManager | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const manager = new PuzzleManager(canvasRef.current);
      setPuzzleManager(manager);
    }
  }, []);

  return (
    <div className="relative" id="CANVASAREA">
      <canvas
        ref={canvasRef}
        className="border border-gray-200 rounded"
        width={500}
        height={500}
      />
      <div className="absolute top-2 right-2 bg-white p-2 rounded shadow text-sm" id="SOLUTIONDISPLAY">
        Waiting for solution...
      </div>
    </div>
  );
}
