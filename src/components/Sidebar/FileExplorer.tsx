import React from 'react';
import { File, ChevronRight, ChevronDown, Folder } from 'lucide-react';
import { useFileStore } from '../../store/fileStore';
import clsx from 'clsx';

interface TreeNodeProps {
  node: {
    name: string;
    type: 'file' | 'directory';
    content?: string;
    children?: any[];
    path: string;
  };
  depth?: number;
  onSelect: (node: any) => void;
  selectedPath: string | null;
}

function TreeNode({ node, depth = 0, onSelect, selectedPath }: TreeNodeProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = node.type === 'directory' && node.children?.length;

  return (
    <div>
      <button
        onClick={() => {
          if (node.type === 'directory') {
            setIsOpen(!isOpen);
          } else {
            onSelect(node);
          }
        }}
        className={clsx(
          'w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-left',
          selectedPath === node.path && 'bg-blue-50'
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {node.type === 'directory' ? (
          <>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <Folder className="w-4 h-4 text-blue-500" />
          </>
        ) : (
          <>
            <span className="w-4" />
            <File className="w-4 h-4 text-gray-500" />
          </>
        )}
        <span className="text-sm truncate">{node.name}</span>
      </button>

      {isOpen && hasChildren && (
        <div>
          {node.children?.map((child, index) => (
            <TreeNode
              key={`${child.path}-${index}`}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer() {
  const { files } = useFileStore();
  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  const handleFileSelect = (node: any) => {
    if (node.type === 'file') {
      setSelectedFile(node);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700">Files</h3>
      <div className="space-y-1">
        {files.map((node, index) => (
          <TreeNode
            key={`${node.path}-${index}`}
            node={node}
            onSelect={handleFileSelect}
            selectedPath={selectedFile?.path || null}
          />
        ))}
      </div>
    </div>
  );
}
