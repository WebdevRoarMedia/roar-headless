'use client'
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/app/graphql/queries/GET_POSTS';
// import PostCard from './PostCard';

export default function PostList() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts</p>;
console.log(data)
  const posts = data?.posts?.nodes || []; // Adjust based on your data structure

  return (
    <div className="post-list">
      {posts.map((post) => (
        
        <div>
            <h1>
              {post.title}
            </h1>
        </div>
      
      ))}
    </div>
  );
}

