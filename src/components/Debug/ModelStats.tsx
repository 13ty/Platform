import React from 'react';
import { BarChart, Cpu, Clock } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { OllamaService } from '../../utils/llm/ollamaService';
import { LMStudioService } from '../../utils/llm/lmStudioService';

export function ModelStats() {
  const { agents } = useAgentStore();
  const [stats, setStats] = React.useState<Record<string, any>>({});
  const [loading, setLoading] = React.useState(false);

  const fetchStats = async () => {
    setLoading(true);
    const newStats: Record<string, any> = {};

    for (const agent of agents) {
      if (agent.provider === 'ollama') {
        const ollama = new OllamaService(agent.baseUrl);
        newStats[agent.id] = await ollama.getStats(agent.model);
      } else if (agent.provider === 'lmstudio') {
        const lmStudio = new LMStudioService(agent.baseUrl);
        newStats[agent.id] = await lmStudio.getStats();
      }
    }

    setStats(newStats);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchStats();
  }, [agents]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center gap-2">
        <BarChart className="w-5 h-5" />
        Model Statistics
      </h3>
      
      {loading ? (
        <div className="text-center text-gray-500">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{agent.name}</h4>
              {stats[agent.id] ? (
                <div className="space-y-2">
                  {agent.provider === 'ollama' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span>Parameters: {stats[agent.id].parameters}</span>
                      </div>
                      <div>Context Length: {stats[agent.id].contextLength}</div>
                      <div>Quantization: {stats[agent.id].quantization}</div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Avg. Latency: {stats[agent.id].averageLatency}ms</span>
                      </div>
                      <div>Avg. Tokens: {stats[agent.id].averageTokens}</div>
                      <div>Total Requests: {stats[agent.id].totalRequests}</div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-gray-500">No stats available</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
