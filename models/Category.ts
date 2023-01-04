import { model, Schema } from 'mongoose';
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roadMapsList: [{ type: Schema.Types.ObjectId, ref: 'RoadMap' }],
  },
  {
    timestamps: true,
  },
);

export const Category = model('Category', CategorySchema);
