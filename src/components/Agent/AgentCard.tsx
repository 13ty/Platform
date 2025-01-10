import React from 'react';
import { Bot, Trash2 } from 'lucide-react';
import { Agent } from '../../types';
import clsx from 'clsx';

interface Props {
  agent: Agent;
  onRemove: (id: string) => void;
}

export function AgentCard({ agent, onRemove }: Props) {
  return (
    <div className={clsx(
      'p-4 rounded-lg border border-gray-200',
      'hover:border-blue-500 transition-colors'
    )}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">{agent.name}</h3>
        </div>
        <button 
          onClick={() => onRemove(agent.id)}
          className="p-1 hover:bg-red-100 rounded text-red-500"
          title="Remove Agent"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <div>Provider: {agent.provider}</div>
        <div>Model: {agent.model}</div>
        <div className="text-xs bg-gray-100 p-2 rounded mt-2">
          {agent.instruction}
        </div>
      </div>
    </div>
  );
}
