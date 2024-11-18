// pages/posts/[slug].js
import { useRouter } from 'next/router';
import { from, gql, useQuery } from '@apollo/client';
import client from '../../../lib/apolloClient';
import { GET_POSTS } from '../../../graphql/queries/GET_POSTS';
import { GET_POST_BY_SLUG } from '../../../graphql/queries/GET_POST_BY_SLUG';



export default function PostPage({ slug }) {
  const { data, loading, error } = useQuery(GET_POST_BY_SLUG, {
    variables: { slug },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

// Optional: Fetch paths for static generation
export async function getStaticPaths() {
  // Fetch slugs of posts to pre-render
  const { data } = await client.query({
    query: GET_POSTS,
  });

  const paths = data.posts.nodes.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

// Fetch data for a single post at build time
export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
}
