import React from 'react';
import { Save } from 'lucide-react';
import { useConversationStore } from '../../store/conversationStore';
import { DATABASE_CONFIG } from '../../utils/database/config';

export function AutoSaveControl() {
  const { autoSaveRound, setAutoSaveRound } = useConversationStore();

  return (
    <div className="flex items-center gap-2">
      <Save className="w-4 h-4" />
      <select
        value={autoSaveRound}
        onChange={(e) => setAutoSaveRound(Number(e.target.value))}
        className="px-2 py-1 border rounded"
      >
        {DATABASE_CONFIG.autoSave.rounds.map((round) => (
          <option key={round} value={round}>
            Save every {round} rounds
          </option>
        ))}
      </select>
    </div>
  );
}
