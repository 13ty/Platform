import React from 'react';
import { useChatStore } from '../../store/chatStore';
import { ChatMessage } from './ChatMessage';
import ChatInput from './ChatInput';

export function ChatWindow() {
  const { activeSession } = useChatStore();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages]);

  if (!activeSession) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No active chat session. Start a new conversation.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeSession.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatWindow;
