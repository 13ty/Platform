import { useState, useEffect } from 'react';
import { CollaborativeLearning } from '../utils/ai/CollaborativeLearning';

export function useCollaborativeLearning() {
  const [insights, setInsights] = useState<any[]>([]);
  const learning = new CollaborativeLearning();

  useEffect(() => {
    const unsubscribe = learning.onDiscovery((insight) => {
      setInsights(prev => [...prev, insight]);
    });

    return unsubscribe;
  }, []);

  const shareObservation = async (observation: any) => {
    await learning.learn(observation);
  };

  return {
    insights,
    shareObservation
  };
}
