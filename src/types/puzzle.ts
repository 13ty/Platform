export interface PuzzleState {
  id: string;
  grid: number[][];
  solution?: number[][];
  status: 'unsolved' | 'solving' | 'solved' | 'invalid';
  created_at: number;
}

export interface PuzzleAnalysis {
  id: string;
  puzzleId: string;
  components: {
    id: string;
    type: string;
    description: string;
    position: { x: number; y: number };
  }[];
  approach: {
    steps: string[];
    complexity: string;
    constraints: string[];
  };
}

export interface PuzzleSolution {
  id: string;
  puzzleId: string;
  steps: {
    description: string;
    gridState: number[][];
  }[];
  isValid: boolean;
  solvedAt?: number;
}
