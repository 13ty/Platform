import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { OllamaService } from '../../utils/llm/ollamaService';
import { LMStudioService } from '../../utils/llm/lmStudioService';

interface ConnectionStatus {
  ollama: boolean;
  lmstudio: boolean;
}

export function ConnectionCheck() {
  const [status, setStatus] = React.useState<ConnectionStatus>({
    ollama: false,
    lmstudio: false
  });
  const [checking, setChecking] = React.useState(false);

  const checkConnections = async () => {
    setChecking(true);
    try {
      const ollama = new OllamaService();
      const lmStudio = new LMStudioService();

      const [ollamaStatus, lmStudioStatus] = await Promise.all([
        ollama.testConnection(),
        lmStudio.testConnection()
      ]);

      setStatus({
        ollama: ollamaStatus,
        lmstudio: lmStudioStatus
      });

      if (ollamaStatus && lmStudioStatus) {
        toast.success('All services are connected');
      } else {
        const failed = [];
        if (!ollamaStatus) failed.push('Ollama');
        if (!lmStudioStatus) failed.push('LM Studio');
        toast.error(`Connection failed: ${failed.join(', ')}`);
      }
    } catch (error) {
      toast.error('Error checking connections');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Connection Status</h3>
        <button
          onClick={checkConnections}
          disabled={checking}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
          Check Connections
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          {status.ollama ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm">Ollama</span>
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          {status.lmstudio ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm">LM Studio</span>
        </div>
      </div>
    </div>
  );
}
