export interface LoginRequestData {
  /** admin 或 editor */
  username: "admin" | "editor" | ""
  /** 密码 */
  password: string
  /** 确认密码 */
  confirmedPassword?: string
}

export interface LoginRequestData1 {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
  /** 确认密码 */
  confirmedPassword?: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
