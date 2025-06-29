'use client';

import { Suspense, useState, useEffect } from 'react';
import { fetchPosts } from '@/lib/api';
import { PostCard } from '@/components/post-card';
import { PostsLoadingSkeleton } from '@/components/loading-skeleton';
import { ErrorState } from '@/components/error-boundary';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { Search, Filter, X, SortAsc, SortDesc, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/blog';

interface FilterState {
  search: string;
  sortBy: 'id' | 'title' | 'userId';
  sortOrder: 'asc' | 'desc';
  userId?: number;
}

function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    sortBy: 'id',
    sortOrder: 'desc',
  });

  // Pagination hook with proper configuration
  const {
    currentPage,
    totalPages,
    currentData: paginatedPosts,
    itemsPerPage,
    totalItems,
    goToPage,
    setItemsPerPage,
    canGoNext,
    canGoPrev,
  } = usePagination({
    data: filteredPosts,
    itemsPerPage: 9,
    initialPage: 1,
  });

  // Fetch posts on component mount
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (err) {
        setError('Unable to load blog posts. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Apply filters whenever filters or posts change
  useEffect(() => {
    let result = [...posts];

    // Apply search filter
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.body.toLowerCase().includes(searchTerm)
      );
    }

    // Apply user filter
    if (filters.userId) {
      result = result.filter(post => post.userId === filters.userId);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (filters.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'userId':
          aValue = a.userId;
          bValue = b.userId;
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredPosts(result);
    // Reset to first page when filters change
    goToPage(1);
  }, [posts, filters, goToPage]);

  // Get unique user IDs for filter dropdown
  const uniqueUserIds = Array.from(new Set(posts.map(post => post.userId))).sort((a, b) => a - b);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleUserFilter = (userId?: number) => {
    setFilters(prev => ({ ...prev, userId }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      sortBy: 'id',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = filters.search.trim() || filters.userId;

  if (loading) {
    return <PostsLoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} showRetry={false} />;
  }

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3 py-2"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3 py-2"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Toggle Button */}
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-3"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs rounded-full w-2 h-2"></span>
            )}
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                  <div className="flex space-x-1">
                    {[
                      { key: 'id' as const, label: 'Date' },
                      { key: 'title' as const, label: 'Title' },
                      { key: 'userId' as const, label: 'Author' },
                    ].map(({ key, label }) => (
                      <Button
                        key={key}
                        variant={filters.sortBy === key ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleSortChange(key)}
                        className="flex items-center space-x-1"
                      >
                        <span>{label}</span>
                        {filters.sortBy === key && (
                          filters.sortOrder === 'asc' ? 
                          <SortAsc className="h-3 w-3" /> : 
                          <SortDesc className="h-3 w-3" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* User Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Author:</span>
                  <select
                    value={filters.userId || ''}
                    onChange={(e) => handleUserFilter(e.target.value ? Number(e.target.value) : undefined)}
                    className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Authors</option>
                    {uniqueUserIds.map(userId => (
                      <option key={userId} value={userId}>User {userId}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items per page */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={6}>6 posts</option>
                  <option value={9}>9 posts</option>
                  <option value={12}>12 posts</option>
                  <option value={18}>18 posts</option>
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="h-3 w-3" />
                  <span>Clear</span>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {paginatedPosts.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} posts
            {hasActiveFilters && (
              <span className="ml-1 text-blue-600 dark:text-blue-400">
                (filtered from {posts.length} total)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Posts Grid/List */}
      {paginatedPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Try adjusting your search terms or filters.
          </p>
          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className={
            viewMode === 'grid' 
              ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-6"
          }>
            {paginatedPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PostCard post={post} viewMode={viewMode} />
              </div>
            ))}
          </div>

          {/* Pagination - Only show if there are multiple pages */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                showInfo={true}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Posts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover insights, stories, and ideas that inspire and inform. 
            Explore our collection of thoughtfully crafted articles.
          </p>
        </div>

        {/* Posts List with Search, Filter, and Pagination */}
        <PostsList />
      </div>
    </div>
  );
}