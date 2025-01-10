import React from 'react';
import { useAgentStore } from '../../store/agentStore';
import { Plus, Bot } from 'lucide-react';
import { AgentForm } from './AgentForm';
import { AgentCard } from './AgentCard';

export function AgentView() {
  const { agents } = useAgentStore();
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="w-6 h-6" />
          Agents
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Hide Form' : 'New Agent'}
        </button>
      </div>

      {showForm && (
        <AgentForm onSuccess={() => setShowForm(false)} />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
        {agents.length === 0 && !showForm && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No agents added yet. Click "New Agent" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
