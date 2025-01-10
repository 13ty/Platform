import React from 'react';
import { FileText, Lock } from 'lucide-react';
import { useSourceStore, Source } from '../../store/sourceStore';

interface Props {
  sourceId: string;
  inline?: boolean;
}

export function SourceReference({ sourceId, inline = false }: Props) {
  const { getSourceById } = useSourceStore();
  const source = getSourceById(sourceId);

  if (!source) return null;

  if (inline) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-sm">
        <FileText className="w-3 h-3" />
        {source.name}
        {source.readOnly && <Lock className="w-3 h-3" />}
      </span>
    );
  }

  return (
    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
      <div className="p-2 bg-blue-100 rounded">
        <FileText className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-blue-900">{source.name}</h4>
          {source.readOnly && (
            <Lock className="w-4 h-4 text-blue-600" />
          )}
        </div>
        <p className="text-sm text-blue-700 mt-1">{source.description}</p>
        <p className="text-xs text-blue-600 mt-1">Role: {source.role}</p>
      </div>
    </div>
  );
}
