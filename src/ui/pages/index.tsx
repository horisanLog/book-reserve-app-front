import { memo, VFC } from "react";
import { useTodo } from "../../hooks/todo"
import { Todo } from "../../domain/todo"
import { TodoForm } from "../components/Lv3/TodoForm"

export const TopPage: React.FC = memo(() => {
  const { loading, todo, changeTodo } = useTodo()

  if (loading) {
    return <div>{"ローディング中"}</div>
  }
  
  return (
    <>
      <h1>TOP</h1>
      <TodoForm todo={todo} changeTodo={changeTodo} />
      <br />
    </>
  );
});
