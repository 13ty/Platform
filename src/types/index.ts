export interface Agent {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'ollama' | 'lmstudio';
  apiKey?: string;
  baseUrl?: string;
  model: string;
  instruction: string; // Changed from role to instruction
  projectId: string;
}

// Other interfaces remain the same...
