// pages/index.js
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries/GET_POSTS';
import { GET_PAGE_ACF } from '../graphql/queries/GET_PAGE_ACF';
import PostCard from '../components/PostCard';

export default function HomePage() {
  // Fetch posts
  const { data: postData, loading: postLoading, error: postError } = useQuery(GET_POSTS);
  
  // Fetch page ACF fields for page id=2
  const { data: pageData, loading: pageLoading, error: pageError } = useQuery(GET_PAGE_ACF, {
    variables: { id: "2" },
  });

  if (postLoading || pageLoading) return <p>Loading...</p>;
  if (postError) return <p>Error loading posts: {postError.message}</p>;
  if (pageError) return <p>Error loading page ACF data: {pageError.message}</p>;

  // Extract ACF data
  const { title, mainHero } = pageData.page;

  return (
    <div>
      <div>
        
        <div className="hero-section">
          <h1>{mainHero.title}</h1>
          <h3>{mainHero.subTitle}</h3>
          {mainHero.mainheroimg && (
            <img src={mainHero.mainheroimg.sourceUrl} alt={mainHero.title} />
          )}
        </div>
      </div>

      <h1>Blog Posts</h1>
      <div className="post-list">
        {postData.posts.nodes.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

