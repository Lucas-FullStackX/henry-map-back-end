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
      ...getRoadMap,
      id: getRoadMap._id.toJSON(),
      category: null,
      user: null,
    };
    console.log(getRoadMap.user);
    const userById = await User.findById(getRoadMap.user.toJSON());
    if (userById) {
      const userResponse = userById.toJSON();
      data.user = userResponse;
      console.log('Category:', getRoadMap.toJSON());
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
