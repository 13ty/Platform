import React from 'react';
import { ListTodo, Plus, Play, CheckCircle } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { CreateTaskModal } from '../Modals/CreateTaskModal';
import clsx from 'clsx';

export function TaskList() {
  const { tasks } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">Tasks</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 group"
            >
              <ListTodo className="w-4 h-4" />
              <span className="truncate text-sm flex-1">{task.title}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Play className="w-3 h-3" />
                </button>
              </div>
              <span className={clsx(
                "text-xs px-1.5 py-0.5 rounded",
                task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                task.status === 'active' ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800'
              )}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
