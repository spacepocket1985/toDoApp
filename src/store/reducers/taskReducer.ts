import { createAction, createReducer } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import { initialState } from '../slices/tasksSlice';
import { TaskType } from '../../components/toDO/TodoTask';

export const removeTask = createAction<string>('tasks/removeTask');
export const addTask = createAction<string>('tasks/addTask');
export const changeTaskStatus = createAction<string>('tasks/changeTaskStatus');
export const changeTaskTitle = createAction<{
  taskId: string;
  taskTitle: string;
}>('tasks/changeTaskTitle');

const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(removeTask, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    })
    .addCase(addTask, (state, action) => {
      const newTask: TaskType = {
        id: v1(),
        title: action.payload,
        isCompleted: false,
      };
      state.tasks.unshift(newTask);
    })
    .addCase(changeTaskStatus, (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    })
    .addCase(changeTaskTitle, (state, action) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.title = action.payload.taskTitle;
      }
    });
});

export default tasksReducer;
