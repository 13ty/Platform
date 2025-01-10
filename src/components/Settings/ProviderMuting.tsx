import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { toast } from 'sonner';

export function ProviderMuting() {
  const { apiStatus, updateApiStatus } = useSettingsStore();

  const toggleMute = (provider: string) => {
    updateApiStatus(provider as keyof typeof apiStatus, { 
      muted: !apiStatus[provider as keyof typeof apiStatus].muted 
    });
    toast.success(`${provider} ${apiStatus[provider as keyof typeof apiStatus].muted ? 'unmuted' : 'muted'}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Provider Muting</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(apiStatus).map(([provider, status]) => (
          <button
            key={provider}
            onClick={() => toggleMute(provider)}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              status.muted 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-white border-blue-200 hover:border-blue-300'
            }`}
          >
            <span className="capitalize">{provider.replace(/(\d+)$/, ' #$1')}</span>
            {status.muted ? (
              <VolumeX className="w-4 h-4 text-gray-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-blue-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
