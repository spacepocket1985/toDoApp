import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddTodoForm } from '../components/toDO/AddTodoForm';
import { TodoList } from '../components/toDO/TodoList';
import { Wrapper } from '../components/wrapper/Wrapper';
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
      const tasks = await fetchData<TodoItem[]>(_ToDoEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setIsLoading(false);
      if (tasks) setTasks(tasks);
    };
    getToDoList();
  }, [authToken, fetchData, navigate]);
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const contentOrSpinner = !isLoading ? (
    <>
      <AddTodoForm addTask={addTask} />
      <TodoList
        tasks={tasks}
        changeTaskStatus={changeTaskStatus}
        updateTaskTitle={updateTaskTitle}
        deleteTask={deleteTask}
      />
    </>
  ) : (
    <Spinner />
  );

  return (
    <Wrapper title={'Get things done!'}>
      {contentOrSpinner}
      {isError && (
        <Snack color="danger" variant="solid">
          {isError}
        </Snack>
      )}
    </Wrapper>
  );
};
