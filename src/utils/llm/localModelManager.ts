import { LMStudioService } from './lmStudioService';
import { EventEmitter } from 'events';

export class LocalModelManager extends EventEmitter {
  private lmStudio: LMStudioService;
  private modelCache: Map<string, any> = new Map();

  constructor(baseUrl = 'http://localhost:1234') {
    super();
    this.lmStudio = new LMStudioService(baseUrl);
  }

  async connectToLocalInstance(): Promise<boolean> {
    try {
      const isConnected = await this.lmStudio.testConnection();
      if (isConnected) {
        this.emit('connected');
        await this.syncLocalModels();
      }
      return isConnected;
    } catch (error) {
      this.emit('error', error);
      return false;
    }
  }

  async syncLocalModels() {
    const models = await this.lmStudio.getModels();
    models.forEach(model => {
      if (!this.modelCache.has(model)) {
        this.modelCache.set(model, { lastSync: Date.now() });
        this.emit('modelDiscovered', model);
      }
    });
  }

  async executeLocalModel(modelId: string, prompt: string) {
    try {
      const response = await this.lmStudio.generateResponse(modelId, prompt);
      this.emit('executionComplete', { modelId, success: true });
      return response;
    } catch (error) {
      this.emit('executionError', { modelId, error });
      throw error;
    }
  }

  onModelUpdate(callback: (model: string) => void) {
    this.on('modelDiscovered', callback);
    return () => this.off('modelDiscovered', callback);
  }
}
