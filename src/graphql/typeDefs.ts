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
    ${Category.mutations}
  }
  type Query {
    hello: String
    getAllTasks: [Task]
    getTask(id: ID): Task
  }
  type Mutation {
    createTask(task: TaskInput): Task
    deleteTask(id: ID): String
    updateTask(id: ID, task: TaskInput): Task
  }
`;
export default typeDefs;
