import React from 'react';
import { X } from 'lucide-react';
import { GeneralSettings } from './GeneralSettings';
import { APIConfiguration } from './APIConfiguration';
import { SystemSettings } from './SystemSettings';
import { ConnectionCheck } from './ConnectionCheck';
import { JsonGenerator } from './JsonGenerator';

interface Props {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-96 bg-white h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <GeneralSettings />
          <ConnectionCheck />
          <APIConfiguration />
          <JsonGenerator />
          <SystemSettings />
        </div>
      </div>
    </div>
  );
}
