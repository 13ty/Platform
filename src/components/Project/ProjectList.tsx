import React from 'react';
import { FolderOpen, Plus, Calendar, Clock } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { FileList } from './FileList';
import { CreateProjectModal } from '../Modals/CreateProjectModal';

export function ProjectList() {
  const { projects, activeProject, setActiveProject } = useProjectStore();
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  return (
    <div className="h-full flex">
      {/* Project List Sidebar */}
      <div className="w-64 border-r bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Projects</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Create New Project"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={`w-full flex items-center gap-2 p-3 rounded-lg text-left transition-colors ${
                activeProject?.id === project.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <FolderOpen className="w-5 h-5" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{project.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1 p-6">
        {activeProject ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{activeProject.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Clock className="w-4 h-4" />
                Last updated: {new Date(activeProject.updated_at).toLocaleString()}
              </div>
              <p className="mt-2 text-gray-600">{activeProject.description}</p>
            </div>

            <FileList projectId={activeProject.id} />
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Select a project or create a new one to get started
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateProjectModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />
      )}
    </div>
  );
}
