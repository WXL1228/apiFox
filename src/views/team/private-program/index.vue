<template>
  <div class="app-container">
    <div class="app-content">
      <PageTitle />
      <!-- 检索区域 -->
      <div>
        <el-form :inline="true">
          <el-form-item label="项目名称："
            ><el-input placeholder="请输入项目名称" clearable v-model="commentText" @clear="search"
          /></el-form-item>
          <el-form-item><el-button type="primary" @click="search">搜索</el-button></el-form-item>
        </el-form>
        <el-button class="windi-mb-md" type="primary" @click="createProject">新建项目</el-button>
        <el-button class="windi-mb-md" type="danger" @click="batchDelete">批量删除</el-button>
      </div>
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
          <el-table-column label="创建日期" align="center" prop="created_time" width="220" />
          <el-table-column label="项目ID" align="center" prop="_id" width="220" />
          <el-table-column label="私有项目" align="center" width="150">
            <template #default="{ row }">
              <el-switch v-model="row.isPrivate" @change="isPublicDetail(row)" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template #default="{ row }">
              <el-button link type="warning" @click="goDetail(row)">管理</el-button>
              <el-button link type="primary" @click="editProject(row)">编辑</el-button>
              <el-button link type="info" @click="getDetail(row._id)">详情</el-button>
              <el-button link type="danger" @click="deleteTableDataApiFun(row)">删除</el-button>
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
import { ElMessage, ElMessageBox } from "element-plus"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useProjectStore } from "@/store/modules/personal-space"
import { updateTableDataApi } from "@/api/dashboard/index"
import { getTableDataApi, deleteTableDataApi } from "@/api/team/private-program/index"
import { getToken } from "@/utils/cache/cookies"
const token = getToken()
import EditDialog from "../../dashboard/components/edit-dialog.vue"
import TableDetail from "../../dashboard/components/program-detail.vue"

const editDialogRef = ref<InstanceType<typeof EditDialog>>()
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

const commentText = ref("")
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
const projectStore = useProjectStore()

// 初始化数据
const initData = () => {
  const params = {
    token: token
  }
  getTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      tableData.value = res.data.projects
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

const isPublicDetail = (row: any) => {
  const isPrivateFlag = ref<boolean>()
  console.log(isPrivateFlag.value)
  const params = {
    projectId: row._id,
    name: row.name,
    description: row.description,
    isPrivate: row.isPrivate
  }
  updateTableDataApi(params).then((res: any) => {
    console.log(res)
  })
}
// 获取批量选择数据
const handleSelectionChange = (val: ITable[]) => {
  selectVal.value = val
}

// 检索
const search = () => {
  initData()
}

// 跳转到详情页面
const getDetail = (item: string) => {
  const obj = { id: 1, title: "接口详情", isAdd: false, item: item }
  tableDetailRef.value?.show(obj)
}
// 跳转到详情页面
const goDetail = (item: any) => {
  console.log(item._id)
  projectStore.projectId = item._id
  projectStore.projectName = item.name
  router.push({
    name: "Personal-Space"
  })
}

// 创建项目
const createProject = () => {
  const obj = { id: 1, title: "创建项目", isAdd: true }
  editDialogRef.value?.show(obj)
}

// 编辑项目
const editProject = (row: any) => {
  const obj = { id: 1, title: "编辑项目", isAdd: false, detailMsg: row }
  editDialogRef.value?.show(obj)
}

// 删除项目(单个)
const deleteTableDataApiFun = (row: any) => {
  ElMessageBox.confirm("确定删除该项目吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    const params = {
      projectId: row._id
    }
    deleteTableDataApi(params).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success(res.message)
        initData()
      }
    })
  })
}

//删除项目(批量)
const deleteTableDataApiFunc = (data: any) => {
  ElMessageBox.confirm("确定删除选中项目吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    data.forEach((element: any) => {
      const params = {
        projectId: element._id
      }
      deleteTableDataApi(params).then((res: any) => {
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
    return
  }
}

initData()
</script>

<style scoped></style>
