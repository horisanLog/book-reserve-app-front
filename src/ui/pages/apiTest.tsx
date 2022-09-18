import { memo, useState, useEffect, useLayoutEffect } from "react";
import { useSwrTestRequest } from "../../api/swrTestRequest";
import { Todo } from "../../domain/todo";
import useSWR from "swr";
import { api } from "../../config/axiosConfig";

// const data: Todo = {
//   text: "",
//   count: 0,
// };

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const ApiTestPage: React.FC = memo(() => {
  // const [swrTest, setSwrTest] = useState<Todo>(data);

  // const fetchSwrTest = async () => {
  //   const { data, error } = await useSwrTestRequest();

  //   if (error) {
  //     return console.log(error);
  //   }

  //   setSwrTest(data.data);
  // };

  // useEffect(() => {
  //   fetchSwrTest();
  // }, []);
  // const { data, error } = useSWR("/todos", fetcher)

  // console.log("a")

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  // // データをレンダリングする
  // return <div>hello {data.text}!</div>
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    console.log("=== click ===");
    // fetchSomething().then(() => {
      setCount((c) => c + 1);
      setCount((c) => c + 1);
      setFlag((f) => !f);
    // });
  };

  const LogEvents = () => {
    useLayoutEffect(() => {
      console.log("Commit");
    });
    console.log("Render");
    return null;
  };

  const fetchSomething = () => {
    return new Promise((resolve) => setTimeout(resolve, 100));
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>Next</button>
        <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
        <LogEvents />
      </div>
    </>
  );
});
