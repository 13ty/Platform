import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { SourceUpload } from './SourceUpload';
import { SourceList } from './SourceList';

export function SourcesView() {
  const [showUpload, setShowUpload] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Sources
        </h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {showUpload ? 'Cancel' : 'Add Source'}
        </button>
      </div>

      {showUpload ? (
        <SourceUpload />
      ) : (
        <SourceList />
      )}
    </div>
  );
}
