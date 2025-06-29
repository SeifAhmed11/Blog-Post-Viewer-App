import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchPost, fetchPosts } from '@/lib/api';
import { PostDetailLoadingSkeleton } from '@/components/loading-skeleton';
import { ErrorState } from '@/components/error-boundary';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts();
    
    return posts.map((post) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await fetchPost(params.id);
    
    return {
      title: `${post.title} | The Blog`,
      description: post.body.slice(0, 160) + '...',
      openGraph: {
        title: post.title,
        description: post.body.slice(0, 160) + '...',
        type: 'article',
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found | The Blog',
      description: 'The requested blog post could not be found.',
    };
  }
}

async function PostContent({ id }: { id: string }) {
  try {
    const post = await fetchPost(id);

    return (
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        <article className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>User {post.userId}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Post #{post.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          {/* Post Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Post Content */}
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {post.body}
            </p>
          </div>

          {/* Post Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">User {post.userId}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Content Creator</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <span>Follow</span>
              </Button>
            </div>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load post';
    
    if (errorMessage === 'Post not found') {
      notFound();
    }

    return (
      <ErrorState
        error="Unable to load this blog post. Please check your connection and try again."
        showRetry={false}
      />
    );
  }
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/posts">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Posts</span>
            </Button>
          </Link>
        </div>

        {/* Post Content */}
        <Suspense fallback={<PostDetailLoadingSkeleton />}>
          <PostContent id={params.id} />
        </Suspense>
      </div>
    </div>
  );
}