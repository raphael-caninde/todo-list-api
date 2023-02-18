import { TodoList } from '../../components/TodoList';
import { Header } from '../../components/Header';

export function HomePage() {
  return (
    <div className='h-screen w-screen'>
      <Header />
      <TodoList />
    </div>
  )
}
