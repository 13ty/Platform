import { useState } from 'react';
import { useAgentStore } from '../store/agentStore';
import { useTaskStore } from '../store/taskStore';
import { useChatStore } from '../store/chatStore';
import { useSettingsStore } from '../store/settingsStore';

export function useSaveState() {
  const [isSaving, setIsSaving] = useState(false);
  const agents = useAgentStore(state => state.agents);
  const tasks = useTaskStore(state => state.tasks);
  const chatSessions = useChatStore(state => state.sessions);
  const settings = useSettingsStore();

  const saveState = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('agents', JSON.stringify(agents));
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
      localStorage.setItem('settings', JSON.stringify({
        userInteractionEnabled: settings.userInteractionEnabled,
        autoSave: settings.autoSave,
        autoSaveInterval: settings.autoSaveInterval,
        apiStatus: settings.apiStatus
      }));

      // Simulate some delay to show the saving state
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  return { saveState, isSaving };
}
