import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

export interface ApiErrorData {
  message?: string
  [key: string]: any
}

export interface ApiError extends Error {
  status?: number
  data?: ApiErrorData
}

const baseURL: string = (import.meta.env.VITE_API_BASE as string) ?? '/api'

export const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10_000,
})

// レスポンス共通エラーハンドリング
http.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => res,
  (error: AxiosError<ApiErrorData>): Promise<never> => {
    const msg = error.response?.data?.message ?? error.message
    const apiError: ApiError = Object.assign(new Error(msg), {
      status: error.response?.status,
      data: error.response?.data,
    })
    return Promise.reject(apiError)
  }
)

// リクエスト側で「jsonファイルを取るだけ」の場合は public を参照する
http.interceptors.request.use((config) => {
  if (config.url?.startsWith('/api/data/')) {
    // baseURL を無効にして public のファイルを直接取る
    config.baseURL = ''
  }
  return config
})