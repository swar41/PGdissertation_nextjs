// components/ui/progress.tsx
import React from 'react';

interface ProgressProps {
  value: number; // The progress percentage (0-100)
  className?: string; // Optional className for custom styling
}

export const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div className={`relative w-full h-4 bg-gray-200 rounded ${className}`}>
      <div
        className="absolute left-0 top-0 h-4 bg-blue-600 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
