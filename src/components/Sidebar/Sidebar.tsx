import React from 'react';
import { ProjectList } from './ProjectList';
import { FileExplorer } from './FileExplorer';
import { AgentList } from './AgentList';
import { TaskList } from './TaskList';
import { MainMenu } from './MainMenu';
import { useViewStore } from '../../store/viewStore';
import { MessageSquare, Bot, ListTodo, FolderOpen } from 'lucide-react';
import clsx from 'clsx';

export function Sidebar() {
  const { activeView, setActiveView } = useViewStore();

  const views = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'project', icon: FolderOpen, label: 'Projects' },
    { id: 'task', icon: ListTodo, label: 'Tasks' },
    { id: 'agent', icon: Bot, label: 'Agents' }
  ];

  return (
    <div className="w-64 h-full bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="flex flex-col gap-2">
          {views.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as any)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-md w-full text-left',
                activeView === id 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-100'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {activeView === 'project' && <ProjectList />}
        {activeView === 'agent' && <AgentList />}
        {activeView === 'task' && <TaskList />}
        {activeView === 'chat' && <FileExplorer />}
      </div>

      <div className="p-4 border-t">
        <MainMenu />
      </div>
    </div>
  );
}
