import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { _ToDoEndpoint, TodoItem } from '../../service/toDoApi';
import { isToken } from '../../utils/localStorageActions';

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
    return rejectWithValue('Server Error');
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
    return rejectWithValue('Cant add new task');
  }
  const task: TodoItem = await response.json();
  return task;
});

export const changeTaskStatus = createAsyncThunk<
  TodoItem,
  number,
  { rejectValue: string; state: { todo: TasksState } }
>('tasks/changeTaskStatus', async (id, { rejectWithValue, getState }) => {
  const taskForUpdate = getState().todo.tasks.find((task) => task.id === id);
  if (taskForUpdate) {
    const response = await fetch(`${_ToDoEndpoint}/${id}/isCompleted`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${isToken()}`,
      },
    });
    if (!response.ok) {
      return rejectWithValue('Cant change task status');
    }
    const task: TodoItem = await response.json();
    return task;
  }
  return rejectWithValue('No such task');
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // removeTask: (state, action: PayloadAction<string>) => {
    //   state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    // },
    // addTask: (state, action: PayloadAction<string>) => {
    //   const newTask: TaskType = {
    //     id: v1(),
    //     title: action.payload,
    //     isCompleted: false,
    //   };
    //   state.tasks.unshift(newTask);
    // },
    // changeTaskStatus: (state, action: PayloadAction<string>) => {
    //   const task = state.tasks.find((task) => task.id === action.payload);
    //   if (task) {
    //     task.isCompleted = !task.isCompleted;
    //   }
    // },
    // changeTaskTitle: (
    //   state,
    //   action: PayloadAction<{ taskId: string; taskTitle: string }>
    // ) => {
    //   const task = state.tasks.find(
    //     (task) => task.id === action.payload.taskId
    //   );
    //   if (task) {
    //     task.title = action.payload.taskTitle;
    //   }
    // },
  },
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
      });
  },
});

// export const { removeTask, addTask, changeTaskStatus, changeTaskTitle } =
//   tasksSlice.actions;

export default tasksSlice.reducer;
