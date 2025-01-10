import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  connected: boolean;
  label: string;
}

export function APIStatusIndicator({ connected, label }: Props) {
  return (
    <div className="flex items-center gap-2">
      {connected ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
      <span className="text-sm">{label}</span>
    </div>
  );
}
