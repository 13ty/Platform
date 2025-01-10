export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ModelInfo {
  id: string;
  type: string;
  publisher: string;
  arch: string;
  compatibility_type: string;
  quantization: string;
  state: string;
  max_context_length: number;
}

export interface ChatResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  stats: {
    tokens_per_second: number;
    time_to_first_token: number;
    generation_time: number;
  };
}

export interface LMStudioConfig {
  baseUrl: string;
  temperature?: number;
  maxTokens?: number;
}
