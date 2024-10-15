import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { addTaskAC } from '../../store/tasksReducer';
import { useAppDispatch } from '../../hooks/storeHooks';

export const AddTodoForm: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onChangeNewTaskTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newTaskTitle = event.target.value;
    setNewTaskTitle(newTaskTitle);
    setError(null);
  };

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (error !== null) setError(null);
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewTask();
    }
  };

  const dispatch = useAppDispatch();

  const addNewTask = (): void => {
    if (newTaskTitle.trim().length === 0) {
      setError('Title is required');
      return;
    }
    dispatch(addTaskAC(newTaskTitle));
    setError(null);
    setNewTaskTitle('');
  };

  return (
    <Grid container sx={{ textAlign: 'center', mb: 2 }} spacing={1}>
      <TextField
        value={newTaskTitle}
        label="Todo text"
        variant="outlined"
        size="small"
        error={!!error}
        helperText={error}
        onChange={onChangeNewTaskTitleHandler}
        onKeyDown={onKeyPressHandler}
      />
      <Button
        variant="contained"
        onClick={addNewTask}
        disabled={!newTaskTitle.length}
      >
        Add task
      </Button>
    </Grid>
  );
};
