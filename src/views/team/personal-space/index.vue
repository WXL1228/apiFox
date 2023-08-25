<template>
  <div class="app-container">
    <div class="app-content">
      <!-- 检索区域 -->
      <div>
        <el-form :inline="true">
          <el-form-item label="项目ID"
            ><el-input placeholder="请输入项目ID" v-model="projectID" @clear="search"
          /></el-form-item>
          <el-form-item><el-button type="primary" @click="search">搜索</el-button></el-form-item>
          <el-form-item label="项目名称:">{{ projectStore.projectName }}</el-form-item>
          <el-form-item label="项目ID:">{{ projectStore.projectId }}</el-form-item>
        </el-form>
        <el-button v-if="isShow" class="windi-mb-md" type="warning" @click="createInterface">新建接口</el-button>
        <el-button v-if="isShow" class="windi-mb-md" color="#626aef" @click="importInterface">导入接口</el-button>
        <el-button v-if="isShow" class="windi-mb-md" type="danger" @click="batchDelete">批量删除</el-button>
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
              <el-button link type="primary" @click="editProject(row)">开发</el-button>
              <el-button link type="info" @click="goDetail(row._id)">详情</el-button>
              <el-button v-if="isShow" link type="danger" @click="deleteTableDataApiFun(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <EditDialog ref="editDialogRef" @initData="initData" />
    <InterfaceDetail ref="interfaceDetailRef" @initData="initData" />
    <ImportInterface ref="importInterfaceRef" @initData="initData" />
    <InterfaceDevelopment ref="InterfaceDevelopmentRef" @initData="initData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useProjectStore } from "@/store/modules/personal-space"
import { useUserStore } from "@/store/modules/user"
import { getTableDataApi, getInterfaceDataApi, deleteInterfaceDataApi } from "@/api/table/index"
// import { getToken } from "@/utils/cache/cookies"
// const token = getToken()
import router from "@/router"
import EditDialog from "./components/edit-dialog.vue"
import InterfaceDetail from "./components/interface-detail.vue"
import ImportInterface from "./components/import-interface.vue"
import InterfaceDevelopment from "./components/interface-development.vue"
import { ElMessageBox, ElMessage } from "element-plus"
import type { TagProps } from "element-plus"
type Item = { type: TagProps["type"]; label: string }

const items = ref<Array<Item>>([{ type: "info", label: "开发中" }])

const editDialogRef = ref<InstanceType<typeof EditDialog>>()
const interfaceDetailRef = ref<InstanceType<typeof InterfaceDetail>>()
const importInterfaceRef = ref<InstanceType<typeof ImportInterface>>()
const InterfaceDevelopmentRef = ref<InstanceType<typeof InterfaceDevelopment>>()
const projectStore = useProjectStore()
const userStore = useUserStore()
const isShow = ref<boolean>(true)

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
const tableData = ref<ITable[]>([
  {
    projectId: projectStore.projectId,
    name: "",
    url: "",
    http_method: "",
    query: [],
    body: [],
    response_data: [],
    __v: null,
    _id: ""
  }
])
const loading = ref<Boolean>(false)
const selectVal = ref<ITable[]>([])

const searchProjectDetail = () => {
  // const params = {
  //   projectName: projectID.value
  // }
  // getPublicTableDataApi(params).then((res: any) => {
  //   if (res.code === 200) {
  //     ElMessage.success(res.message)
  //     console.log(res)
  //     projectStore.projectName = projectID.value
  //     console.log(res.data.projects.length)
  //     projectStore.projectId = res.data.projects[res.data.projects.length - 1]._id
  //     initData()
  //   }
  // })
  // if (projectStore.projectId === "" && projectStore.projectName === "") return
  const params_1 = {
    projectId: projectID.value
  }
  getTableDataApi(params_1).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.message)
      projectStore.projectId = projectID.value
      projectStore.projectName = res.data.project.name
      projectID.value = ""
      initData()
    }
  })
}

// 初始化数据
const initData = () => {
  if (projectStore.projectId === "") {
    ElMessage.error("请选择项目")
    router.push({ name: "Private-Program" })
    return
  }
  const params = {
    projectId: projectStore.projectId
  }
  getInterfaceDataApi(params).then((res: any) => {
    if (res.code === 200) {
      tableData.value = res.data.interfaces
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

  searchTeam()
}

const searchTeam = () => {
  const params = {
    projectId: projectStore.projectId
  }
  getTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      for (let i = 0; i < res.data.project.members.length; i++) {
        if (userStore.userId === res.data.project.members[i].member) {
          if (res.data.project.members[i].permission === 0) isShow.value = true
          else isShow.value = false
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
  if (projectStore.projectId === "") {
    ElMessage.error("请选择项目")
    return
  }
  const obj = { id: 1, title: "接口详情", isAdd: false, item: item }
  interfaceDetailRef.value?.show(obj)
}

// 创建接口
const createInterface = () => {
  const obj = { id: 1, title: "创建接口", isAdd: true }
  editDialogRef.value?.show(obj)
  initData()
}

// 导入接口
const importInterface = () => {
  const obj = { id: 1, title: "导入接口", projectId: projectStore.projectId }
  importInterfaceRef.value?.show(obj)
  initData()
}

// 开发接口
const editProject = (row: any) => {
  console.log(row.responseData)
  const obj = { id: 1, title: "开发接口", detailMsg: row }
  InterfaceDevelopmentRef.value?.show(obj)
  initData()
  initData()
}

// 删除接口(单个)
const deleteTableDataApiFun = (row: any) => {
  console.log(row._id)
  ElMessageBox.confirm("确定删除该接口吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    const params = {
      interfaceId: row._id
    }
    deleteInterfaceDataApi(params).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success(res.message)
        initData()
      }
    })
  })
}

//删除接口(批量)
const deleteTableDataApiFunc = (data: any) => {
  ElMessageBox.confirm("确定删除选中接口吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    data.forEach((element: any) => {
      const params = {
        interfaceId: element._id
      }
      deleteInterfaceDataApi(params).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success(res.message)
          initData()
        }
      })
    })
  })
}

// 批量删除
const batchDelete = () => {
  if (selectVal.value && selectVal.value.length === 0) {
    selectVal.value.forEach((element) => {
      deleteTableDataApiFun(element)
    })
  } else if (selectVal.value && selectVal.value.length > 0) {
    deleteTableDataApiFunc(selectVal.value)
  } else {
    ElMessage.info("请选择要删除的项目")
    initData()
    return
  }
}

initData()
</script>

<style scoped></style>
