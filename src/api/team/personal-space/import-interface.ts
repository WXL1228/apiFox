import axios from "axios"
const baseURL = import.meta.env.VITE_BASE_API
import { getToken } from "@/utils/cache/cookies"

// 上传文件

const token = getToken()
export const uploadFile = (data: any) => {
  return axios({
    url: `${baseURL}/interface/importInterface`,
    method: `POST`,
    data: data,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": "multipart/form-data"
    }
  })
}
// 下载模板
export const downLoadFile = () => {
  return axios({
    url: `${baseURL}download/template`,
    method: `GET`,
    responseType: "blob",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      Accept: "application/octet-stream; charset=utf-8"
    }
  })
}
