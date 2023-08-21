<template>
  <div class="app-container">
    <div class="app-content">
      <!-- 检索区域 -->
      <!-- 表格区域 -->
      <div style="margin-top: 5px">
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
          <el-table-column label="项目名称" align="center" prop="name" width="180" />
          <el-table-column label="描述" align="center" prop="description" min-width="200" show-overflow-tooltip />
          <el-table-column label="创建人" align="center" prop="created_by" width="220" />
          <el-table-column label="创建日期" align="center" prop="created_time" width="220" />

          <el-table-column label="操作" align="center" width="220">
            <template #default="{ row }">
              <el-button link type="warning" @click="goDetail(row)">项目接口</el-button>
              <el-button link type="info" @click="getDetail(row._id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <EditDialog ref="editDialogRef" @initData="initData" />
    <TableDetail ref="tableDetailRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { usePublicProjectStore } from "@/store/modules/public-space"

import { getPublicTableDataApi } from "@/api/team/private-program/index"
import TableDetail from "./components/program-detail.vue"

const tableDetailRef = ref<InstanceType<typeof TableDetail>>()

defineOptions({
  name: "CommentManage"
})

interface ITable {
  name: string
  description: string
  created_time: string
  isPrivate: boolean
  created_by: string
  members: []
  __v: number | null
  _id: string
}

const tableData = ref<ITable[]>([
  {
    name: "",
    description: "",
    created_time: "",
    isPrivate: false,
    created_by: "",
    members: [],
    __v: null,
    _id: ""
  }
])
const loading = ref<Boolean>(false)
const selectVal = ref<ITable[]>([])
const router = useRouter()
const projectStore = usePublicProjectStore()

// 初始化数据
const initData = () => {
  getPublicTableDataApi().then((res: any) => {
    if (res.code === 200) {
      console.log(res)
      tableData.value = res.data.publicProjects
      console.log(tableData.value)
      for (const [key, value] of Object.entries(tableData)) {
        if (key === "_rawValue") {
          for (let i = 0; i < value.length; i++) {
            const timeData = value[i]["created_time"]
            const time10 = new Date(+new Date(timeData) + 8 * 3600 * 1000)
              .toISOString()
              .replace(/T/g, " ")
              .replace(/\.[\d]{3}Z/, "")
            value[i]["created_time"] = time10
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

// 跳转到详情页面
const getDetail = (item: string) => {
  const obj = { id: 1, title: "接口详情", isAdd: false, item: item }
  tableDetailRef.value?.show(obj)
}
// 跳转到详情页面
const goDetail = (item: any) => {
  console.log(item._id)
  projectStore.publicProjectId = item._id
  projectStore.publicProjectName = item.name
  router.push({
    name: "Life-Server"
  })
}

initData()
</script>

<style scoped></style>
