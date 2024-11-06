// graphql/queries/GET_PAGE_ACF.js
import { gql } from '@apollo/client';

export const GET_PAGE_ACF = gql`
  query GetPageACF($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
      title
      mainHero {
        title
        subTitle
        mainheroimg {
          sourceUrl
        }
      }
    }
  }
`;
