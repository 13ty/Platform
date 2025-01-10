import React from 'react';
import { PlayCircle, PauseCircle, Square, Download, Upload } from 'lucide-react';
import { useConversationStore } from '../../store/conversationStore';
import { saveAs } from 'file-saver';

export function ConversationControls() {
  const { 
    isRunning, 
    isPaused,
    startConversation,
    pauseConversation,
    stopConversation,
    exportConversation
  } = useConversationStore();

  const handleExport = async () => {
    const data = await exportConversation();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'conversation-export.json');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        // Import conversation data
      } catch (error) {
        console.error('Failed to import conversation:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      {!isRunning ? (
        <button
          onClick={startConversation}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          title="Start Conversation"
        >
          <PlayCircle className="w-4 h-4" />
        </button>
      ) : (
        <>
          <button
            onClick={pauseConversation}
            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            title={isPaused ? "Resume Conversation" : "Pause Conversation"}
          >
            <PauseCircle className="w-4 h-4" />
          </button>
          <button
            onClick={stopConversation}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            title="Stop Conversation"
          >
            <Square className="w-4 h-4" />
          </button>
        </>
      )}
      
      <button
        onClick={handleExport}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        title="Export Conversation"
      >
        <Download className="w-4 h-4" />
      </button>
      
      <label className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer" title="Import Conversation">
        <Upload className="w-4 h-4" />
        <input
          type="file"
          onChange={handleImport}
          accept=".json"
          className="hidden"
        />
      </label>
    </div>
  );
}
