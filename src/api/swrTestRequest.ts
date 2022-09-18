import useSWR from "swr"
import { api } from "../config/axiosConfig"

const fetcher = (url: string) => api.get(url).then((res) => res.data)

export const useSwrTestRequest = () => {
  const { data, error } = useSWR("/api/hello", fetcher)

  return { data, error }
};
