'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorState({ error, onRetry, showRetry = true }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-3 mb-4">
        <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-6 max-w-md">
        {error}
      </p>
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try again</span>
        </Button>
      )}
    </div>
  );
}