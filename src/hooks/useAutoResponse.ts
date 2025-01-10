import { useState, useEffect } from 'react';
import { AutoResponseManager } from '../utils/task/autoResponseManager';
import { Task } from '../types/task';
import { ChatMessage } from '../types/chat';
import { useChatStore } from '../store/chatStore';

export function useAutoResponse(task: Task) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { addMessage } = useChatStore();
  const manager = new AutoResponseManager();

  useEffect(() => {
    const handleResponse = (response: any) => {
      addMessage({
        id: response.id,
        content: response.content,
        timestamp: Date.now(),
        type: 'text',
        agentId: 'system',
        metadata: {
          taskId: task.id,
          priority: response.priority
        }
      });
      setIsProcessing(false);
    };

    manager.on('sendResponse', handleResponse);
    return () => {
      manager.off('sendResponse', handleResponse);
    };
  }, [task.id, addMessage]);

  const processMessage = (message: ChatMessage) => {
    setIsProcessing(true);
    manager.handleMessage(message, task);
  };

  return {
    processMessage,
    isProcessing
  };
}
