import { OllamaService } from '../llm/ollamaService';
import { LMStudioService } from '../llm/lmStudioService';

export class ModelTester {
  private ollama: OllamaService;
  private lmStudio: LMStudioService;

  constructor() {
    this.ollama = new OllamaService();
    this.lmStudio = new LMStudioService();
  }

  async testModel(provider: 'ollama' | 'lmstudio', model: string) {
    const testPrompt = 'Generate a short test response to verify the model is working.';
    const startTime = Date.now();
    let response;

    try {
      if (provider === 'ollama') {
        response = await this.ollama.generateResponse(model, testPrompt);
      } else {
        response = await this.lmStudio.generateResponse(model, testPrompt);
      }

      const endTime = Date.now();
      return {
        success: true,
        latency: endTime - startTime,
        response,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        latency: null,
        response: null,
        error: error.message
      };
    }
  }

  async benchmarkModel(provider: 'ollama' | 'lmstudio', model: string, iterations = 5) {
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
      const result = await this.testModel(provider, model);
      results.push(result);
    }

    return {
      averageLatency: results.reduce((acc, curr) => acc + (curr.latency || 0), 0) / iterations,
      successRate: results.filter(r => r.success).length / iterations,
      errors: results.filter(r => !r.success).map(r => r.error)
    };
  }
}
