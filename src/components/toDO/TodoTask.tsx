import Grid from '@mui/material/Grid2';
import { IconButton, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/storeHooks';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../store/tasksReducer';

export type TaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export const TodoTask: React.FC<{
  task: TaskType;
}> = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const activateEditeMode = () => {
    setEditMode(true);
    setNewTitle(task.title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value.trim());
  };

  const dispatch = useAppDispatch();

  const updateTaskTitle = (taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(taskId, newTitle));
  };

  const changeTaskStatus = (taskId: string) => {
    dispatch(changeTaskStatusAC(taskId));
  };

  const deleteTask = (taskId: string) => {
    dispatch(removeTaskAC(taskId));
  };

  return (
    <Grid
      container
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 'dotted 2px #2196f3',
      }}
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
              updateTaskTitle(task.id, newTitle);
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
              textDecoration: task.isCompleted ? 'line-through' : '',
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
