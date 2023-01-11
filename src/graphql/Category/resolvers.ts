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
  getCategory: async (
    _: unknown,
    {
      id,
      name,
    }: {
      id: string;
      name: string;
    },
    context: ContextType,
  ) => {
    if (name) {
      const findCategoryByName = await Category.find({ name });
      if (findCategoryByName.length > 0) {
        const getCategory = await getCategoryInfo(
          findCategoryByName[0]._id.toJSON(),
        );
        if (getCategory) {
          return getCategory;
        }
      }
    }
    const getCategory = await getCategoryInfo(id);
    if (getCategory) {
      return getCategory;
    }
  },
};

const mutations = {
  createCategory: async (
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
