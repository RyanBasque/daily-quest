import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-4">
        {label}
      </label>
      <input
        className={`w-full px-6 py-4 rounded-full bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700/50 focus:border-purple-500/50 focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 outline-none placeholder:text-gray-400 text-gray-900 dark:text-white ${className}`}
        {...props}
      />
    </div>
  );
};
