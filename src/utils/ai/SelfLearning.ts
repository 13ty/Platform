export class SelfLearning {
  private patterns: Map<string, number> = new Map();
  private insights: string[] = [];

  recordPattern(pattern: string) {
    const count = (this.patterns.get(pattern) || 0) + 1;
    this.patterns.set(pattern, count);
    
    if (count > 5) {
      this.generateInsight(pattern);
    }
  }

  private generateInsight(pattern: string) {
    const insight = `Observed pattern: ${pattern} occurs frequently`;
    this.insights.push(insight);
  }

  getInsights() {
    return this.insights;
  }
}
