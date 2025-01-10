import { useEffect, useRef } from 'react';
import { AgentListener } from '../utils/agents/AgentListener';
import { useChatStore } from '../store/chatStore';

export function useAgentListener() {
  const listenerRef = useRef<AgentListener>();
  const { activeSession } = useChatStore();

  useEffect(() => {
    if (!listenerRef.current) {
      listenerRef.current = new AgentListener();
    }

    if (activeSession?.status === 'active') {
      listenerRef.current.startListening(activeSession.id);
    } else {
      listenerRef.current?.stopListening();
    }

    return () => {
      listenerRef.current?.stopListening();
    };
  }, [activeSession?.id, activeSession?.status]);

  return listenerRef.current;
}
