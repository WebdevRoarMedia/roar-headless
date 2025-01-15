import HomeMainHero from './components/home/HomeMainHero';
import PostList from './components/post-cards/PostCard';

export default function HomePage() {
  return (
    <main>
      <HomeMainHero />
      <PostList/>
      {/* Other components */}
    </main>
  );
}
