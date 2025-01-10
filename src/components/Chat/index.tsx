import React from 'react';
import { useChatStore } from '../../store/chatStore';
import { Play, Pause, Square } from 'lucide-react';
import ChatWindow from './ChatWindow';

export function Chat() {
  const { 
    createSession, 
    activeSession, 
    pauseSession, 
    resumeSession, 
    endSession 
  } = useChatStore();

  const handleStart = () => {
    createSession(['user']);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeSession ? (
            <>
              {activeSession.status === 'active' && (
                <button 
                  onClick={pauseSession}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Pause chat"
                >
                  <Pause className="w-5 h-5" />
                </button>
              )}
              {activeSession.status === 'paused' && (
                <button
                  onClick={resumeSession}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Resume chat"
                >
                  <Play className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={endSession}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="End chat"
              >
                <Square className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={handleStart}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Start new chat"
            >
              <Play className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="text-sm font-medium">
          {activeSession ? (
            `Chat Session ${activeSession.id.slice(0, 8)}`
          ) : (
            'No Active Session'
          )}
        </div>
      </div>
      <ChatWindow />
    </div>
  );
}

export default Chat;
