import { useEffect } from 'react';
import { AddTodoForm } from '../components/toDO/AddTodoForm';
import { TodoList } from '../components/toDO/TodoList';
import { Wrapper } from '../components/wrapper/Wrapper';
import { useAppDispatch } from '../hooks/storeHooks';
import { fetchTodos } from '../store/slices/tasksSlice';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <Wrapper title={'Get things done!'}>
      <AddTodoForm />
      <TodoList />
    </Wrapper>
  );
};

export default Main;
