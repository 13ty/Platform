import { toast } from 'sonner';
import { BaseProvider } from './base';
import type { Message, ModelInfo, ChatResponse, LMStudioConfig } from '../types';

export class LMStudioProvider extends BaseProvider {
  private config: LMStudioConfig;

  constructor(config: LMStudioConfig) {
    super(config.baseUrl);
    this.config = {
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? -1
    };
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v0/models`);
      return response.ok;
    } catch {
      return false;
    }
  }

  async getModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v0/models`);
      if (!response.ok) throw new Error('Failed to fetch models');
      
      const data = await response.json();
      return data.data.map((model: ModelInfo) => model.id);
    } catch (error) {
      console.error('Failed to fetch LM Studio models:', error);
      return [];
    }
  }

  async generateResponse(model: string, messages: Message[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v0/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages,
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json() as ChatResponse;
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      toast.error(`LM Studio generation failed: ${error.message}`);
      throw error;
    }
  }

  async getModelInfo(model: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v0/models/${model}`);
      if (!response.ok) throw new Error('Failed to fetch model info');
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch info for model ${model}:`, error);
      return null;
    }
  }

  async getStats(model: string) {
    const info = await this.getModelInfo(model);
    return {
      parameters: info?.parameters || 0,
      contextLength: info?.context_length || 0,
      quantization: info?.quantization || 'unknown'
    };
  }
}
