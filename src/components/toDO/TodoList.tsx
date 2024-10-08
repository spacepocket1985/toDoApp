import { Paper } from '@mui/material';
import { TodoTask } from './TodoTask';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodoList: React.FC<{
  tasks: TaskType[];
  changeTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
}> = ({ tasks, changeTaskStatus, deleteTask }) => {
  const rednderTasks = tasks.map((task) => {
    return (
      <TodoTask
        task={task}
        key={task.id}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
      />
    );
  });

  return <Paper>{rednderTasks}</Paper>;
};
