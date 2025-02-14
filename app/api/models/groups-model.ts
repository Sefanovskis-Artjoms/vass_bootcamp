import mongoose, { Model, Document } from "mongoose";
import { IGroup } from "@/types";

export interface IGroupDocument extends IGroup, Document {
  id: string;
}

const GroupsSchema = new mongoose.Schema({
  id: String,
  name: String,
  users: [String],
});

const Group: Model<IGroupDocument> =
  mongoose.models?.Group || mongoose.model("Group", GroupsSchema);

export default Group;
