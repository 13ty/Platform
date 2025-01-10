import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';

const AUTOSAVE_INTERVALS = [5, 10, 15, 20];

export function AutoSaveSettings() {
  const { autoSave, autoSaveInterval, toggleAutoSave, setAutoSaveInterval } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium">Auto-save</span>
          <p className="text-sm text-gray-500">Automatically save changes</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={autoSave}
            onChange={() => toggleAutoSave()}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {autoSave && (
        <div>
          <label className="block text-sm font-medium mb-2">Save Interval (rounds)</label>
          <select
            value={autoSaveInterval}
            onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
          >
            {AUTOSAVE_INTERVALS.map((interval) => (
              <option key={interval} value={interval}>
                Every {interval} rounds
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
