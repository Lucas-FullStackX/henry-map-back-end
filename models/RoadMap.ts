import { model, Schema, Types } from 'mongoose';
export interface RoadMapModel {
  _id: Types.ObjectId;
  id: string;
  name: string;
  visible: boolean;
  node_custom_fields: Schema.Types.Mixed[];
  relation_custom_fields: Schema.Types.Mixed[];
  user: Types.ObjectId;
  category: Types.ObjectId;
}
const Node = new Schema({ nodes: [Schema.Types.Mixed] });
const Relation = new Schema({ relations: [Schema.Types.Mixed] });
const RoadMapSchema = new Schema<RoadMapModel>(
  {
    name: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    node_custom_fields: {
      type: [Node],
      default: [],
    },
    relation_custom_fields: {
      type: [Relation],
      default: [],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  },
);

export const RoadMap = model('RoadMap', RoadMapSchema);
