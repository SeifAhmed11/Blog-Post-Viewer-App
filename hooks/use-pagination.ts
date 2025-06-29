'use client';

import { useState, useMemo, useCallback } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  itemsPerPage: number;
  totalItems: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setItemsPerPage: (items: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function usePagination<T>({
  data,
  itemsPerPage = 9,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPageState));
  const totalItems = data.length;

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPageState;
    const endIndex = startIndex + itemsPerPageState;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPageState]);

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const setItemsPerPage = useCallback((items: number) => {
    setItemsPerPageState(items);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  }, []);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  // Auto-adjust current page if it exceeds total pages
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    currentData,
    itemsPerPage: itemsPerPageState,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage,
    canGoNext,
    canGoPrev,
  };
}