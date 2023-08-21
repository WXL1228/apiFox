import { request } from "@/utils/service"
import type * as Table from "./types/table"

/** 增 */
export function createInterfaceDataApi(data: Table.CreateInterfaceRequestData) {
  return request({
    url: "/interface/createInterface",
    method: "post",
    data: data
  })
}

/** 删 */
export function deleteInterfaceDataApi(data: Table.deleteInterfaceRequestData) {
  return request({
    url: "/interface/deleteInterface",
    method: "post",
    data: data
  })
}

/** 改 */
export function updateInterfaceDataApi(data: Table.UpdateInterfaceRequestData) {
  return request({
    url: "/interface/editInterface",
    method: "post",
    data: data
  })
}

/** 查 */
export function getTableDataApi(data: Table.GetTableRequestData) {
  return request({
    url: "/project/projectDetail",
    method: "post",
    data: data
  })
}

export function getInterfaceDataApi(data: Table.GetTableRequestData) {
  return request({
    url: "/interface/allInterface",
    method: "post",
    data: data
  })
}

export function getInterfaceDetailApi(data: Table.GetInterfaceDetail) {
  return request({
    url: "/interface/interfaceDetail",
    method: "post",
    data: data
  })
}

export function MockInterfaceDetailApi(data: Table.MockInterfaceDetail) {
  return request({
    url: "/interface/mockInterface",
    method: "post",
    data: data
  })
}

//查公开项目
export function getPublicTableDataApi(data: Table.GetPublicTableRequestData) {
  return request({
    url: "/project/searchProject",
    method: "post",
    data: data
  })
}

export function AddTeamTableDataApi(data: Table.AddTeamTableRequestData) {
  return request({
    url: "/project/addMember",
    method: "post",
    data: data
  })
}

export function MockDetailApi(retail: string) {
  return request({
    url: `${retail}`,
    method: "post"
  })
}
