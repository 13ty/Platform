import React from 'react';
import { Bot, Plus } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { CreateAgentModal } from '../Modals/CreateAgentModal';
import { AgentCard } from './AgentCard';
import { toast } from 'sonner';

export function AgentList() {
  const { agents, removeAgent } = useAgentStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleRemoveAgent = (id: string) => {
    removeAgent(id);
    toast.success('Agent removed successfully');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Agents
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            New Agent
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              onRemove={handleRemoveAgent}
            />
          ))}
          {agents.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No agents added yet. Click "New Agent" to create one.
            </div>
          )}
        </div>
      </div>
      <CreateAgentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
