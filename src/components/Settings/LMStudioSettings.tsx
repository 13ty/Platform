import React from 'react';
import { Settings } from 'lucide-react';
import { ConnectionTest } from './ConnectionTest';
import { useSettingsStore } from '../../store/settingsStore';
import { toast } from 'sonner';

export function LMStudioSettings() {
  const { updateApiStatus, apiStatus } = useSettingsStore();
  const lmStudioStatus = apiStatus.lmstudio;

  const handleUrlChange = (url: string) => {
    updateApiStatus('lmstudio', { url });
  };

  const handleConnectionSuccess = () => {
    toast.success('LM Studio connection successful');
  };

  const handleConnectionError = () => {
    toast.error('Failed to connect to LM Studio');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-medium">
          <Settings className="w-4 h-4" />
          LM Studio Settings
        </h3>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">API URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={lmStudioStatus?.url || 'http://localhost:1234'}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="http://localhost:1234"
            className="flex-1 px-3 py-1.5 border rounded text-sm"
          />
          <ConnectionTest
            url={lmStudioStatus?.url || 'http://localhost:1234'}
            onSuccess={handleConnectionSuccess}
            onError={handleConnectionError}
          />
        </div>
      </div>
    </div>
  );
}
