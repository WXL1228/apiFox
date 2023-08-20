import { request } from "@/utils/service"
import type * as Table from "./types/table"

// /** 增 */
// export function createTableDataApi(data: Table.CreateTableRequestData) {
//   return request({
//     url: "table",
//     method: "post",
//     data
//   })
// }

/** 删 */
export function deleteTableDataApi(data: Table.deleteTableRequestData) {
  return request({
    url: "/project/deleteProject",
    method: "post",
    data: data
  })
}

// /** 改 */
// export function updateTableDataApi(data: Table.UpdateTableRequestData) {
//   return request({
//     url: "table",
//     method: "put",
//     data
//   })
// }

/** 查 */
export function getTableDataApi(data: Table.GetTableRequestData) {
  return request({
    url: "/project/allProjects",
    method: "post",
    data: data
  })
}
// 公开项目查询
export function getPublicTableDataApi() {
  return request({
    url: "/project/allPublicProjects",
    method: "post"
  })
}
