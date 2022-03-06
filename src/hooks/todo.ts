import React, { useCallback, useState } from "react";
import { Todo } from "../domain/todo";

const data: Todo = {
  text: "",
  count: 0,
};

export const useTodo = () => {
  const [todo, setTodo] = useState<Todo>(data);
  console.log("test")

  const changeTodo = (todo: Todo, e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "text":
        return setTodo({ ...todo, text: e.target.value });
    }

    // return { ...todo, todo };
  };

  return { todo, changeTodo };
};
