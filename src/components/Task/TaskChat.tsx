import React from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useChatStore } from '../../store/chatStore';
import { Task } from '../../types/task';

export function TaskChat({ task }: { task: Task }) {
  const { addMessage } = useChatStore();
  const { updateTaskStep } = useTaskStore();
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add message to chat
    addMessage({
      id: crypto.randomUUID(),
      content: input,
      timestamp: Date.now(),
      type: 'text',
      agentId: 'user',
      metadata: {
        taskId: task.id,
        stepId: task.steps.find(s => s.status === 'in_progress')?.id
      }
    });

    setInput('');
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="flex items-center gap-2 p-4 border-b">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium">Task Discussion</h3>
      </div>

      <div className="p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Discuss task or request clarification..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
