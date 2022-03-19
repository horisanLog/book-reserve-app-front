export type Todo = {
  text: string,
  count: number
};

export type Response = {
  status: number
  data: {
    text: string,
    count: number
  }
}
