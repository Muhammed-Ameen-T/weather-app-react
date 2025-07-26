import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="backdrop-blur-md bg-red-500/10 dark:bg-red-900/10 border border-red-500/30 dark:border-red-700/30 rounded-2xl p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 rounded-full bg-red-500/20 dark:bg-red-900/20">
          <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-red-600 dark:text-red-400 mb-4">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}