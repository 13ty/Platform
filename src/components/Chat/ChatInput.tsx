import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { addMessage, activeSession } = useChatStore();

  const handleSend = () => {
    if (!input.trim() || !activeSession) return;

    addMessage({
      id: crypto.randomUUID(),
      content: input.trim(),
      timestamp: Date.now(),
      type: 'text',
      agentId: 'user'
    });

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!activeSession}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || !activeSession}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
