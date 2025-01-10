import React from 'react';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

export function SystemSettings() {
  const { resetSettings } = useSettingsStore();

  return (
    <section>
      <h3 className="font-semibold mb-4">System</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
          <RefreshCw className="w-4 h-4" />
          <span>Check for Updates</span>
        </button>
        <button 
          onClick={resetSettings}
          className="w-full flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Settings</span>
        </button>
      </div>
    </section>
  );
}
