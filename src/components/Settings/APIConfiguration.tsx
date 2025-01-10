import React from 'react';
import { Settings, Key, Plus, Minus } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { APIStatusIndicator } from './APIStatusIndicator';
import { ConnectionTest } from './ConnectionTest';
import { ProviderMuting } from './ProviderMuting';
import { toast } from 'sonner';

export function APIConfiguration() {
  const { apiStatus, updateApiStatus, addProviderInstance, removeProviderInstance } = useSettingsStore();

  const handleUrlChange = (provider: string, url: string) => {
    updateApiStatus(provider as keyof typeof apiStatus, { url });
  };

  const handleApiKeyChange = (provider: string, apiKey: string) => {
    updateApiStatus(provider as keyof typeof apiStatus, { apiKey });
  };

  const handleAddInstance = (baseProvider: string) => {
    const instances = Object.keys(apiStatus).filter(key => 
      key.startsWith(baseProvider) && key !== baseProvider
    ).length;
    
    const newInstanceNumber = instances + 2; // Start from 2 since original is 1
    addProviderInstance(`${baseProvider}${newInstanceNumber}`);
    toast.success(`Added new ${baseProvider} instance #${newInstanceNumber}`);
  };

  const handleRemoveInstance = (provider: string) => {
    removeProviderInstance(provider);
    toast.success(`Removed ${provider}`);
  };

  const renderProviderConfig = (provider: string, status: any) => {
    const isLocalProvider = provider === 'ollama' || provider.startsWith('lmstudio');
    const baseProvider = provider.replace(/\d+$/, '');
    const isBaseInstance = !provider.match(/\d+$/);
    const instanceNumber = provider.match(/\d+$/)?.[0];
    
    const defaultUrl = provider === 'ollama' 
      ? 'http://localhost:11434'
      : provider.startsWith('lmstudio')
        ? `http://localhost:${1234 + (parseInt(instanceNumber || '1') - 1)}`
        : '';

    return (
      <div key={provider} className="space-y-3 p-4 bg-gray-50 rounded-lg relative group">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium capitalize">
              {provider.replace(/(\d+)$/, ' #$1')}
            </label>
            {isLocalProvider && (
              <div className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                Local
              </div>
            )}
            {status.muted && (
              <div className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                Muted
              </div>
            )}
          </div>
          <APIStatusIndicator 
            connected={status.connected} 
            label={status.connected ? 'Connected' : 'Disconnected'} 
          />
        </div>

        {/* Instance Controls */}
        <div className="absolute -right-3 -top-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {isBaseInstance ? (
            <button
              onClick={() => handleAddInstance(baseProvider)}
              className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-lg"
              title="Add Instance"
            >
              <Plus className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleRemoveInstance(provider)}
              className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
              title="Remove Instance"
            >
              <Minus className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={status.url || defaultUrl}
              onChange={(e) => handleUrlChange(provider, e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
              placeholder={`${provider} API URL`}
            />
            <ConnectionTest 
              provider={provider} 
              url={status.url || defaultUrl}
              apiKey={status.apiKey}
              onSuccess={() => {
                updateApiStatus(provider as keyof typeof apiStatus, { connected: true });
                toast.success(`${provider} connected successfully`);
              }}
              onError={() => {
                updateApiStatus(provider as keyof typeof apiStatus, { connected: false });
              }}
            />
          </div>

          {!isLocalProvider && (
            <div className="relative">
              <input
                type="password"
                value={status.apiKey || ''}
                onChange={(e) => handleApiKeyChange(provider, e.target.value)}
                className="w-full px-3 py-2 border rounded pr-8"
                placeholder={`${provider} API Key`}
              />
              <Key className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>

        {status.connected && status.models.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1">Available Models</label>
            <select className="w-full px-3 py-2 border rounded bg-white">
              {status.models.map((model: string) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5" />
        <h3 className="font-semibold">API Configuration</h3>
      </div>

      <ProviderMuting />

      <div className="space-y-4">
        {/* Local Providers */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Local Models</h4>
          {Object.entries(apiStatus)
            .filter(([provider]) => provider === 'ollama' || provider.startsWith('lmstudio'))
            .map(([provider, status]) => renderProviderConfig(provider, status))}
        </div>

        {/* Cloud Providers */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Cloud Services</h4>
          {Object.entries(apiStatus)
            .filter(([provider]) => !provider.startsWith('lmstudio') && provider !== 'ollama')
            .map(([provider, status]) => renderProviderConfig(provider, status))}
        </div>
      </div>
    </section>
  );
}
