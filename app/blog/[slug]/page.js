import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';

// GraphQL query to fetch a post by slug
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

// GraphQL query to fetch all slugs
const GET_POSTS = gql`
  query GetPosts {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

// Server Component
export default async function PostPage({ params }) {
  const { slug } = params;

  try {
    const { data, error } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    if (error) {
      console.error('GraphQL Error:', error);
      return <div>Error loading post</div>;
    }

    if (!data || !data.post) {
      return <div>Post not found</div>;
    }

    const { post } = data;

    return (
      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.featuredImage && (
          <img 
            src={post.featuredImage.node.sourceUrl} 
            alt={post.title}
            className="w-full max-h-96 object-cover mb-6" 
          />
        )}
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        <p className="mt-4 text-gray-600">
          Published on: {new Date(post.date).toLocaleDateString()}
        </p>
      </article>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return <div>Error loading post</div>;
  }
}

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  try {
    const { data } = await client.query({ 
      query: GET_POSTS,
      fetchPolicy: 'no-cache'
    });

    if (!data || !data.posts || !data.posts.nodes) {
      console.error('No posts data returned');
      return [];
    }

    return data.posts.nodes.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
