import { gql } from 'apollo-server-express';

export const mutations = `
    createUser(user: UserInput!): User
`;
