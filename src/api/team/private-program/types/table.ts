// export interface CreateTableRequestData {
//   username: string
//   password: string
// }

// export interface UpdateTableRequestData {
//   id: string
//   username: string
//   password?: string
// }

export interface GetTableRequestData {
  token: string | undefined
}

export interface deleteTableRequestData {
  projectId: string | undefined
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
