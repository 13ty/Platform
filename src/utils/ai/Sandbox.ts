export class Sandbox {
  private readonly limits = {
    maxMemory: 100 * 1024 * 1024, // 100MB
    maxTime: 5000, // 5 seconds
    maxIterations: 1000
  };

  async runSafely<T>(code: string): Promise<T> {
    const startTime = Date.now();
    let iterations = 0;

    const safeContext = {
      setTimeout: (fn: Function, ms: number) => {
        if (Date.now() - startTime > this.limits.maxTime) {
          throw new Error('Time limit exceeded');
        }
        setTimeout(fn, Math.min(ms, this.limits.maxTime));
      },
      
      iterate: () => {
        iterations++;
        if (iterations > this.limits.maxIterations) {
          throw new Error('Iteration limit exceeded');
        }
      }
    };

    try {
      const fn = new Function('context', code);
      return await fn(safeContext);
    } catch (error) {
      throw new Error(`Sandbox execution failed: ${error.message}`);
    }
  }
}
