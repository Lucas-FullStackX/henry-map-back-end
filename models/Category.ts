import { model, Schema, Types } from 'mongoose';
export interface CategoryModel {
  _id: Types.ObjectId;
  id: string;
  name: string;
  roadMapsList: Types.ObjectId[];
}
const CategorySchema = new Schema<CategoryModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    roadMapsList: [{ type: Schema.Types.ObjectId, ref: 'RoadMap' }],
  },
  {
    timestamps: true,
  },
);

export const Category = model('Category', CategorySchema);
