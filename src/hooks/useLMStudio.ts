import { useState } from 'react';
import type { Message, LMStudioConfig } from '../utils/llm/types';
import { LMStudioProvider } from '../utils/llm/providers/lmstudio';

export function useLMStudio(config: Partial<LMStudioConfig> = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const provider = new LMStudioProvider({
    baseUrl: config.baseUrl || 'http://localhost:1234',
    temperature: config.temperature,
    maxTokens: config.maxTokens
  });

  const generateResponse = async (modelId: string, messages: Message[]) => {
    setIsLoading(true);
    try {
      return await provider.generateResponse(modelId, messages);
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    return await provider.testConnection();
  };

  const getModels = async () => {
    return await provider.getModels();
  };

  const getModelInfo = async (modelId: string) => {
    return await provider.getModelInfo(modelId);
  };

  return {
    generateResponse,
    testConnection,
    getModels,
    getModelInfo,
    isLoading
  };
}
