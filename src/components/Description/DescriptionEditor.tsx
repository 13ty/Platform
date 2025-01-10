import React from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useEditDescription } from '../../hooks/useEditDescription';
import clsx from 'clsx';

interface Props {
  description: string;
  onSave: (description: string) => Promise<void>;
  className?: string;
}

export function DescriptionEditor({ description, onSave, className }: Props) {
  const {
    editing,
    description: currentDescription,
    toggleEdit,
    handleSubmit,
    handleChange,
    handleKeyDown
  } = useEditDescription({
    initialDescription: description,
    onSave
  });

  if (!editing) {
    return (
      <div className={clsx('flex items-center gap-2', className)}>
        <span className="text-gray-700">{description}</span>
        <button
          onClick={toggleEdit}
          className="p-1 hover:bg-gray-100 rounded"
          title="Edit description"
        >
          <Pencil className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={clsx('flex items-center gap-2', className)}>
      <input
        type="text"
        value={currentDescription}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autoFocus
      />
      <button
        type="submit"
        className="p-1 hover:bg-green-100 text-green-600 rounded"
        title="Save changes"
      >
        <Check className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={toggleEdit}
        className="p-1 hover:bg-red-100 text-red-600 rounded"
        title="Cancel"
      >
        <X className="w-4 h-4" />
      </button>
    </form>
  );
}
