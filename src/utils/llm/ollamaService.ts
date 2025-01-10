import { toast } from 'sonner';

export class OllamaService {
  private baseUrl: string;
  private isConnected: boolean = false;

  constructor(baseUrl = 'http://localhost:11434') {
    this.baseUrl = baseUrl;
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      this.isConnected = response.ok;
      return this.isConnected;
    } catch (error) {
      this.isConnected = false;
      console.error('Ollama connection failed:', error);
      return false;
    }
  }

  async getModels(): Promise<string[]> {
    if (!this.isConnected && !(await this.testConnection())) {
      return [];
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data.models || [];
    } catch (error) {
      console.error('Failed to fetch Ollama models:', error);
      toast.error('Failed to fetch Ollama models. Please check your connection.');
      return [];
    }
  }

  async generateResponse(model: string, prompt: string): Promise<string> {
    if (!this.isConnected && !(await this.testConnection())) {
      throw new Error('Ollama is not connected');
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Ollama generation failed:', error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }

  async getModelInfo(model: string) {
    if (!this.isConnected && !(await this.testConnection())) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/show/${model}`);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error(`Failed to fetch info for model ${model}:`, error);
      return null;
    }
  }
}
