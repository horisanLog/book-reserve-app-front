import { memo, VFC } from "react";
import { useTodo } from "../../hooks/todo"
import { Todo } from "../../domain/todo"

export const TopPage: VFC = memo(() => {
  const todo = useTodo()
  
  return (
    <>
      <h1>TOP</h1>
      <input name="text" type="text" value={todo.todo.text} onChange={(e) => todo.changeTodo(todo.todo, e)} ></input>
      {todo.todo.text}
      <br />
    </>
  );
});
