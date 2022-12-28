import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar JSON
  type Task {
    id: ID
    title: String
    description: String
  }
  type Map {
    id: ID
    name: String
    visible: Boolean
    node_custom_fields: JSON
    relation_custom_fields: JSON
  }
  type Query {
    hello: String
    getAllTasks: [Task]
    getTask(id: ID): Task
    MapsList: [Map]
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
  }
  type Mutation {
    createTask(task: TaskInput): Task
    createMap(map: MapInput): Map
    deleteTask(id: ID): String
    updateTask(id: ID, task: TaskInput): Task
  }
`;
