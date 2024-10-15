import { v1 } from 'uuid';
import { TaskType } from '../components/toDO/TodoTask';

type ActionRemoveTaskType = {
  type: 'REMOVE-TASK';
  taskId: string;
};

type ActionAddTaskType = {
  type: 'ADD-TASK';
  taskTitle: string;
};

type ActionChangeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS';
  taskId: string;
};

type ActionChangeTaskTitleType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  taskTitle: string;
};

export type ActionsType =
  | ActionRemoveTaskType
  | ActionAddTaskType
  | ActionChangeTaskStatusType
  | ActionChangeTaskTitleType;

export const removeTaskAC = (taskId: string): ActionRemoveTaskType => {
  return { type: 'REMOVE-TASK', taskId };
};

export const addTaskAC = (taskTitle: string): ActionAddTaskType => {
  return { type: 'ADD-TASK', taskTitle };
};

export const changeTaskStatusAC = (
  taskId: string
): ActionChangeTaskStatusType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskId,
  };
};

export const changeTaskTitleAC = (
  taskId: string,
  taskTitle: string
): ActionChangeTaskTitleType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    taskId,
    taskTitle,
  };
};

const initialState: Array<TaskType> = [
  { id: v1(), title: 'Walking the dog 🐶', isCompleted: true },
  { id: v1(), title: 'Clean house 🏠', isCompleted: true },
  { id: v1(), title: 'Call parents ☎️', isCompleted: false },
];

export const tasksReducer = (
  state: Array<TaskType> = initialState,
  action: ActionsType
): Array<TaskType> => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return state.filter((task) => task.id !== action.taskId);

    case 'ADD-TASK': {
      const newTask: TaskType = {
        id: v1(),
        title: action.taskTitle,
        isCompleted: false,
      };
      return [newTask, ...state];
    }
    case 'CHANGE-TASK-STATUS':
      return state.map((task) =>
        task.id === action.taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );

    case 'CHANGE-TASK-TITLE':
      return state.map((task) =>
        task.id === action.taskId ? { ...task, title: action.taskTitle } : task
      );

    default:
      return state;
  }
};
