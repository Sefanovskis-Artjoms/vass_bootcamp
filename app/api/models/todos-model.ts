import { ITodo } from "@/types";
import mongoose, { Model, Document } from "mongoose";

// Model needs interface that extends Document to work properly, so I extended the ITodo interface
// But there was an issue that I need to redefine the id field
export interface ITodoDodument extends ITodo, Document {
  id: string;
}

const TodosSchema = new mongoose.Schema({
  id: String,
  status: String,
  title: String,
  description: String,
  date: String,
  type: String,
});

const Todo: Model<ITodoDodument> =
  mongoose.models?.Todo || mongoose.model("Todo", TodosSchema);

export default Todo;
