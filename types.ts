export interface IUserSearchState {
  [namespace: string]: {
    searchQuery: string;
    searchFields: string[];
    filterRoles: string[];
  };
}
export interface ITodoSearchState {
  searchQuery: string;
  sortOrder: "newest" | "oldest";
  filterTypes: string[];
  filterStatuses: string[];
}

export interface IGroupSearchState {
  searchQuery: string;
}

export interface IGroup {
  id: string;
  name: string;
  users: string[];
}

export interface ITodo {
  id: string;
  status: string;
  title: string;
  description: string;
  date: string;
  type: string;
  assignedTo: {
    type: string;
    id: string;
  };
}

export interface TodoFormInputs {
  title: string;
  status: string;
  description: string;
  type: string;
  assignedTo: {
    type: string;
    id: string;
  };
}

export interface IUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  password?: string;
  role: string;
}

export type IResponse<T = unknown> =
  | {
      success: true;
      data: T;
      error?: never;
    }
  | {
      success: false;
      data?: never;
      error: {
        type: string;
        field?: string;
        message: string;
      };
    };
