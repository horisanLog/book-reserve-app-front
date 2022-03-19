import { api } from "../config/axiosConfig";
import { Response } from "../domain/todo";

export const helloRequest = async (): Promise<Response> => {
  return await api.get("/hello");
};
