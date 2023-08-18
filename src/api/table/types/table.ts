export interface CreateInterfaceRequestData {
  projectId: string
  name: string
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  query: object
  body: object
  responseData: object
}

export interface UpdateInterfaceRequestData {
  interfaceId: string
  name: string
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  query: object
  responseData: object
  body: object
}

export interface GetTableRequestData {
  projectId: string
}

export interface GetTableData {
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
}

export interface deleteInterfaceRequestData {
  interfaceId: string
}

export interface GetInterfaceDetail {
  interfaceId: string
}

export interface MockInterfaceDetail {
  interfaceId: string
}
