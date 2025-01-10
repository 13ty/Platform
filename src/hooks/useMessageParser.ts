import { useState, useCallback } from 'react';
import type { Message } from '../utils/llm/types';
import { MessageParser } from '../utils/parser/MessageParser';
import { workbenchStore } from '../store/workbenchStore';

const messageParser = new MessageParser({
  onArtifactOpen: (data) => {
    workbenchStore.showWorkbench.set(true);
    workbenchStore.addArtifact(data);
  },
  onArtifactClose: (data) => {
    workbenchStore.updateArtifact(data, { closed: true });
  },
  onActionOpen: (data) => {
    if (data.action.type === 'file') {
      workbenchStore.addAction(data);
    }
  },
  onActionClose: (data) => {
    if (data.action.type !== 'file') {
      workbenchStore.addAction(data);
    }
    workbenchStore.runAction(data);
  },
  onActionStream: (data) => {
    workbenchStore.runAction(data, true);
  }
});

export function useMessageParser() {
  const [parsedMessages, setParsedMessages] = useState<Record<number, string>>({});

  const parseMessages = useCallback((messages: Message[], isLoading: boolean) => {
    const shouldReset = import.meta.env.DEV && !isLoading;
    
    if (shouldReset) {
      messageParser.reset();
    }

    messages.forEach((message, index) => {
      if (message.role === 'assistant') {
        const newContent = messageParser.parse(message.id, message.content);
        
        setParsedMessages(prev => ({
          ...prev,
          [index]: shouldReset ? newContent : (prev[index] || '') + newContent
        }));
      }
    });
  }, []);

  return { parsedMessages, parseMessages };
}
