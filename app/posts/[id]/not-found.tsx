import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <FileQuestion className="h-10 w-10 text-blue-500 dark:text-blue-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Post Not Found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the blog post you're looking for. 
          It may have been moved or doesn't exist.
        </p>
        
        <Link href="/posts">
          <Button className="flex items-center space-x-2 mx-auto">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Posts</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}