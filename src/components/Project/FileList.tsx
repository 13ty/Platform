import React from 'react';
import { File, Upload, FolderPlus, Trash2 } from 'lucide-react';
import { useFileStore } from '../../store/fileStore';
import { toast } from 'sonner';

interface Props {
  projectId: string;
}

export function FileList({ projectId }: Props) {
  const { files } = useFileStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Handle file upload logic
    toast.success('Files uploaded successfully');
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (!folderName) return;

    // Handle folder creation logic
    toast.success('Folder created successfully');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Project Files</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateFolder}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
          <label className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Files
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.path}
            className="p-4 border rounded-lg hover:border-blue-500 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <File className="w-5 h-5 text-blue-500" />
                <span className="font-medium truncate">{file.name}</span>
              </div>
              <button
                onClick={() => {
                  // Handle delete
                  toast.success('File deleted');
                }}
                className="p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Added {new Date().toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
