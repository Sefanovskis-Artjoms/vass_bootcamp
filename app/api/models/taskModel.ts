import mongoose, { Model, Document } from "mongoose";

const TodosSchema = new mongoose.Schema({
  id: String,
  status: String,
  title: String,
  description: String,
  date: String,
  type: String,
});

const Todos: Model<Document> =
  mongoose.models?.Todos || mongoose.model("todo", TodosSchema, "todos");

export default Todos;
