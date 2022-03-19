import { useCallback, useEffect, useState } from 'react'
import { Todo } from "../domain/todo";
import { helloRequest } from "../api/helloRequest"

const data: Todo = {
  text: "",
  count: 0,
};


export const useTodo = () => {
  const [todo, setTodo] = useState<Todo>(data);
  const [loading, setLoading] = useState(true);

  const changeTodo = (todo: Todo, e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "title":
        return setTodo({ ...todo, text: e.target.value });
    }
  };

  const fetchTodo = useCallback(async () => {
    try {
      const response = await helloRequest()
      if (response.status === 200) {
        setTodo(response.data)
      }
      // eslint-disable-next-line
    } catch (error: any) {
      console.log("error")
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTodo()
  }, [fetchTodo])

  return { loading, todo, changeTodo };
};
