import { useEffect, useRef } from 'react';
import { useProjectStore } from '../store/projectStore';

export function useAutosave(saveFunction: () => Promise<void>) {
  const { activeProject } = useProjectStore();
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (!activeProject?.settings.autoSave) return;

    const save = async () => {
      await saveFunction();
      timeoutRef.current = window.setTimeout(save, activeProject.settings.saveInterval);
    };

    save();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeProject, saveFunction]);
}
