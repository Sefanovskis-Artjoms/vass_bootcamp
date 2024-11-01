import mongoose, { Model, Document } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  _id: mongoose.Schema.Types.ObjectId,
});

const User: Model<Document> =
  mongoose.models?.users || mongoose.model("user", UserSchema, "users");

export default User;
