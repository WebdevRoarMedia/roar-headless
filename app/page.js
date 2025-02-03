import { Suspense } from 'react';
import HomeMainHero from './components/home/HomeMainHero';
import PostList from './components/post-cards/PostCard';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-[50vh] bg-gray-100" />}>
        <HomeMainHero />
      </Suspense>
      
      <Suspense fallback={<div className="p-4">Loading posts...</div>}>
        <PostList />
      </Suspense>
    </main>
  );
}
