import { Paper } from '@mui/material';
import { TodoTask } from './TodoTask';
import { useAppSelector } from '../../hooks/storeHooks';

export const TodoList: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks);

  const rednderTasks = tasks.map((task) => {
    return <TodoTask task={task} key={task.id} />;
  });

  return <Paper>{rednderTasks}</Paper>;
};
