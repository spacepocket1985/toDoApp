import Grid from '@mui/material/Grid2';
import { IconButton, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useState } from 'react';
import { TaskType } from './TodoList';

export const TodoTask: React.FC<{
  task: TaskType;
  changeTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
}> = ({ task, changeTaskStatus, deleteTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const activateEditeMode = () => {
    setEditMode(true);
    setNewTitle(task.title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value.trim());
  };

  return (
    <Grid
      container
      sx={{ alignItems: 'center', justifyContent: 'space-between' }}
    >
      {editMode ? (
        <>
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            value={newTitle}
            onChange={onChangeTitleHandler}
          />
          <Button
            variant="contained"
            onClick={() => {
              setEditMode(false);
            }}
            disabled={!newTitle.length}
          >
            Update
          </Button>
        </>
      ) : (
        <>
          <Typography
            component="div"
            variant="h6"
            sx={{
              paddingLeft: '5px',
              textDecoration: task.isDone ? 'line-through' : '',
              cursor: 'pointer',
            }}
            onClick={() => {
              changeTaskStatus(task.id);
            }}
          >
            {newTitle}
          </Typography>
          <Grid>
            <IconButton color={'primary'} onClick={activateEditeMode}>
              <EditIcon />
            </IconButton>
            <IconButton color={'primary'} onClick={() => deleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};
