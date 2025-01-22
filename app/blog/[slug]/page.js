// pages/posts/[slug].js

import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';

// GraphQL query to fetch a post by slug
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    post(slug: $slug) {
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
    posts {
      nodes {
        slug
      }
    }
  }
`;
// Server Component
export default async function PostPage({ params }) {
  const { slug } = params;
  // Fetch the post data from your GraphQL API
  const { data } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });
  const { post } = data;
  return (
    <div>
      <h1>{post.title}</h1>
      {post.featuredImage && (
        <img src={post.featuredImage.node.sourceUrl} alt={post.title} />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <p>Published on: {new Date(post.date).toLocaleDateString()}</p>
    </div>
  );
}
// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const { data } = await client.query({ query: GET_POSTS });
  return data.posts.nodes.map((post) => ({
    slug: post.slug,
  }));
}





