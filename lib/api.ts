import { Post } from '@/types/blog';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found');
    }
    throw new Error('Failed to fetch post');
  }
  
  return response.json();
}

export function createExcerpt(content: string, maxLength: number = 150): string {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength).trim() + '...';
}