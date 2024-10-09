import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { v1 } from 'uuid';
import Grid from '@mui/material/Grid2';

import { AddTodoForm } from '../components/toDO/AddTodoForm';
import { TaskType, TodoList } from '../components/toDO/TodoList';
import useHttp from '../hooks/useHttp';

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

  const { fetchData, isLoading, isError } = useHttp();

  const _ApiBase = 'https://todo-redev.herokuapp.com/api';
  const _UserInfo = {
    email: 'space1985pocket@gmail.com',
    password: '1Sq_22qw-2024',
  };

  useEffect(() => {
    fetchData(`${_ApiBase}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: _UserInfo.email,
        password: _UserInfo.password,
      }),
    })
      .then((data) => console.log(data))
      .catch((er) => console.log(er));
  }, [_UserInfo.email, _UserInfo.password, fetchData]);

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
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {isError}</p>}
      </Grid>
    </Grid>
  );
};
