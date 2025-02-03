'use client'
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/app/graphql/queries/GET_POSTS';
// import PostCard from './PostCard';

export default function PostList() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <div className="p-4">Loading posts...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading posts: {error.message}</div>;

  const posts = data?.posts?.nodes || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map((post) => (
        <article key={post.id} className="border rounded-lg shadow-sm p-4">
          {post.featuredImage && (
            <img 
              src={post.featuredImage.node.sourceUrl} 
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <h2 className="text-xl font-bold mt-2">{post.title}</h2>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        </article>
      ))}
    </div>
  );
}

