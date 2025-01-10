import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';

export function ProjectList() {
  const { projects, activeProject, setActiveProject } = useProjectStore();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">Projects</h3>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-1">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveProject(project.id)}
            className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left ${
              activeProject?.id === project.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span className="truncate">{project.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
