import { PuzzleState, PuzzleAnalysis, PuzzleSolution } from '../../types/puzzle';

export class PuzzleManager {
  private canvasContext: CanvasRenderingContext2D;
  private storagePrefix = {
    puzzle: 'PUZZLE_',
    analysis: 'ANALYSIS_',
    solution: 'SOLUTION_'
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvasContext = canvas.getContext('2d')!;
    this.setupCanvas();
  }

  private setupCanvas() {
    // Set canvas size to 500x500
    this.canvasContext.canvas.width = 500;
    this.canvasContext.canvas.height = 500;
  }

  drawGrid(grid: number[][]) {
    const cellSize = 500 / grid.length;
    
    // Clear canvas
    this.canvasContext.clearRect(0, 0, 500, 500);
    
    // Draw grid
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        const x = j * cellSize;
        const y = i * cellSize;
        
        // Draw cell
        this.canvasContext.fillStyle = cell ? '#000' : '#fff';
        this.canvasContext.fillRect(x, y, cellSize, cellSize);
        
        // Draw border
        this.canvasContext.strokeStyle = '#ccc';
        this.canvasContext.strokeRect(x, y, cellSize, cellSize);
      });
    });
  }

  savePuzzle(puzzle: PuzzleState) {
    localStorage.setItem(
      this.storagePrefix.puzzle + puzzle.id,
      JSON.stringify(puzzle)
    );
  }

  saveAnalysis(analysis: PuzzleAnalysis) {
    localStorage.setItem(
      this.storagePrefix.analysis + analysis.puzzleId,
      JSON.stringify(analysis)
    );
  }

  saveSolution(solution: PuzzleSolution) {
    localStorage.setItem(
      this.storagePrefix.solution + solution.puzzleId,
      JSON.stringify(solution)
    );
  }

  getPuzzle(id: string): PuzzleState | null {
    const data = localStorage.getItem(this.storagePrefix.puzzle + id);
    return data ? JSON.parse(data) : null;
  }

  getAnalysis(puzzleId: string): PuzzleAnalysis | null {
    const data = localStorage.getItem(this.storagePrefix.analysis + puzzleId);
    return data ? JSON.parse(data) : null;
  }

  getSolution(puzzleId: string): PuzzleSolution | null {
    const data = localStorage.getItem(this.storagePrefix.solution + puzzleId);
    return data ? JSON.parse(data) : null;
  }
}
