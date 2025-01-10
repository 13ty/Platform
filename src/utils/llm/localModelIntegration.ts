import { EventEmitter } from 'events';
import { LMStudioService } from './lmStudioService';
import { LocalModelManager } from './localModelManager';

export class LocalModelIntegration extends EventEmitter {
  private modelManager: LocalModelManager;
  private lmStudio: LMStudioService;
  private activeModels: Map<string, ModelInstance> = new Map();

  constructor(baseUrl = 'http://localhost:1234') {
    super();
    this.modelManager = new LocalModelManager();
    this.lmStudio = new LMStudioService(baseUrl);
  }

  async connectLocalInstance(): Promise<boolean> {
    try {
      const connected = await this.lmStudio.testConnection();
      if (connected) {
        await this.syncLocalModels();
        this.startModelMonitoring();
      }
      return connected;
    } catch (error) {
      this.emit('error', error);
      return false;
    }
  }

  private async syncLocalModels() {
    const models = await this.lmStudio.getModels();
    for (const model of models) {
      if (!this.activeModels.has(model)) {
        const instance = await this.createModelInstance(model);
        this.activeModels.set(model, instance);
        this.emit('modelDiscovered', instance);
      }
    }
  }

  private async createModelInstance(modelId: string): Promise<ModelInstance> {
    return {
      id: modelId,
      status: 'ready',
      capabilities: await this.detectCapabilities(modelId),
      lastSync: Date.now(),
      metrics: {
        totalCalls: 0,
        avgResponseTime: 0,
        errorRate: 0
      }
    };
  }

  private async detectCapabilities(modelId: string): Promise<ModelCapabilities> {
    // Test model capabilities with sample prompts
    const capabilities: ModelCapabilities = {
      textGeneration: true,
      codeGeneration: false,
      analysis: false
    };

    try {
      // Test code generation
      const codeResult = await this.lmStudio.generateResponse(modelId, 
        "Write a simple function that adds two numbers");
      capabilities.codeGeneration = codeResult.includes('function');

      // Test analysis
      const analysisResult = await this.lmStudio.generateResponse(modelId,
        "Analyze this code: function add(a,b) { return a+b }");
      capabilities.analysis = analysisResult.includes('analysis') || 
                            analysisResult.includes('function');

    } catch (error) {
      this.emit('warning', `Capability detection failed for ${modelId}`);
    }

    return capabilities;
  }

  private startModelMonitoring() {
    setInterval(async () => {
      try {
        await this.syncLocalModels();
        this.updateMetrics();
      } catch (error) {
        this.emit('error', error);
      }
    }, 30000); // Check every 30 seconds
  }

  private updateMetrics() {
    for (const [modelId, instance] of this.activeModels) {
      // Update usage metrics
      if (instance.metrics.totalCalls > 0) {
        this.emit('metricsUpdated', {
          modelId,
          metrics: instance.metrics
        });
      }
    }
  }

  async executeModel(modelId: string, input: string, context?: any): Promise<ModelResponse> {
    const instance = this.activeModels.get(modelId);
    if (!instance) throw new Error(`Model ${modelId} not found`);

    const startTime = Date.now();
    try {
      const response = await this.lmStudio.generateResponse(modelId, input);
      
      // Update metrics
      instance.metrics.totalCalls++;
      instance.metrics.avgResponseTime = 
        (instance.metrics.avgResponseTime * (instance.metrics.totalCalls - 1) + 
        (Date.now() - startTime)) / instance.metrics.totalCalls;

      return {
        success: true,
        content: response,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      instance.metrics.errorRate = 
        (instance.metrics.errorRate * instance.metrics.totalCalls + 1) / 
        (instance.metrics.totalCalls + 1);
      
      throw error;
    }
  }
}

interface ModelInstance {
  id: string;
  status: 'ready' | 'busy' | 'error';
  capabilities: ModelCapabilities;
  lastSync: number;
  metrics: ModelMetrics;
}

interface ModelCapabilities {
  textGeneration: boolean;
  codeGeneration: boolean;
  analysis: boolean;
}

interface ModelMetrics {
  totalCalls: number;
  avgResponseTime: number;
  errorRate: number;
}

interface ModelResponse {
  success: boolean;
  content: string;
  executionTime: number;
}
