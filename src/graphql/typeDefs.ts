import { gql } from 'apollo-server-express';
import { Category } from './Category';
import { RoadMap } from './RoadMap';
import { User } from './User';
const typeDefs = gql`
  scalar JSON
  ${User.types}
  ${RoadMap.types}
  ${Category.types}
  type Query {
    ${User.queries}
    ${RoadMap.queries}
    ${Category.queries}
  }
  type Mutation {
    ${User.mutations}
    ${RoadMap.mutations}
    ${Category.mutations}
  }
`;
export default typeDefs;
