import { useState } from 'react';
import { Typography } from '@mui/material';
import { v1 } from 'uuid';
import Grid from '@mui/material/Grid2';

import { AddTodoForm } from '../components/toDO/AddTodoForm';
import { TaskType, TodoList } from '../components/toDO/TodoList';

export const Main: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'Walking the dog 🐶', isDone: true },
    { id: v1(), title: 'Clean house 🏠', isDone: true },
    { id: v1(), title: 'Call parents ☎️', isDone: false },
  ]);

  const changeTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addTask = (title: string) => {
    setTasks((prevTasks) => [...prevTasks, { id: v1(), title, isDone: false }]);
  };

  return (
    <Grid
      container
      direction={'column'}
      spacing={2}
      size={3}
      sx={{
        m: 'auto',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 2,
        padding: 1,
      }}
    >
      <Grid>
        <Typography variant="h4" component="h4" sx={{ padding: 1 }}>
          Get things done!
        </Typography>
        <AddTodoForm addTask={addTask} />
        <TodoList
          tasks={tasks}
          changeTaskStatus={changeTaskStatus}
          deleteTask={deleteTask}
        />
      </Grid>
    </Grid>
  );
};
