<template>
  <div class="app-container">
    <div class="app-content">
      <PageTitle />
      <!-- 检索区域 -->
      <div>
        <el-form :inline="true">
          <el-form-item label="项目名称/ID"
            ><el-input placeholder="请输入项目名称/ID" clearable v-model="projectID" @clear="search"
          /></el-form-item>
          <el-form-item><el-button type="primary" @click="search">搜索</el-button></el-form-item>
          <el-form-item label="项目名称:">{{ projectStore.projectName }}</el-form-item>
          <el-form-item label="项目ID:">{{ projectStore.projectId }}</el-form-item>
        </el-form>
        <el-button class="windi-mb-md" type="warning" @click="createInterface">新建接口</el-button>
        <el-button class="windi-mb-md" color="#626aef" @click="111">导入接口</el-button>
        <el-button class="windi-mb-md" type="danger" @click="batchDelete">批量删除</el-button>
      </div>
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
          <el-table-column label="接口名称" align="center" prop="name" width="100" />
          <el-table-column label="接口地址" align="center" prop="url" width="250" show-overflow-tooltip />
          <el-table-column label="方法" align="center" prop="http_method" width="100" />
          <el-table-column label="参数格式" align="center" prop="query" width="200" />
          <el-table-column label="body" align="center" prop="body" min-width="300" />
          <el-table-column label="响应格式" align="center" prop="responseData" min-width="220" />
          <el-table-column label="操作" align="center" width="220">
            <template #default="{ row }">
              <el-button link type="warning" @click="222">测试</el-button>
              <el-button link type="primary" @click="editProject(row)">编辑</el-button>
              <el-button link type="primary" @click="goDetail(row._id)">详情</el-button>
              <el-button link type="danger" @click="deleteTableDataApiFun(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <EditDialog ref="editDialogRef" @initData="initData" />
    <InterfaceDetail ref="interfaceDetailRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useProjectStore } from "@/store/modules/personal-space"
import { getTableDataApi, getInterfaceDataApi, deleteInterfaceDataApi } from "@/api/table/index"
// import { getToken } from "@/utils/cache/cookies"
// const token = getToken()
import EditDialog from "./components/edit-dialog.vue"
import InterfaceDetail from "./components/interface-detail.vue"
import { ElMessageBox, ElMessage } from "element-plus"

const editDialogRef = ref<InstanceType<typeof EditDialog>>()
const interfaceDetailRef = ref<InstanceType<typeof InterfaceDetail>>()
const projectStore = useProjectStore()
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
  responseData: object
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
    query: {},
    body: {},
    responseData: {},
    __v: null,
    _id: ""
  }
])
const loading = ref<Boolean>(false)
const selectVal = ref<ITable[]>([])

const searchProjectDetail = () => {
  const params = {
    projectId: projectID.value
  }
  getTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
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
    return
  }
  const params = {
    projectId: projectStore.projectId
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
  if (projectStore.projectId === "") {
    ElMessage.error("请选择项目")
    return
  }
  const obj = { id: 1, title: "接口详情", isAdd: false, item: item }
  interfaceDetailRef.value?.show(obj)
}

// 创建项目
const createInterface = () => {
  const obj = { id: 1, title: "创建接口", isAdd: true }
  editDialogRef.value?.show(obj)
  initData()
}

// 编辑项目
const editProject = (row: any) => {
  const obj = { id: 1, title: "编辑项目", isAdd: false, detailMsg: row }
  editDialogRef.value?.show(obj)
}

// 删除项目(单个)
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

//删除项目(批量)
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
initData()
</script>

<style scoped></style>
