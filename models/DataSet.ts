import { model, Schema } from 'mongoose';
const Node = new Schema({ relations: [Schema.Types.Mixed] });
const Relation = new Schema({ nodes: [Schema.Types.Mixed] });
const DataSetSchema = new Schema({
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
});

export const DataSet = model('DataSet', DataSetSchema);
