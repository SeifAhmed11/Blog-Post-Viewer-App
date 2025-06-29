export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostPreview extends Omit<Post, 'body'> {
  excerpt: string;
}