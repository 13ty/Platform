import React from 'react';
import { Upload } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';

export function ProjectImport() {
  const { addProject } = useProjectStore();

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const project = JSON.parse(content);
        await addProject(project);
      } catch (error) {
        console.error('Failed to import project:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
      <Upload className="w-4 h-4" />
      <span>Import Project</span>
      <input
        type="file"
        onChange={handleImport}
        accept=".json"
        className="hidden"
      />
    </label>
  );
}
