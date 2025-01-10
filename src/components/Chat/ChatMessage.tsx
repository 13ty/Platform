import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { Bot, User } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  message: ChatMessageType;
}

export function ChatMessage({ message }: Props) {
  const isUser = message.agentId === 'user';
  
  return (
    <div className={clsx(
      'flex gap-3 p-4 rounded-lg',
      isUser ? 'bg-blue-50' : 'bg-gray-50'
    )}>
      <div className={clsx(
        'w-8 h-8 rounded-full flex items-center justify-center',
        isUser ? 'bg-blue-500' : 'bg-gray-500'
      )}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="text-sm font-medium">
          {isUser ? 'You' : message.agentId}
        </div>
        <div className="text-gray-700">
          {message.content}
        </div>
        <div className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
