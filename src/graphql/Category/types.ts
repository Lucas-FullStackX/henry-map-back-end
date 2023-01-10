import { gql } from 'apollo-server-express';

export const types = gql`
  type Category {
    id: ID
    name: String
    roadMapsList: [Map]
  }
  type CategoriesListResponse {
    items: [Category]
    count: Int
  }
  input CategoryInput {
    name: String!
  }
`;
