'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showInfo = true,
  totalItems = 0,
  itemsPerPage = 10,
  className = ""
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 4) {
        // Show pages 2-5 and ellipsis
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show ellipsis and last 4 pages
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show ellipsis, current page area, ellipsis
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      {/* Pagination Info */}
      {showInfo && (
        <div className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
          Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{startItem}</span> to{' '}
          <span className="font-semibold text-blue-600 dark:text-blue-400">{endItem}</span> of{' '}
          <span className="font-semibold text-blue-600 dark:text-blue-400">{totalItems}</span> results
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Mobile Page Info */}
        <div className="sm:hidden text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-gray-700">
          {/* First Page Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="hidden sm:flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Page Numbers */}
          <div className="hidden sm:flex items-center space-x-1">
            {pageNumbers.map((page, index) => (
              <div key={index}>
                {page === '...' ? (
                  <div className="flex items-center justify-center w-10 h-10">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </div>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(page as number)}
                    className={`w-10 h-10 p-0 font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md transform scale-105'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                    title={`Go to page ${page}`}
                  >
                    {page}
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Current Page Display */}
          <div className="sm:hidden flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {currentPage}
            </span>
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last Page Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="hidden sm:flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Jump (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">Go to:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
              }
            }}
            className="w-16 px-2 py-1 text-center rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-gray-600 dark:text-gray-400">of {totalPages}</span>
        </div>
      </div>

      {/* Mobile Quick Navigation */}
      <div className="sm:hidden flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="flex items-center space-x-1"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span>First</span>
        </Button>
        
        <div className="flex items-center space-x-2 text-sm">
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
              }
            }}
            className="w-16 px-2 py-1 text-center rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-gray-600 dark:text-gray-400">/ {totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1"
        >
          <span>Last</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}