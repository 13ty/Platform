import { useState, useEffect } from 'react';
import { MindfulLearning } from '../utils/ai/MindfulLearning';

export function useMindfulLearning() {
  const [insights, setInsights] = useState<Understanding[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const learning = new MindfulLearning();

  useEffect(() => {
    const unsubscribeInsights = learning.onInsight((understanding) => {
      setInsights(prev => [...prev, understanding]);
    });

    const unsubscribeConnections = learning.onConnection((connection) => {
      setConnections(prev => [...prev, connection]);
    });

    return () => {
      unsubscribeInsights();
      unsubscribeConnections();
    };
  }, []);

  const shareObservation = async (observation: any) => {
    await learning.share(observation);
  };

  return {
    insights,
    connections,
    shareObservation
  };
}
