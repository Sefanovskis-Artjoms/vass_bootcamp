import mongoose, { Model, Document } from "mongoose";

export interface ITodo extends Document {
  id: string;
  status: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

const TodosSchema = new mongoose.Schema({
  id: String,
  status: String,
  title: String,
  description: String,
  date: String,
  type: String,
});

const Todo: Model<ITodo> =
  mongoose.models?.Todo || mongoose.model("Todo", TodosSchema);

export default Todo;
