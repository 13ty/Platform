import React from 'react';
import { Box, ChevronRight, ChevronDown } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';

interface ArtifactNode {
  name: string;
  type: string;
  content?: string;
  children?: ArtifactNode[];
}

function ArtifactTreeNode({ node, depth = 0 }: { node: ArtifactNode; depth?: number }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <button
        className="w-full flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        ) : (
          <Box className="w-4 h-4" />
        )}
        <span className="truncate text-sm">{node.name}</span>
        <span className="text-xs text-gray-500 ml-auto">{node.type}</span>
      </button>
      {isOpen && node.children?.map((child, index) => (
        <ArtifactTreeNode key={index} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export function ArtifactExplorer() {
  const { activeProject } = useProjectStore();
  const artifacts = activeProject?.artifacts || [];

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700">Artifacts</h3>
      <div className="space-y-1">
        {artifacts.map((node, index) => (
          <ArtifactTreeNode key={index} node={node} />
        ))}
      </div>
    </div>
  );
}
