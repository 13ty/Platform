import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  type: 'info' | 'success' | 'error';
  message: string;
}

export function PuzzleNotification({ type, message }: Props) {
  return (
    <div 
      id="USERNOTIFICATION"
      className={clsx(
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg',
        'flex items-center gap-2',
        type === 'info' && 'bg-blue-50 text-blue-700',
        type === 'success' && 'bg-green-50 text-green-700',
        type === 'error' && 'bg-red-50 text-red-700'
      )}
    >
      {type === 'info' && <AlertCircle className="w-5 h-5" />}
      {type === 'success' && <CheckCircle className="w-5 h-5" />}
      {type === 'error' && <XCircle className="w-5 h-5" />}
      <span>{message}</span>
    </div>
  );
}
