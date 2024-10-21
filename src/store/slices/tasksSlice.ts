import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { _ToDoEndpoint, TodoItem } from '../../service/toDoApi';
import { isToken } from '../../utils/localStorageActions';
import { AppRootState } from '../store';

type TasksState = {
  tasks: TodoItem[];
  loading: boolean;
  error: null | string;
};

export const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<
  TodoItem[],
  undefined,
  { rejectValue: string }
>('tasks/fetchTodos', async (_, { rejectWithValue }) => {
  const response = await fetch(_ToDoEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${isToken()}`,
    },
  });
  if (!response.ok) {
    return rejectWithValue('Error loading task list.');
  }
  const tasks: TodoItem[] = await response.json();
  return tasks;
});

export const addTask = createAsyncThunk<
  TodoItem,
  string,
  { rejectValue: string }
>('tasks/addTask', async (title, { rejectWithValue }) => {
  const response = await fetch(_ToDoEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isToken()}`,
    },
    body: JSON.stringify({
      title,
    }),
  });
  if (!response.ok) {
    return rejectWithValue('Error creating task.');
  }
  const task: TodoItem = await response.json();
  return task;
});

export const removeTask = createAsyncThunk<
  TodoItem,
  number,
  { rejectValue: string }
>('tasks/removeTask', async (id, { rejectWithValue }) => {
  const response = await fetch(`${_ToDoEndpoint}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isToken()}`,
    },
  });
  if (!response.ok) {
    return rejectWithValue('Error when deleting a task.');
  }
  const task: TodoItem = await response.json();
  return task;
});

export const changeTaskStatus = createAsyncThunk<
  TodoItem,
  number,
  { rejectValue: string; state: AppRootState }
>('tasks/changeTaskStatus', async (id, { rejectWithValue, getState }) => {
  const taskForUpdate = getState().toDoList.tasks.find(
    (task) => task.id === id
  );
  if (taskForUpdate) {
    const response = await fetch(`${_ToDoEndpoint}/${id}/isCompleted`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${isToken()}`,
      },
    });
    if (!response.ok) {
      return rejectWithValue('Error when changing task status.');
    }
    const task: TodoItem[] = await response.json();

    return task[0];
  }
  return rejectWithValue('Update task not found.');
});

export const updateTaskTitle = createAsyncThunk<
  TodoItem,
  { id: number; taskTitle: string },
  { rejectValue: string; state: AppRootState }
>(
  'tasks/updateTaskTitle',
  async ({ id, taskTitle }, { rejectWithValue, getState }) => {
    const taskForUpdate = getState().toDoList.tasks.find(
      (task) => task.id === id
    );
    if (taskForUpdate) {
      const response = await fetch(`${_ToDoEndpoint}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${isToken()}`,
        },
        body: JSON.stringify({
          title: taskTitle,
        }),
      });
      if (!response.ok) {
        return rejectWithValue('Error when changing task title.');
      }
      const task: TodoItem = await response.json();
      return task;
    }
    return rejectWithValue('Update task not found');
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error with fetching tasks';
      })
      .addCase(addTask.pending, (state) => {
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (task) {
          task.isCompleted = !task.isCompleted;
        }
      })
      .addCase(updateTaskTitle.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (task) {
          task.title = action.payload.title;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      });
  },
});

export default tasksSlice.reducer;
