import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { v1 } from 'uuid';

import { AddTodoForm } from '../components/toDO/AddTodoForm';
import { TaskType, TodoList } from '../components/toDO/TodoList';

import { Wrapper } from '../components/wrapper/Wrapper';
import { RoutePaths } from '../routes/routePaths';
import { Spinner } from '../components/spinner/Spinner';
import { useAuth } from '../context/AuthContext';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();

  useEffect(() => {
    if (authToken === null) navigate(RoutePaths.SignInPage);
    else setIsloading(false);
  }, [authToken, navigate]);
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'Walking the dog 🐶', isDone: true },
    { id: v1(), title: 'Clean house 🏠', isDone: true },
    { id: v1(), title: 'Call parents ☎️', isDone: false },
  ]);

  const [isLoading, setIsloading] = useState(true);

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

  const spinner = isLoading ? <Spinner /> : null;
  const content = !isLoading ? (
    <>
      <AddTodoForm addTask={addTask} />
      <TodoList
        tasks={tasks}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
      />
    </>
  ) : null;

  return (
    <Wrapper title={'Get things done!'}>
      {spinner}
      {content}
    </Wrapper>
  );
};
