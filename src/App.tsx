import React from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Chat } from './components/Chat';
import { useAgentStore } from './store/agentStore';
import { useProjectStore } from './store/projectStore';
import { Header } from './components/Layout/Header';
import { MainContent } from './components/Layout/MainContent';
import { BoltSignature } from './components/Signature/BoltSignature';

export default function App() {
  const { loadProjects } = useProjectStore();

  React.useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent />
      </div>
      <BoltSignature />
    </div>
  );
}
