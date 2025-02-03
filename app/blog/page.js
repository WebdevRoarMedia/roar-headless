import PostList from '../components/post-cards/PostCard';

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Blog Posts</h1>
      <PostList />
    </main>
  );
}
