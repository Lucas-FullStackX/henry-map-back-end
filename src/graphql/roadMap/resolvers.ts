import { Category } from '../../../models/Category';
import { RoadMap } from '../../../models/RoadMap';
import { User } from '../../../models/User';
import { ContextType } from '../types';
import { getRoadMapInfo } from './utils';

const queries = {
  mapsList: async (_: unknown, {}, context: ContextType) => {
    const roadMaps = await RoadMap.find();
    const roadMapsList = await Promise.all(
      roadMaps.map(async (categoryId) => {
        const id = categoryId._id.toJSON();
        const map = await getRoadMapInfo(id);
        return map;
      }),
    );
    return {
      items: roadMapsList,
      count: roadMapsList.length,
    };
  },
};

const mutations = {
  createMap: async (
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
        categoryId: string;
      };
    },
  ) => {
    const { name, visible, nodes, relations, userId, categoryId } = map;
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
      category: categoryId,
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
      const categoryById = await Category.findById(categoryId);
      if (categoryById) {
        categoryById.roadMapsList.push(newMap.id);
        await categoryById.save();
      }
      return {
        ...mapResponse,
        category: categoryById,
        user: {
          ...userResponse,
          roadMapsList: mapList,
        },
      };
    }
  },
};

export const resolvers = { queries, mutations };
