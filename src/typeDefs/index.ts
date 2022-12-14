import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar JSON
  type Map {
    id: ID
    name: String
    visible: Boolean
    node_custom_fields: JSON
    relation_custom_fields: JSON
    user: User
  }
  type User {
    id: ID
    name: String
    email: String
    roadMapsList: [Map]
  }
  type Task {
    id: ID
    title: String
    description: String
  }
  type MapListResponse {
    items: [Map]
    count: Int
  }
  input TaskInput {
    title: String
    description: String
  }
  input MapInput {
    name: String
    visible: Boolean
    node_custom_fields: JSON
    relation_custom_fields: JSON
    userId: String
  }
  input UserInput {
    name: String
    email: String
  }
  type Query {
    hello: String
    getAllTasks: [Task]
    getTask(id: ID): Task
    MapsList: MapListResponse
  }
  type Mutation {
    createTask(task: TaskInput): Task
    createMap(map: MapInput!): Map
    deleteTask(id: ID): String
    updateTask(id: ID, task: TaskInput): Task
    createUser(user: UserInput!): User
  }
`;
