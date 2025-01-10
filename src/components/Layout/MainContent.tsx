import React from 'react';
import { Bug } from 'lucide-react';
import { Chat } from '../Chat';
import { SourcesView } from '../Source/SourcesView';
import { TaskView } from '../Task/TaskView';
import { AgentView } from '../Agent/AgentView';
import { DebugPanel } from '../Debug/DebugPanel';
import { useViewStore } from '../../store/viewStore';
import clsx from 'clsx';

export function MainContent() {
  const { activeView } = useViewStore();
  const [showDebugPanel, setShowDebugPanel] = React.useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return <Chat />;
      case 'sources':
        return <SourcesView />;
      case 'task':
        return <TaskView />;
      case 'agent':
        return <AgentView />;
      default:
        return <Chat />;
    }
  };

  return (
    <div className="flex-1 flex bg-gray-50">
      <div className={clsx(
        "flex-1 p-4",
        showDebugPanel && "mr-80"
      )}>
        {renderContent()}
      </div>

      {showDebugPanel && <DebugPanel />}

      <button
        onClick={() => setShowDebugPanel(!showDebugPanel)}
        className={clsx(
          "fixed bottom-4 right-4 p-3 rounded-full shadow-lg",
          "bg-blue-500 text-white hover:bg-blue-600",
          "transition-transform transform",
          showDebugPanel && "translate-x-[-320px]"
        )}
      >
        <Bug className="w-5 h-5" />
      </button>
    </div>
  );
}
