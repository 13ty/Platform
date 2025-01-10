import React from 'react';
import { Bot, Plus, Play, Pause, Settings } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { CreateAgentModal } from '../Modals/CreateAgentModal';
import clsx from 'clsx';

export function AgentList() {
  const { agents } = useAgentStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">Agents</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 group"
            >
              <Bot className="w-4 h-4" />
              <span className="truncate text-sm flex-1">{agent.name}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Play className="w-3 h-3" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Settings className="w-3 h-3" />
                </button>
              </div>
              <span className={clsx(
                "text-xs px-1.5 py-0.5 rounded",
                agent.provider === 'ollama' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              )}>
                {agent.provider}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CreateAgentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
