import { model, Schema, Types } from 'mongoose';
export interface UserModel {
  _id: Types.ObjectId;
  id: string;
  name: string;
  email: string;
  roadMapsList: Types.ObjectId[];
}
const UserSchema = new Schema<UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
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

export const User = model('User', UserSchema);
