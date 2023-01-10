import { gql } from 'apollo-server-express';

export const types = gql`
  type Map {
    id: ID
    name: String
    visible: Boolean
    node_custom_fields: JSON
    relation_custom_fields: JSON
    user: User
    category: CategoryMap
  }
  type CategoryMap {
    id: ID
    name: String
  }
  type MapsListResponse {
    items: [Map]
    count: Int
  }
  input MapInput {
    name: String
    visible: Boolean
    node_custom_fields: JSON
    relation_custom_fields: JSON
    userId: String
    categoryId: String
  }
  input MapsListFilters {
    name: String
  }
`;
