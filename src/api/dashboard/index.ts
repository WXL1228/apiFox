import { request } from "@/utils/service"
import type * as Table from "./types/table"

/** 增 */
export function createTableDataApi(data: Table.CreateTableRequestData) {
  return request({
    url: "/project/createProject",
    method: "post",
    data: data
  })
}

// /** 删 */
// export function deleteTableDataApi(id: string) {
//   return request({
//     url: `table/${id}`,
//     method: "delete"
//   })
// }

/** 改 */
export function updateTableDataApi(data: Table.UpdateTableRequestData) {
  return request({
    url: "/project/editProject",
    method: "post",
    data: data
  })
}

/** 查 */
export function getTableDetailApi(data: Table.GetTableRequestData) {
  return request({
    url: "/project/projectDetail",
    method: "post",
    data: data
  })
}
