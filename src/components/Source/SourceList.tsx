import React from 'react';
import { FileText, Lock, Trash2 } from 'lucide-react';
import { useSourceStore } from '../../store/sourceStore';
import { useProjectStore } from '../../store/projectStore';
import clsx from 'clsx';

export function SourceList() {
  const { sources, removeSource } = useSourceStore();
  const { activeProject } = useProjectStore();
  
  const projectSources = sources.filter(s => s.projectId === activeProject?.id);

  if (!activeProject) {
    return (
      <div className="text-center py-12 text-gray-500">
        Select a project to view sources
      </div>
    );
  }

  if (projectSources.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No sources added yet. Click "Add Source" to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projectSources.map((source) => (
        <div
          key={source.id}
          className={clsx(
            'p-4 rounded-lg border group',
            'hover:border-blue-500 transition-colors'
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{source.name}</span>
              {source.readOnly && (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <button
              onClick={() => removeSource(source.id)}
              className="p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-3 space-y-2">
            <p className="text-sm text-gray-600">{source.description}</p>
            <p className="text-xs text-gray-500">Role: {source.role}</p>
            <div className="text-xs text-gray-400">
              Added {new Date(source.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
