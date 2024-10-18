import { AddTodoForm } from '../components/toDO/AddTodoForm';
import { TodoList } from '../components/toDO/TodoList';
import { Wrapper } from '../components/wrapper/Wrapper';

const Main: React.FC = () => {
  return (
    <Wrapper title={'Get things done!'}>
      <AddTodoForm />
      <TodoList />
    </Wrapper>
  );
};

export default Main;
