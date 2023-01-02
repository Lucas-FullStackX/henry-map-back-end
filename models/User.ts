import { model, Schema } from 'mongoose';
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roadMapsList: [{ type: Schema.Types.ObjectId, ref: 'RoadMap' }],
  },
  {
    timestamps: true,
  },
);

export const User = model('User', UserSchema);
