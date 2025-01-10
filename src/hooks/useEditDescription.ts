import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useSettingsStore } from '../store/settingsStore';

interface EditDescriptionOptions {
  initialDescription?: string;
  maxLength?: number;
  onSave?: (description: string) => Promise<void>;
}

export function useEditDescription({
  initialDescription = '',
  maxLength = 100,
  onSave
}: EditDescriptionOptions) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  const toggleEdit = useCallback(() => {
    setEditing(prev => !prev);
    if (editing) {
      setDescription(initialDescription);
    }
  }, [editing, initialDescription]);

  const validateDescription = useCallback((text: string) => {
    const trimmed = text.trim();

    if (trimmed === initialDescription) {
      return false;
    }

    if (trimmed.length === 0 || trimmed.length > maxLength) {
      toast.error(`Description must be between 1 and ${maxLength} characters`);
      return false;
    }

    if (!/^[a-zA-Z0-9\s\-_.,!?()[\]{}'"]+$/.test(trimmed)) {
      toast.error('Description can only contain letters, numbers, spaces, and basic punctuation');
      return false;
    }

    return true;
  }, [initialDescription, maxLength]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDescription(description)) {
      return;
    }

    try {
      if (onSave) {
        await onSave(description);
        toast.success('Description updated successfully');
      }
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update description: ' + (error as Error).message);
    }
  }, [description, validateDescription, onSave]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setDescription(initialDescription);
      setEditing(false);
    }
  }, [initialDescription]);

  return {
    editing,
    description,
    toggleEdit,
    handleSubmit,
    handleChange,
    handleKeyDown
  };
}
