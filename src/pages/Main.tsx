import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddTodoForm } from '../components/toDO/AddTodoForm';
import { TodoList } from '../components/toDO/TodoList';

import { Wrapper } from '../components/wrapper/Wrapper';
import { RoutePaths } from '../routes/routePaths';
import { Spinner } from '../components/spinner/Spinner';
import { useAuth } from '../context/AuthContext';
import useHttp from '../hooks/useHttp';
import { _ToDoEndpoint, TodoItem } from '../service/toDoApi';
import { Snack } from '../components/snack/Snack';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const { fetchData, isError } = useHttp();

  useEffect(() => {
    const getToDoList = async () => {
      if (authToken === null) navigate(RoutePaths.SignInPage);
      else {
        const tasks = await fetchData<TodoItem[]>(_ToDoEndpoint, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (tasks) setTasks(tasks);

        setIsloading(false);
      }
    };
    getToDoList();
  }, [authToken, fetchData, navigate]);
  const [tasks, setTasks] = useState<TodoItem[]>([]);

  const [isLoading, setIsloading] = useState(true);

  const changeTaskStatus = async (id: number) => {
    const updatedTask = await fetchData<TodoItem>(
      `${_ToDoEndpoint}/${id}/isCompleted`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (updatedTask)
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
  };

  const updateTaskTitle = async (id: number, newTitle: string) => {
    const updatedTask = await fetchData<TodoItem>(`${_ToDoEndpoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },

      body: JSON.stringify({
        title: newTitle,
      }),
    });
    if (updatedTask)
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
  };

  const deleteTask = async (id: number) => {
    const updatedTask = await fetchData<TodoItem>(`${_ToDoEndpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (updatedTask)
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addTask = async (title: string) => {
    const newTask = await fetchData<TodoItem>(_ToDoEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
      }),
    });
    if (newTask) setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const spinner = isLoading ? <Spinner /> : null;
  const content = !isLoading ? (
    <>
      <AddTodoForm addTask={addTask} />
      <TodoList
        tasks={tasks}
        changeTaskStatus={changeTaskStatus}
        updateTaskTitle={updateTaskTitle}
        deleteTask={deleteTask}
      />
    </>
  ) : null;

  return (
    <Wrapper title={'Get things done!'}>
      {spinner}
      {content}
      {isError && (
        <Snack color="danger" variant="solid">
          {isError}
        </Snack>
      )}
    </Wrapper>
  );
};
