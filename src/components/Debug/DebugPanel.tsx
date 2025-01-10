import React from 'react';
import { Bug } from 'lucide-react';
import { DebugControls } from './DebugControls';
import { ArtifactPreview } from './ArtifactPreview';
import { ConnectionStatus } from './ConnectionStatus';

export function DebugPanel() {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-gray-50 border-l overflow-y-auto p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Bug className="w-5 h-5 text-blue-500" />
        <h2 className="font-bold">Debug Panel</h2>
      </div>

      <ConnectionStatus />
      <DebugControls />
      <ArtifactPreview />
    </div>
  );
}
