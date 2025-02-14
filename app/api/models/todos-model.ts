import { ITodo } from "@/types";
import mongoose, { Model, Document } from "mongoose";

// Model needs interface that extends Document to work properly, so I extended the ITodo interface
// But there was an issue that I need to redefine the id field
export interface ITodoDocument extends ITodo, Document {
  id: string;
}

const TodosSchema = new mongoose.Schema({
  id: String,
  status: String,
  title: String,
  description: String,
  date: String,
  type: String,
  assignedTo: {
    type: { type: String, required: true },
    id: { type: String, required: true },
  },
});

const Todo: Model<ITodoDocument> =
  mongoose.models?.Todo || mongoose.model("Todo", TodosSchema);

export default Todo;
