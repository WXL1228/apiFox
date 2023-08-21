<template>
  <div class="app-container">
    <div class="app-content">
      <!-- 检索区域 -->
      <div>
        <el-form :inline="true">
          <el-form-item label="项目名称"
            ><el-input placeholder="请输入项目名称" clearable v-model="projectName" @clear="search"
          /></el-form-item>
          <el-form-item><el-button type="primary" @click="search">搜索</el-button></el-form-item>
          <el-form-item label="项目名称:">{{ projectStore.publicProjectName }}</el-form-item>
        </el-form>
      </div>
      <el-divider />
      <!-- 表格区域 -->
      <div>
        <el-table
          class="windi-mb-md"
          size="large"
          :data="tableData"
          v-loading="loading"
          tooltip-effect="light"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" width="100" align="center">
            <template #default="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="接口名称" align="center" prop="name" width="300" />
          <el-table-column label="接口地址" align="center" prop="url" width="300" show-overflow-tooltip />
          <el-table-column label="方法" align="center" prop="http_method" width="300" />
          <el-table-column label="状态" align="center" prop="query" width="300"
            ><div>
              <el-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark" round>
                {{ item.label }}
              </el-tag>
            </div></el-table-column
          >
          <el-table-column label="操作" align="center" min-width="220">
            <template #default="{ row }">
              <el-button link type="primary" @click="editProject(row)">测试</el-button>
              <el-button link type="info" @click="goDetail(row._id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <EditDialog ref="editDialogRef" @initData="initData" />
    <InterfaceDetail ref="interfaceDetailRef" />
    <ImportInterface ref="importInterfaceRef" />
    <InterfaceDevelopment ref="InterfaceDevelopmentRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { usePublicProjectStore } from "@/store/modules/public-space"
import { getPublicTableDataApi, getInterfaceDataApi } from "@/api/table/index"

import InterfaceDetail from "./components/interface-detail.vue"

import InterfaceDevelopment from "./components/interface-development.vue"
import { ElMessage } from "element-plus"
import type { TagProps } from "element-plus"
type Item = { type: TagProps["type"]; label: string }

const items = ref<Array<Item>>([{ type: "success", label: "公开中" }])

const interfaceDetailRef = ref<InstanceType<typeof InterfaceDetail>>()

const InterfaceDevelopmentRef = ref<InstanceType<typeof InterfaceDevelopment>>()
const projectStore = usePublicProjectStore()
defineOptions({
  name: "CommentManage"
})

interface ITable {
  projectId: string
  name: string
  url: string
  http_method: string
  query: object
  body: object
  response_data: object
  __v: number | null
  _id: string
}

const projectID = ref<string>("")
const projectName = ref<string>("")
const tableData = ref<ITable[]>([
  {
    projectId: projectStore.publicProjectId,
    name: "",
    url: "",
    http_method: "",
    query: {},
    body: {},
    response_data: {},
    __v: null,
    _id: ""
  }
])
const loading = ref<Boolean>(false)
const selectVal = ref<ITable[]>([])

const searchProjectDetail = () => {
  const params = {
    projectName: projectName.value
  }
  getPublicTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      console.log(res.data)
      projectStore.publicProjectName = res.data.projects[res.data.projects.length - 1].name
      projectStore.publicProjectId = res.data.projects[res.data.projects.length - 1]._id
      projectID.value = projectStore.publicProjectId
      tableData.value = res.data.interface
      initData()
    }
  })
}

// 初始化数据
const initData = () => {
  if (projectStore.publicProjectId === "" || (projectStore.publicProjectId === "" && projectName.value === "")) {
    ElMessage.error("请选择公开项目")
    return
  }
  const params = {
    projectId: projectStore.publicProjectId
  }
  getInterfaceDataApi(params).then((res: any) => {
    if (res.code === 200) {
      tableData.value = res.data.interfaces
      console.log(tableData.value)
      for (const [key, value] of Object.entries(tableData)) {
        if (key === "_rawValue") {
          for (let a = 0; a < value.length; a++) {
            const swap = (value: any, i: number, j: number) => {
              const tmp = value[i]
              value[i] = value[j]
              value[j] = tmp
            }
            const sort = (value: any, l: number, r: number) => {
              if (l >= r) return
              const x = value[l]["_id"]
              let i = l - 1
              let j = r + 1
              while (i < j) {
                while (value[++i]["_id"] < x);
                while (value[--j]["_id"] > x);
                if (i < j) swap(value, i, j)
              }
              sort(value, l, j)
              sort(value, j + 1, r)
            }
            sort(value, 0, value.length - 1)
          }
        }
      }
    }
  })
}
// 获取批量选择数据
const handleSelectionChange = (val: ITable[]) => {
  selectVal.value = val
}

// 检索
const search = () => {
  searchProjectDetail()
}

// 跳转到详情页面
const goDetail = (item: string) => {
  if (projectStore.publicProjectId === "") {
    ElMessage.error("请选择公开项目")
    return
  }
  const obj = { id: 1, title: "接口详情", isAdd: false, item: item }
  interfaceDetailRef.value?.show(obj)
}

// 开发接口
const editProject = (row: any) => {
  console.log(row.responseData)
  const obj = { id: 1, title: "使用接口", detailMsg: row }
  InterfaceDevelopmentRef.value?.show(obj)
  initData()
}

initData()
initData()
</script>

<style scoped></style>
