import { IUser } from "@/types";
import mongoose, { Model, Document } from "mongoose";

// Model needs interface that extends Document to work properly, so I extended the ITodo interface
// But there was an issue that I need to redefine the id field
export interface IUserDodument extends IUser, Document {
  id: string;
}

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<IUserDodument> =
  mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
