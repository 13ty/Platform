import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { TaskLeader } from './TaskLeader';
import { TaskGoal } from './TaskGoal';
import { TaskChat } from './TaskChat';
import { TaskTester } from './TaskTester';
import { Plus, ListTodo } from 'lucide-react';

export function TaskView() {
  const { tasks, activeTask, addTask } = useTaskStore();
  const [showForm, setShowForm] = React.useState(false);

  const createNewTask = () => {
    const newTask = {
      id: crypto.randomUUID(),
      title: "New Project Goal",
      description: "Define the main project objective",
      agents: [],
      status: 'pending',
      steps: [],
      created_at: Date.now(),
      updated_at: Date.now()
    };
    addTask(newTask);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ListTodo className="w-6 h-6" />
          Task Management
        </h2>
        <button
          onClick={createNewTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {activeTask ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <TaskGoal task={activeTask} />
            <TaskLeader task={activeTask} />
          </div>
          <div className="space-y-6">
            <TaskChat task={activeTask} />
            <TaskTester task={activeTask} />
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No active task. Create a new task to get started.
        </div>
      )}
    </div>
  );
}
