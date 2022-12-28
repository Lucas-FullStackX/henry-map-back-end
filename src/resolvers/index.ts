import { Task } from '../../models';
import { DataSet } from '../../models/DataSet';
import GraphQLJSON from 'graphql-type-json';

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    hello: () => 'Hello world',
    getAllTasks: async () => {
      const tasks = await Task.find();
      return tasks;
    },
    async getTask(_: unknown, { id }: { id: string }) {
      return await Task.findById(id);
    },
    MapsList: async () => {
      const tasks = await DataSet.find();
      return tasks;
    },
  },
  Mutation: {
    async createTask(
      parent: unknown,
      {
        task,
      }: {
        task: {
          title: string;
          description: string;
        };
      },
    ) {
      const { title, description } = task;
      const newTask = new Task({ title, description });
      await newTask.save();
      return newTask;
    },
    async createMap(
      parent: unknown,
      {
        map,
      }: {
        map: {
          name: string;
          visible: boolean;
          nodes: unknown[];
          relations: unknown[];
        };
      },
    ) {
      const { name, visible, nodes, relations } = map;
      const newMap = new DataSet({
        name,
        visible,
        node_custom_fields: {
          nodes,
        },
        relation_custom_fields: {
          relations,
        },
      });
      await newMap.save();
      return newMap;
    },
    async deleteTask(_: unknown, { id }: { id: string }) {
      await Task.findByIdAndDelete(id);
      return 'Task Deleted';
    },
    async updateTask(
      _: unknown,
      {
        id,
        task,
      }: {
        id: string;
        task: {
          title: string;
          description: string;
        };
      },
    ) {
      const { title, description } = task;
      const newTask = await Task.findByIdAndUpdate(
        id,
        {
          $set: {
            title,
            description,
          },
        },
        {
          new: true,
        },
      );
      return newTask;
    },
  },
};
