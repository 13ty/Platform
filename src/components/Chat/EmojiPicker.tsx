import React from 'react';

interface Props {
  onSelect: (emoji: string) => void;
}

const EMOJI_CATEGORIES = {
  'Smileys': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌'],
  'Gestures': ['👋', '🤚', '✋', '🖐️', '👌', '🤌', '👍', '👎', '👊', '✊', '🤝', '🙏'],
  'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💔', '❣️', '💕'],
  'Objects': ['💡', '📱', '💻', '⌨️', '🖥️', '🔋', '📚', '✏️', '📝', '🗒️', '📎', '🔒']
};

export function EmojiPicker({ onSelect }: Props) {
  const [category, setCategory] = React.useState<keyof typeof EMOJI_CATEGORIES>('Smileys');

  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border p-2 w-64">
      <div className="flex gap-1 mb-2 overflow-x-auto pb-2">
        {Object.keys(EMOJI_CATEGORIES).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat as keyof typeof EMOJI_CATEGORIES)}
            className={`px-2 py-1 rounded text-sm whitespace-nowrap ${
              category === cat ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-6 gap-1">
        {EMOJI_CATEGORIES[category].map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="p-1 hover:bg-gray-100 rounded text-xl"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
