const _BaseEndpoint = 'https://todo-redev.herokuapp.com/api';

export const _LoginEndpoint = `${_BaseEndpoint}/auth/login`;
export const _RegEndpoint = `${_BaseEndpoint}/users/register`;
export const _ToDoEndpoint = `${_BaseEndpoint}/todos`;

export type TodoItem = {
  id: number;
  title: string;
  isCompleted: boolean;
  user_id: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  gender: string;
  age: number;
};
