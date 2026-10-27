import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

type ApiError = {
  message?: string
  title?: string
  errors?: Record<string, string[]>
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    const data = error.response?.data

    if (data?.errors) {
      return Object.values(data.errors).flat().join(' ')
    }

    return data?.message ?? data?.title ?? error.message
  }

  return error instanceof Error
    ? error.message
    : 'Đã xảy ra lỗi.'
}