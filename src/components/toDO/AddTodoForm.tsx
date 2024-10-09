import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';

export const AddTodoForm: React.FC<{
  addTask: (title: string) => void;
}> = ({ addTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onChangeNewTaskTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newTaskTitle = event.target.value.trim();
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

  const addNewTask = (): void => {
    if (newTaskTitle.length === 0) {
      setError('Title is required');
      return;
    }
    addTask(newTaskTitle);
    setError(null);
    setNewTaskTitle('');
  };

  return (
    <Grid container sx={{ textAlign: 'center', mb: 2 }} spacing={1}>
      <TextField
        value={newTaskTitle}
        label="Todo text"
        variant="outlined"
        color="secondary"
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
