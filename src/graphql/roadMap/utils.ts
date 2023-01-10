import { Category, CategoryModel } from '../../../models/Category';
import { RoadMap, RoadMapModel } from '../../../models/RoadMap';
import { User } from '../../../models/User';
import { RoadMapResponse } from '../types';

export const getRoadMapInfo = async (
  roadMapId: string,
): Promise<RoadMapResponse | Error> => {
  const getRoadMap = await RoadMap.findById(roadMapId);
  if (getRoadMap) {
    console.log(getRoadMap);
    const data: RoadMapResponse = {
      id: getRoadMap._id.toJSON(),
      name: getRoadMap.name,
      visible: getRoadMap.visible,
      node_custom_fields: getRoadMap.node_custom_fields,
      relation_custom_fields: getRoadMap.relation_custom_fields,
      category: null,
      user: null,
    };
    const userById = await User.findById(getRoadMap.user.toJSON());
    if (userById) {
      const userResponse = userById.toJSON();
      data.user = {
        id: userResponse._id.toJSON(),
        name: userResponse.name,
        email: userResponse.email,
      };
      if (getRoadMap.toJSON().category) {
        const category = getRoadMap.category.toJSON();
        const getCategory = await Category.findById(category);
        if (getCategory) {
          data.category = {
            id: getCategory._id.toJSON(),
            name: getCategory.name,
          };
        }
      }
      return data;
    }
  }
  throw new Error('Road Map not found');
};
