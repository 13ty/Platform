import React from 'react';
import { Loader2, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import { OllamaService } from '../../utils/llm/ollamaService';
import { LMStudioService } from '../../utils/llm/lmStudioService';

interface Props {
  provider: string;
  url: string;
  apiKey?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export function ConnectionTest({ provider, url, apiKey, onSuccess, onError }: Props) {
  const [testing, setTesting] = React.useState(false);
  const [lastTestTime, setLastTestTime] = React.useState<number | null>(null);

  const handleTest = async () => {
    // Prevent rapid retesting
    if (lastTestTime && Date.now() - lastTestTime < 2000) {
      toast.error('Please wait before testing again');
      return;
    }

    setTesting(true);
    setLastTestTime(Date.now());

    try {
      let success = false;

      if (provider === 'ollama') {
        const service = new OllamaService(url);
        success = await service.testConnection();
      } else if (provider.startsWith('lmstudio')) {
        const service = new LMStudioService(url);
        success = await service.testConnection();
      } else {
        // Handle other providers
        const response = await fetch(`${url}/models`, {
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
          }
        });
        success = response.ok;
      }

      if (success) {
        toast.success(`${provider} connection successful`);
        onSuccess?.();
      } else {
        throw new Error('Connection failed');
      }
    } catch (error) {
      toast.error(`${provider} connection failed: ${error.message}`);
      onError?.();
    } finally {
      setTesting(false);
    }
  };

  return (
    <button
      onClick={handleTest}
      disabled={testing}
      className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
    >
      {testing ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <WifiOff className="w-4 h-4" />
      )}
      Test Connection
    </button>
  );
}
