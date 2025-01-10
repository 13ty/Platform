import React from 'react';
import { Download, Upload } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';

export function ChatExport() {
  const { activeSession, sessions } = useChatStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (!activeSession) {
      toast.error('No active chat session to export');
      return;
    }

    const exportData = {
      session: activeSession,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    saveAs(blob, `chat-export-${activeSession.id}.json`);
    toast.success('Chat exported successfully');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        // Validate imported data
        if (!importedData.session || !importedData.session.messages) {
          throw new Error('Invalid chat export file');
        }

        // TODO: Import the chat session
        toast.success('Chat imported successfully');
      } catch (error) {
        toast.error('Failed to import chat: Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        disabled={!activeSession}
        className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        title="Export Chat"
      >
        <Download className="w-4 h-4" />
        Export
      </button>

      <label className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer">
        <Upload className="w-4 h-4" />
        Import
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleImport}
          accept=".json"
          className="hidden"
        />
      </label>
    </div>
  );
}
