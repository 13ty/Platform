import React from 'react';
import { Box } from 'lucide-react';
import { OllamaService } from '../../utils/llm/ollamaService';
import { LMStudioService } from '../../utils/llm/lmStudioService';

interface Props {
  provider: 'ollama' | 'lmstudio';
  onSelect: (model: string) => void;
}

export function ModelSelector({ provider, onSelect }: Props) {
  const [models, setModels] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchModels = async () => {
    setLoading(true);
    try {
      if (provider === 'ollama') {
        const ollama = new OllamaService();
        const ollamaModels = await ollama.getModels();
        setModels(ollamaModels);
      } else {
        const lmStudio = new LMStudioService();
        const lmStudioModels = await lmStudio.getModels();
        setModels(lmStudioModels);
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchModels();
  }, [provider]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center gap-2">
        <Box className="w-5 h-5" />
        Available Models
      </h3>
      
      {loading ? (
        <div className="text-center text-gray-500">Loading models...</div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {models.map((model) => (
            <button
              key={model}
              onClick={() => onSelect(model)}
              className="p-2 text-left hover:bg-gray-100 rounded"
            >
              {model}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
