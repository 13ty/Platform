import { useState, useEffect } from 'react';
import { NaturalLearning } from '../utils/ai/NaturalLearning';

export function useNaturalLearning() {
  const [understandings, setUnderstandings] = useState<Understanding[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const learning = new NaturalLearning();

  useEffect(() => {
    const unsubscribeUnderstandings = learning.onUnderstanding((understanding) => {
      setUnderstandings(prev => [...prev, understanding]);
    });

    const unsubscribeConnections = learning.onConnection((connection) => {
      setConnections(prev => [...prev, connection]);
    });

    return () => {
      unsubscribeUnderstandings();
      unsubscribeConnections();
    };
  }, []);

  const shareExperience = async (experience: any) => {
    await learning.observe(experience);
  };

  return {
    understandings,
    connections,
    shareExperience
  };
}
