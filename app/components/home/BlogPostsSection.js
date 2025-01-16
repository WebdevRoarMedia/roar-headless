'use client';

import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/app/graphql/queries/GET_POSTS';
import PostCard from '../post-cards/PostCard';
import './style.css';

export default function BlogPostsSection() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts</p>;

  // Tomar solo los primeros 3 posts
  const posts = data.posts.nodes.slice(0, 3);

  return (
    <section className="blog-posts-section">
      <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
      <div className="posts-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
