import mongoose, { Model, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  name: string;
  surname: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  id: String,
  username: String,
  name: String,
  surname: String,
  password: String,
});

const User: Model<IUser> =
  mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
