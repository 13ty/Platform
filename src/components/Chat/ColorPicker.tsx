import React from 'react';

interface Props {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

const COLORS = [
  '#000000', '#434343', '#666666', '#999999',
  '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef',
  '#f3f3f3', '#ffffff', '#980000', '#ff0000',
  '#ff9900', '#ffff00', '#00ff00', '#00ffff',
  '#4a86e8', '#0000ff', '#9900ff', '#ff00ff'
];

export function ColorPicker({ color, onChange, onClose }: Props) {
  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border p-2">
      <div className="grid grid-cols-5 gap-1">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => {
              onChange(c);
              onClose();
            }}
            className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform"
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
      </div>
    </div>
  );
}
