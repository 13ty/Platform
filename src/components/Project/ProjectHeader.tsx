import React from 'react';
import { Plus, Download, Upload, Trash2 } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { CreateProjectModal } from '../Modals/CreateProjectModal';
import { toast } from 'sonner';
import { exportProject, importProject } from '../../utils/export';

export function ProjectHeader() {
  const { projects, activeProject, deleteProject } = useProjectStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importProject(file);
      toast.success('Project imported successfully');
    } catch (error) {
      toast.error('Failed to import project');
    }
  };

  const handleExport = async () => {
    if (!activeProject) {
      toast.error('No active project to export');
      return;
    }

    try {
      await exportProject([/* agents */], [/* tasks */]); // Pass your actual data
      toast.success('Project exported successfully');
    } catch (error) {
      toast.error('Failed to export project');
    }
  };

  const handleDelete = async () => {
    if (!activeProject) return;
    
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(activeProject.id);
      toast.success('Project deleted successfully');
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-white border-b">
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>

      <label className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors cursor-pointer">
        <Upload className="w-4 h-4" />
        Import Project
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleImport}
          accept=".zip"
          className="hidden"
        />
      </label>

      <button
        onClick={handleExport}
        disabled={!activeProject}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 transition-colors"
      >
        <Download className="w-4 h-4" />
        Export Project
      </button>

      <button
        onClick={handleDelete}
        disabled={!activeProject}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Delete Project
      </button>

      {isCreateModalOpen && (
        <CreateProjectModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
        />
      )}
    </div>
  );
}
