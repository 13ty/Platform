import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { Plus, Trash2, Settings } from 'lucide-react';

export function ProjectView() {
  const { projects, activeProject, deleteProject } = useProjectStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button className="btn-primary flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`p-4 rounded-lg border ${
              activeProject?.id === project.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{project.name}</h3>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Settings className="w-4 h-4" />
                </button>
                <button 
                  className="p-1 hover:bg-red-100 rounded text-red-500"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{project.description}</p>
            <div className="mt-4 text-xs text-gray-500">
              Created: {new Date(project.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
