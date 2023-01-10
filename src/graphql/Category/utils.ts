import { Category } from '../../../models/Category';
import { getRoadMapInfo } from '../RoadMap/utils';
import { CategoryResponse, RoadMapResponse } from '../types';

export const getCategoryInfo = async (
  categoryId: string,
): Promise<CategoryResponse | Error> => {
  const getCategory = await Category.findById(categoryId);
  if (getCategory) {
    const roadMapsList = await Promise.all(
      getCategory.roadMapsList.map(async (mapId) => {
        return await getRoadMapInfo(mapId.toJSON());
      }),
    );
    return {
      id: categoryId,
      name: getCategory.name,
      roadMapsList: roadMapsList as RoadMapResponse[],
    };
  }
  throw new Error('category not found');
};
