import { gql } from 'apollo-server-express';
import { RoadMap } from './roadMap';
import { User } from './user';
const typeDefs = gql`
  scalar JSON
  ${User.types}
  ${RoadMap.types}
  
  type Query {
    ${User.queries}
    ${RoadMap.queries}
  }
  
  type Mutation {
    ${User.mutations}
    ${RoadMap.mutations}
  }
  type Category {
    id: ID
    name: String
    roadMapsList: [Map]
  }
  type Task {
    id: ID
    title: String
    description: String
  }
 
  type CategoriesListResponse {
    items: [Category]
    count: Int
  }
  input TaskInput {
    title: String
    description: String
  }
  input CategoryInput {
    name: String!
  }
  type Query {
    hello: String
    getAllTasks: [Task]
    getTask(id: ID): Task
    categoriesList: CategoriesListResponse
    getCategory: Category
  }
  type Mutation {
    createTask(task: TaskInput): Task
    createCategory(data: CategoryInput!): Category
    deleteTask(id: ID): String
    updateTask(id: ID, task: TaskInput): Task
  }
`;
export default typeDefs;
