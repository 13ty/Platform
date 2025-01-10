import React from 'react';
import { Menu, Settings, HelpCircle, Share2 } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import clsx from 'clsx';

export function MainMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { activeProject } = useProjectStore();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            onClick={() => {/* TODO: Implement settings */}}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            onClick={() => {/* TODO: Implement share */}}
            disabled={!activeProject}
          >
            <Share2 className="w-4 h-4" />
            <span>Share Project</span>
          </button>

          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            onClick={() => {/* TODO: Implement help */}}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>
      )}
    </div>
  );
}
