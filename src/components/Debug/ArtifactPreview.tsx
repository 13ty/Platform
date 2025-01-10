import React from 'react';
import { FileText, Code, Eye } from 'lucide-react';
import { useFileStore } from '../../store/fileStore';
import { Editor } from '@monaco-editor/react';

export function ArtifactPreview() {
  const { files } = useFileStore();
  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  const handleFileSelect = (file: any) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold">Artifact Preview</h3>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {selectedFile ? (
          <Editor
            height="300px"
            language={selectedFile.name.split('.').pop() || 'text'}
            value={selectedFile.content}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Select a file to preview
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Available Artifacts</h4>
        <div className="max-h-[200px] overflow-y-auto space-y-1">
          {files.map((file) => (
            <button
              key={file.path}
              onClick={() => handleFileSelect(file)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:bg-gray-100 ${
                selectedFile?.path === file.path ? 'bg-blue-50' : ''
              }`}
            >
              {file.type === 'file' ? (
                <Code className="w-4 h-4 text-gray-500" />
              ) : (
                <FileText className="w-4 h-4 text-gray-500" />
              )}
              <span className="text-sm truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
