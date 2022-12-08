import { Task } from '../../models';

export const resolvers = {
  Query: {
    hello: () => 'Hello world',
    getAllTasks: async () => {
      const tasks = await Task.find();
      return tasks;
    },
    async getTask(_: unknown, { id }: { id: string }) {
      return await Task.findById(id);
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
