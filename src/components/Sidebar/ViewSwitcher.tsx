import React from 'react';
import { Files, Box } from 'lucide-react';
import { useViewStore } from '../../store/viewStore';
import clsx from 'clsx';

export function ViewSwitcher() {
  const { activeView, setActiveView } = useViewStore();

  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => setActiveView('chat')}
        className={clsx(
          'flex items-center gap-2 px-3 py-1.5 rounded',
          'text-sm font-medium transition-colors',
          activeView === 'chat'
            ? 'bg-white shadow'
            : 'hover:bg-gray-200'
        )}
      >
        <Files className="w-4 h-4" />
        Chat
      </button>
      <button
        onClick={() => setActiveView('files')}
        className={clsx(
          'flex items-center gap-2 px-3 py-1.5 rounded',
          'text-sm font-medium transition-colors',
          activeView === 'files'
            ? 'bg-white shadow'
            : 'hover:bg-gray-200'
        )}
      >
        <Box className="w-4 h-4" />
        Files
      </button>
    </div>
  );
}
