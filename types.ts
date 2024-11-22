export interface ITodo {
  id: string;
  status: string;
  title: string;
  description: string;
  date: string;
  type: string;
  assignedTo: string;
}

export interface TodoFormInputs {
  title: string;
  status: string;
  description: string;
  type: string;
  assignedTo: string;
}

export interface IUser extends Document {
  id: string;
  username: string;
  name: string;
  surname: string;
  password: string;
}
