// components/ApolloWrapper.js
'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default function ApolloWrapper({ children }) {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
    console.error('WordPress API URL is not defined');
    return <div>Configuration Error</div>;
  }
  
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
