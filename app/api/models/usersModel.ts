import mongoose, { Model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  surname: string;
}

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
});

const User: Model<IUser> =
  mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
