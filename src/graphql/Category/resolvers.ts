import { Category } from '../../../models/Category';
import { RoadMap } from '../../../models/RoadMap';
import { User } from '../../../models/User';
import { ContextType } from '../types';
import { getCategoryInfo } from './utils';

const queries = {
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
};

const mutations = {
  createMap: async (
    _: unknown,
    {
      data,
    }: {
      data: {
        name: string;
      };
    },
  ) => {
    const { name } = data;
    const newCategory = await Category.create({
      name,
    });
    await newCategory.save();
    return newCategory;
  },
};

export const resolvers = { queries, mutations };
