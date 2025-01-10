import { useState, useEffect } from 'react';
import { LocalModelIntegration } from '../utils/llm/localModelIntegration';

export function useLocalModel(modelId?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [modelInstance, setModelInstance] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const integration = new LocalModelIntegration();

  useEffect(() => {
    const connect = async () => {
      const connected = await integration.connectLocalInstance();
      setIsConnected(connected);
    };

    integration.on('modelDiscovered', (instance) => {
      if (instance.id === modelId) {
        setModelInstance(instance);
      }
    });

    integration.on('metricsUpdated', ({ modelId: id, metrics }) => {
      if (id === modelId) {
        setMetrics(metrics);
      }
    });

    connect();

    return () => {
      integration.removeAllListeners();
    };
  }, [modelId]);

  const executeModel = async (input: string, context?: any) => {
    if (!modelId || !isConnected) return null;
    
    try {
      return await integration.executeModel(modelId, input, context);
    } catch (error) {
      console.error('Model execution failed:', error);
      return null;
    }
  };

  return {
    isConnected,
    modelInstance,
    metrics,
    executeModel
  };
}
