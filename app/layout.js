// app/layout.js
import { Inter } from 'next/font/google';
import ApolloWrapper from './components/ApolloWrapper';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Roar Media',
  description: 'Your website description here',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
