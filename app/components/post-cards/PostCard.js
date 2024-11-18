// components/PostCard.js
import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link href={`/posts/${post.slug}`}>
        
          <h2>{post.title}</h2>
          {post.featuredImage && (
            <img src={post.featuredImage.node.sourceUrl} alt={post.title} />
          )}
          <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        
      </Link>
    </div>
  );
}
