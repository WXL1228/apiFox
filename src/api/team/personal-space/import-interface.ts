import axios from "axios"
const baseURL = import.meta.env.VITE_BASE_API
import { getToken } from "@/utils/cache/cookies"

// 上传文件

export const uploadFile = (data: any) => {
  const token = getToken()
  return axios({
    url: `${baseURL}/interface/importInterface`,
    method: `POST`,
    data: data,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      // "Content-Type": "application/json"
      "Content-Type": "multipart/form-data"
    }
  })
}
