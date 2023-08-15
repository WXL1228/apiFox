export interface CreateTableRequestData {
  name: string
  description: string
  isPrivate: boolean
}

export interface UpdateTableRequestData {
  projectId: string | undefined
  name: string
  description: string
  isPrivate: boolean
}

// export interface GetTableRequestData {
//   /** 当前页码 */
//   currentPage: number
//   /** 查询条数 */
//   size: number
//   /** 查询参数：用户名 */
//   username?: string
//   /** 查询参数：手机号 */
//   phone?: string
// }

// export interface GetTableData {
//   createTime: string
//   email: string
//   id: string
//   phone: string
//   roles: string
//   status: boolean
//   username: string
// }

// export type GetTableResponseData = ApiResponseData<{
//   list: GetTableData[]
//   total: number
// }>
