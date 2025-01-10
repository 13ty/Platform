import { toast } from 'sonner';
import type { Message, ModelInfo, ChatResponse } from './types';

export class LMStudioService {
  private baseUrl: string;
  private isConnected: boolean = false;

  constructor(baseUrl = 'http://localhost:1234') {
    this.baseUrl = baseUrl;
  }

  async testConnection(): Promise<boolean> {
    try {
      // LM Studio uses OpenAI-compatible endpoints
      const response = await fetch(`${this.baseUrl}/v1/models`);
      this.isConnected = response.ok;
      return this.isConnected;
    } catch {
      this.isConnected = false;
      return false;
    }
  }

  async getModels(): Promise<string[]> {
    if (!this.isConnected && !(await this.testConnection())) {
      return [];
    }

    try {
      const response = await fetch(`${this.baseUrl}/v1/models`);
      if (!response.ok) throw new Error('Failed to fetch models');
      
      const data = await response.json();
      // LM Studio returns models in OpenAI format
      return data.data.map((model: any) => model.id);
    } catch (error) {
      console.error('Failed to fetch LM Studio models:', error);
      return [];
    }
  }

  async generateResponse(model: string, messages: Message[]): Promise<string> {
    if (!this.isConnected && !(await this.testConnection())) {
      throw new Error('Not connected to LM Studio');
    }

    try {
      const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 2048,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('LM Studio generation failed:', error);
      throw error;
    }
  }

  async getModelInfo(model: string): Promise<any> {
    if (!this.isConnected && !(await this.testConnection())) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/v1/models/${model}`);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error(`Failed to fetch info for model ${model}:`, error);
      return null;
    }
  }
}
