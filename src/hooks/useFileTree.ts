import { useEffect } from 'react';
import { useFileStore } from '../store/fileStore';
import { useChatStore } from '../store/chatStore';

export function useFileTree() {
  const { addFile, addDirectory } = useFileStore();
  const { activeSession } = useChatStore();

  useEffect(() => {
    if (activeSession) {
      // Create session directory
      const sessionPath = `/chat/session-${activeSession.id}`;
      addDirectory(sessionPath);

      // Create conversation file
      addFile(
        `${sessionPath}/conversation.md`,
        `# Chat Session ${activeSession.id}\n\nStarted: ${new Date(activeSession.created_at).toLocaleString()}\n\n`
      );

      // Create outputs directory
      addDirectory(`${sessionPath}/outputs`);
    }
  }, [activeSession?.id]);

  const saveOutput = (content: string, type: string) => {
    if (!activeSession) return;

    const timestamp = new Date().toISOString().replace(/[:]/g, '-');
    const sessionPath = `/chat/session-${activeSession.id}`;
    const fileName = `${timestamp}-output.${type}`;
    
    addFile(`${sessionPath}/outputs/${fileName}`, content);
  };

  return { saveOutput };
}
