import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { OllamaService } from '../../utils/llm/ollamaService';
import { LMStudioService } from '../../utils/llm/lmStudioService';

export function ConnectionStatus() {
  const [status, setStatus] = React.useState({
    ollama: false,
    lmstudio: false
  });

  const checkConnections = async () => {
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
  };

  React.useEffect(() => {
    checkConnections();
    const interval = setInterval(checkConnections, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Connection Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          {status.ollama ? (
            <Wifi className="w-5 h-5 text-green-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-500" />
          )}
          <span>Ollama</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          {status.lmstudio ? (
            <Wifi className="w-5 h-5 text-green-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-500" />
          )}
          <span>LM Studio</span>
        </div>
      </div>
    </div>
  );
}
