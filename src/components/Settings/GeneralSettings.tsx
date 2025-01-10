import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { Switch } from '../ui/Switch';
import { AutoSaveSettings } from './AutoSaveSettings';

export function GeneralSettings() {
  const { darkMode, toggleDarkMode } = useSettingsStore();

  return (
    <section>
      <h3 className="font-semibold mb-4">General</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Dark Mode</span>
            <p className="text-sm text-gray-500">Enable dark theme for the application</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>

        <AutoSaveSettings />
      </div>
    </section>
  );
}
