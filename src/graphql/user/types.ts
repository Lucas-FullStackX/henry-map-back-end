import { gql } from 'apollo-server-express';

export const types = gql`
  type User {
    id: ID
    name: String
    email: String
    roadMapsList: [Map]
  }
  input UserInput {
    name: String
    email: String
  }
`;
