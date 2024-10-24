import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeToken, setToken } from '../../utils/localStorageActions';
import { _LoginEndpoint, _RegEndpoint, User } from '../../service/toDoApi';

type AuthState = {
  loading: boolean;
  error: null | string;
};

const initialState: AuthState = {
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  const response = await fetch(_LoginEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message || response.statusText;
    return rejectWithValue(`Error. Login failed. ${errorMessage}`);
  }

  const data = await response.json();

  setToken(data.token);

  return data.token as string;
});

export const registerUser = createAsyncThunk<
  string,
  User,
  { rejectValue: string }
>('auth/register', async (user, { rejectWithValue }) => {
  const response = await fetch(_RegEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();

    if (errorData.errors && Array.isArray(errorData.errors)) {
      const errorMessages = errorData.errors
        .map((err: { msg: unknown }) => err.msg)
        .join(', ');

      return rejectWithValue(
        `Error. Registration failed. ${errorMessages}. Code status - ${response.status}`
      );
    } else {
      const errorMessage = errorData.message || response.statusText;

      return rejectWithValue(
        `Error. Registration failed. ${errorMessage}. Code status - ${response.status}`
      );
    }
  }
  const data = await response.json();
  removeToken();
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
