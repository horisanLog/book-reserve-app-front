// axiosに関する設定
import { Config } from "./"
import axios, { AxiosResponse } from "axios"

export const api = axios.create({
  baseURL: Config.api.endpoint,
  responseType: "json",
})
