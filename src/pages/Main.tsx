import { useState } from 'react';

import { v1 } from 'uuid';

import { AddTodoForm } from '../components/toDO/AddTodoForm';
import { TaskType, TodoList } from '../components/toDO/TodoList';

import { Wrapper } from '../components/wrapper/Wrapper';

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
    <Wrapper title={'Get things done!'}>
      <AddTodoForm addTask={addTask} />
      <TodoList
        tasks={tasks}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
      />
    </Wrapper>
  );
};
