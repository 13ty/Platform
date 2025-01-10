import React from 'react';
import { Sliders, Code, FileText } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { toast } from 'sonner';

interface DebugSettings {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  showCode: boolean;
}

export function DebugControls() {
  const [settings, setSettings] = React.useState<DebugSettings>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    showCode: true
  });

  const handleChange = (key: keyof DebugSettings, value: number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success(`${key} updated`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Sliders className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold">Debug Controls</h3>
      </div>

      <div className="space-y-4">
        {/* Temperature Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">Temperature</label>
            <span className="text-sm text-gray-500">{settings.temperature}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.temperature}
            onChange={e => handleChange('temperature', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Max Tokens Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">Max Tokens</label>
            <span className="text-sm text-gray-500">{settings.maxTokens}</span>
          </div>
          <input
            type="range"
            min="1"
            max="4096"
            step="1"
            value={settings.maxTokens}
            onChange={e => handleChange('maxTokens', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Top P Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">Top P</label>
            <span className="text-sm text-gray-500">{settings.topP}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.topP}
            onChange={e => handleChange('topP', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Frequency Penalty Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">Frequency Penalty</label>
            <span className="text-sm text-gray-500">{settings.frequencyPenalty}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={settings.frequencyPenalty}
            onChange={e => handleChange('frequencyPenalty', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Presence Penalty Slider */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">Presence Penalty</label>
            <span className="text-sm text-gray-500">{settings.presencePenalty}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={settings.presencePenalty}
            onChange={e => handleChange('presencePenalty', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Code Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <label className="text-sm font-medium">Show Code</label>
          </div>
          <button
            onClick={() => handleChange('showCode', !settings.showCode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.showCode ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.showCode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
