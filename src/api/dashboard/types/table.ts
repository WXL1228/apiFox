export interface CreateTableRequestData {
  name: string
  description: string
  isPrivate?: boolean
}

export interface UpdateTableRequestData {
  projectId: string | undefined
  name: string
  description: string
  isPrivate?: boolean
}

export interface GetTableRequestData {
  projectId: string
}

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
