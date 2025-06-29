import Link from 'next/link';
import { Post } from '@/types/blog';
import { createExcerpt } from '@/lib/api';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

interface PostCardProps {
  post: Post;
  viewMode?: 'grid' | 'list';
}

export function PostCard({ post, viewMode = 'grid' }: PostCardProps) {
  const excerpt = createExcerpt(post.body, viewMode === 'list' ? 200 : 120);

  if (viewMode === 'list') {
    return (
      <Link 
        href={`/posts/${post.id}`}
        className="block group"
      >
        <article className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Content */}
            <div className="flex-1">
              {/* Post Meta */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>User {post.userId}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Post #{post.id}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
              </div>

              {/* Post Title */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                {post.title}
              </h2>

              {/* Post Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {excerpt}
              </p>

              {/* Read More */}
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                <span>Read more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Placeholder for image in list view */}
            <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-600">
                <Calendar className="h-8 w-8" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link 
      href={`/posts/${post.id}`}
      className="block group h-full"
    >
      <article className="h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
        {/* Post Meta */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>User {post.userId}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Post #{post.id}</span>
          </div>
        </div>

        {/* Post Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
          {post.title}
        </h2>

        {/* Post Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Read More */}
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
          <span>Read more</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </article>
    </Link>
  );
}