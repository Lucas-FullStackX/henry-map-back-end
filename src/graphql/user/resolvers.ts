import { User } from '../../../models/User';

const queries = {
  user: (_: unknown, args: unknown) => {
    return {
      id: '12345',
      email: 'some.user@email.com',
      password: 'Pa$$w0rd!',
      loggedIn: false,
      firstName: 'Some',
      lastName: 'User',
    };
  },
};

const mutations = {
  createUser: async (
    _: unknown,
    {
      user,
    }: {
      user: {
        name: string;
        email: string;
      };
    },
  ) => {
    const { name, email } = user;
    const newUser = await User.create({
      name,
      email,
    });
    await newUser.save();
    return newUser;
  },
};

export const resolvers = { queries, mutations };
