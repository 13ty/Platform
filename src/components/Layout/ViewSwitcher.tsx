import React from 'react';
import { MessageSquare, Bot, ListTodo, FileText } from 'lucide-react';
import { useViewStore } from '../../store/viewStore';
import clsx from 'clsx';

export function ViewSwitcher() {
  const { activeView, setActiveView } = useViewStore();

  const views = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'sources', icon: FileText, label: 'Sources' },
    { id: 'task', icon: ListTodo, label: 'Tasks' },
    { id: 'agent', icon: Bot, label: 'Agents' }
  ];

  return (
    <div className="flex gap-2">
      {views.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActiveView(id as any)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
            activeView === id 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          )}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
