import { gql } from '@apollo/client';

export const GET_HOME_MAIN_VIDEO = gql`
  query GetHomeMainVideo {
    page(id: "2", idType: DATABASE_ID) {
      homeMainVideo {
        homeMainVideoUrl
      }
    }
  }
`;
