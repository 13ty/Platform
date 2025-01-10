import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export function BoltSignature() {
  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-100">
      <div className="flex items-center gap-1 text-blue-600">
        <Bot className="w-4 h-4" />
        <span className="text-sm font-medium">Bolt</span>
      </div>
      <Sparkles className="w-3 h-3 text-amber-500" />
      <span className="text-xs text-gray-500">Created with ❤️ by StackBlitz</span>
    </div>
  );
}
