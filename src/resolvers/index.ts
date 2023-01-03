import { Task } from '../../models';
import { RoadMap } from '../../models/RoadMap';
import GraphQLJSON from 'graphql-type-json';
import { User } from '../../models/User';
import { isTokenValid } from '../auth0';
import { ContextType } from './types';

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
    MapsList: async (_: unknown, {}, context: ContextType) => {
      await isTokenValid(context.token);

      const tasks = await RoadMap.find();
      return { items: tasks, count: tasks.length };
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
      _: unknown,
      {
        map,
      }: {
        map: {
          name: string;
          visible: boolean;
          nodes: unknown[];
          relations: unknown[];
          userId: string;
        };
      },
    ) {
      const { name, visible, nodes, relations, userId } = map;
      const newMap = await RoadMap.create({
        name,
        visible,
        node_custom_fields: {
          nodes,
        },
        relation_custom_fields: {
          relations,
        },
        user: userId,
      });
      await newMap.save();
      const userById = await User.findById(userId);
      if (userById) {
        userById.roadMapsList.push(newMap.id);
        await userById.save();
        const mapResponse = newMap.toJSON();
        const userResponse = userById.toJSON();
        const mapList = await Promise.all(
          userResponse.roadMapsList.map(async (mapId) => {
            const id = mapId.toJSON();
            const map = await RoadMap.findById(id);
            return map;
          }),
        );
        console.log({
          ...mapResponse,
          user: {
            ...userResponse,
            roadMapsList: mapList,
          },
        });
        return {
          ...mapResponse,
          user: {
            ...userResponse,
            roadMapsList: mapList,
          },
        };
      }
    },
    async createUser(
      _: unknown,
      {
        user,
      }: {
        user: {
          name: string;
          email: string;
        };
      },
    ) {
      const { name, email } = user;
      const newUser = await User.create({
        name,
        email,
      });
      await newUser.save();
      return newUser;
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
