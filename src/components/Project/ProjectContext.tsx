import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { Download } from 'lucide-react';

export function ProjectContext() {
  const { activeProject } = useProjectStore();

  const handleExport = () => {
    if (!activeProject) return;
    
    const dataStr = JSON.stringify(activeProject, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeProject.name}-export.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  };

  if (!activeProject) return null;

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-2">Project Context</h3>
      <div className="space-y-2 text-sm">
        <div>Created: {new Date(activeProject.created_at).toLocaleString()}</div>
        <div>Last Updated: {new Date(activeProject.updated_at).toLocaleString()}</div>
        <div>Auto-save: {activeProject.settings.autoSave ? 'Enabled' : 'Disabled'}</div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Download className="w-4 h-4" />
          Export Project
        </button>
      </div>
    </div>
  );
}
