import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

type TaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TasksState = {
  tasks: TaskType[];
};

const initialState: TasksState = {
  tasks: [
    { id: v1(), title: 'Walking the dog 🐶', isCompleted: true },
    { id: v1(), title: 'Clean house 🏠', isCompleted: true },
    { id: v1(), title: 'Call parents ☎️', isCompleted: false },
  ],
};

const tasksSlice = createSlice({
  name: 'tasksData',
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: TaskType = {
        id: v1(),
        title: action.payload,
        isCompleted: false,
      };
      state.tasks.unshift(newTask);
    },
    changeTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    changeTaskTitle: (
      state,
      action: PayloadAction<{ taskId: string; taskTitle: string }>
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.title = action.payload.taskTitle;
      }
    },
  },
});

export const { removeTask, addTask, changeTaskStatus, changeTaskTitle } =
  tasksSlice.actions;

export default tasksSlice.reducer;
