import { model, Schema } from 'mongoose';
const Node = new Schema({ relations: [Schema.Types.Mixed] });
const Relation = new Schema({ nodes: [Schema.Types.Mixed] });
const RoadMapSchema = new Schema(
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
