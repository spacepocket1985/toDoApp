import { Paper } from '@mui/material';
import { TodoTask } from './TodoTask';
import { TodoItem } from '../../service/toDoApi';

export const TodoList: React.FC<{
  tasks: TodoItem[];
  changeTaskStatus: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTaskTitle: (id: number, newTitle: string) => void;
}> = ({ tasks, changeTaskStatus, deleteTask, updateTaskTitle }) => {
  const rednderTasks = tasks.map((task) => {
    return (
      <TodoTask
        task={task}
        key={task.id}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
        updateTaskTitle={updateTaskTitle}
      />
    );
  });

  return <Paper>{rednderTasks}</Paper>;
};
