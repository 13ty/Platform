import React from 'react';
import { ToggleLeft, Settings as SettingsIcon, Save } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { ViewSwitcher } from './ViewSwitcher';
import { SettingsPanel } from '../Settings/SettingsPanel';
import { ProjectHeader } from '../Project/ProjectHeader';
import { useSaveState } from '../../hooks/useSaveState';
import { toast } from 'sonner';

export function Header() {
  const { userInteractionEnabled, toggleUserInteraction } = useSettingsStore();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const { saveState, isSaving } = useSaveState();

  const handleSave = async () => {
    try {
      await saveState();
      toast.success('Application state saved successfully');
    } catch (error) {
      toast.error('Failed to save application state');
    }
  };
  
  return (
    <div className="flex flex-col bg-white border-b">
      <ProjectHeader />
      
      <div className="flex justify-between items-center p-4">
        <ViewSwitcher />

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleUserInteraction}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            <ToggleLeft className="w-5 h-5" />
            {userInteractionEnabled ? 'Disable' : 'Enable'} User Interaction
          </button>
        </div>
      </div>

      {isSettingsOpen && <SettingsPanel onClose={() => setIsSettingsOpen(false)} />}
    </div>
  );
}
