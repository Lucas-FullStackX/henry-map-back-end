import { Task } from '../../../models';
import { RoadMap } from '../../../models/RoadMap';
import GraphQLJSON from 'graphql-type-json';
import { User } from '../../../models/User';
import { isTokenValid } from '../../auth0';
import { ContextType } from './types';
import { Category } from '../../../models/Category';
import { getCategoryInfo } from '../categories/utils';

const resolvers = {
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

    categoriesList: async (_: unknown, {}, context: ContextType) => {
      const getCategories = await Category.find();
      const roadMapsList = await Promise.all(
        getCategories.map(async (categoryId) => {
          const id = categoryId._id.toJSON();
          const map = await getCategoryInfo(id);
          return map;
        }),
      );
      return {
        items: roadMapsList,
        count: getCategories.length,
      };
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

    async createCategory(
      _: unknown,
      {
        data,
      }: {
        data: {
          name: string;
        };
      },
    ) {
      const { name } = data;
      const newCategory = await Category.create({
        name,
      });
      await newCategory.save();
      return newCategory;
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

export default resolvers;
