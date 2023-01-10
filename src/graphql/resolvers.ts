import GraphQLJSON from 'graphql-type-json';
import { Category } from './Category';
import { RoadMap } from './RoadMap';
import { User } from './User';

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    ...User.resolvers.queries,
    ...RoadMap.resolvers.queries,
    ...Category.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...RoadMap.resolvers.mutations,
    ...Category.resolvers.mutations,
  },
};

export default resolvers;
