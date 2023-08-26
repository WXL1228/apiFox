<template>
  <el-dialog :title="titleName" width="70%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form-item label="项目名称/ID:">{{ NAME }}--------{{ ID }}</el-form-item>
    <el-form-item label="创建人名称/ID:"
      >{{ tableData1.members[0].username }}--------{{ tableData1.members[0].userId }}</el-form-item
    >
    <el-form v-if="isShow" :inline="true">
      <el-form-item label="用户名称："
        ><el-select
          @click="initUser"
          clearable
          filterable
          v-model="commentText"
          autocomplete="off"
          placeholder="请选择用户"
        >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" /> </el-select
      ></el-form-item>
      <el-form-item><el-button type="primary" @click="addTeamConfig">添加成员</el-button></el-form-item>
    </el-form>
    <div style="margin-top: 5px">
      <el-table
        class="windi-mb-md"
        size="large"
        :data="tableData1.members"
        v-loading="loading"
        tooltip-effect="light"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column label="成员名称" align="center" prop="username" width="220" />
        <el-table-column
          label="权限(admin:管理 write:读写 read:只读)"
          align="center"
          prop="permission"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column label="操作" align="center" width="250">
          <template v-if="isShow" #default="{ row }">
            <el-button m-2 flex-nowrap link type="success" @click="upDeleteTeam(row)">修改权限</el-button>
            <el-button m-2 flex-nowrap link type="danger" @click="deleteTeam(row)">移除</el-button>
          </template>
          <el-tag v-if="!isShow" class="ml-2" type="info">无权限修改</el-tag>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus"
import { ref } from "vue"
import {
  AddTeamTableDataApi,
  getTableDataApi,
  getPublicTableDataApi,
  deleteTeamTableDataApi,
  getUserInfoDataApi
} from "@/api/table/index"
import { updateTableDataApi } from "@/api/dashboard/index"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/store/modules/user"
const dialogVisible = ref(false)
const loading = ref<Boolean>(false)
const formRef = ref<FormInstance>()
const emit = defineEmits(["initData"])
const titleName = ref("")
const ID = ref("")
const NAME = ref<string>("")
const userStore = useUserStore()
const isShow = ref<boolean>(true)

interface DetailMsg {
  name: string
  description: string
  created_time: string
  isPrivate: boolean
  created_by: string
  members: [
    {
      member: string
      permission: number
      username: string
    }
  ]
  __v: number | null
  _id: string
}

interface DetailMsg1 {
  projectId: string
  members: [
    {
      userId: string
      permission: string
      username: string
    }
  ]
  __v: number | null
}

const tableData = ref<DetailMsg>({
  name: "",
  description: "",
  created_time: "",
  isPrivate: false,
  created_by: "",
  members: [
    {
      member: "",
      permission: 2,
      username: ""
    }
  ],
  __v: null,
  _id: ""
})

const tableData1 = ref<DetailMsg1>({
  projectId: "",
  members: [
    {
      userId: "",
      permission: "",
      username: ""
    }
  ],
  __v: null
})

// 显示弹窗
const show = async (obj: { id: number; title: string; item: DetailMsg }) => {
  titleName.value = obj.title
  ID.value = obj.item._id
  NAME.value = obj.item.name

  tableData.value = obj.item
  dialogVisible.value = true

  initUser()
  searchTeam()
}

const options = ref([
  {
    label: "",
    value: ""
  }
])

const initUser = () => {
  getUserInfoDataApi().then((res: any) => {
    options.value.splice(0, options.value.length)
    for (let i = 0; i < res.data.length; i++) {
      options.value.push({ label: "", value: "" })
    }
    for (let i = 0; i < res.data.length; i++) {
      options.value[i].value = res.data[i].username
      options.value[i].label = res.data[i].username
    }
  })
}

const commentText = ref("")

const addTeamConfig = () => {
  console.log(commentText.value)
  const params = {
    username: commentText.value,
    projectId: ID.value
  }

  AddTeamTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.error)
      console.log(res)

      searchTeam()
    }
  })
}

const deleteTeam = (row: any) => {
  const params = {
    username: row.username,
    projectId: ID.value
  }
  deleteTeamTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.error)
      console.log(res)

      searchTeam()
    }
  })
}

const upDeleteTeam = (row: any) => {
  console.log(tableData.value)

  for (let i = tableData1.value.members.length - 1; i < tableData.value.members.length - 1; i++) {
    tableData1.value.members.push({ userId: "", permission: "", username: "" })
  }

  tableData1.value.projectId = ID.value
  for (let i = 0; i < tableData.value.members.length; i++) {
    tableData1.value.members[i].userId = tableData.value.members[i].member
    tableData1.value.members[i].username = tableData.value.members[i].username
    if (tableData1.value.members[i] === row) {
      if (tableData1.value.members[i].permission === "write") tableData1.value.members[i].permission = "admin"
      else if (tableData1.value.members[i].permission === "read") tableData1.value.members[i].permission = "write"
      else if (tableData1.value.members[i].permission === "admin") tableData1.value.members[i].permission = "read"
    } else {
      if (tableData.value.members[i].permission === 1) tableData1.value.members[i].permission = "write"
      else if (tableData.value.members[i].permission === 2) tableData1.value.members[i].permission = "read"
      else if (tableData.value.members[i].permission === 0) tableData1.value.members[i].permission = "admin"
    }
  }

  const params = {
    projectId: ID.value,
    members: tableData1.value.members
  }

  updateTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.error)

      searchTeam()
    }
  })
}

const searchTeam = () => {
  const params = {
    projectId: ID.value
  }
  getTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      tableData.value.members = res.data.project.members
      tableData1.value.members.splice(0, tableData1.value.members.length)
      for (let i = tableData1.value.members.length - 1; i < tableData.value.members.length - 1; i++) {
        tableData1.value.members.push({ userId: "", permission: "", username: "" })
      }
      for (let i = 0; i < res.data.project.members.length; i++) {
        tableData1.value.members[i].userId = tableData.value.members[i].member
        tableData1.value.members[i].username = tableData.value.members[i].username
        if (tableData.value.members[i].permission === 1) tableData1.value.members[i].permission = "write"
        else if (tableData.value.members[i].permission === 2) tableData1.value.members[i].permission = "read"
        else if (tableData.value.members[i].permission === 0) tableData1.value.members[i].permission = "admin"
      }

      for (let i = 0; i < res.data.project.members.length; i++) {
        if (userStore.userId === res.data.project.members[i].member) {
          if (res.data.project.members[i].permission === 0) isShow.value = true
          else isShow.value = false
        }
      }
    }
  })

  const data = {
    projectName: NAME.value
  }

  getPublicTableDataApi(data).then((res: any) => {
    if (res.code === 200) {
      console.log(res.data)
    }
  })
}

// 关闭事件
const close = () => {
  formRef.value?.resetFields()
  emit("initData")
  dialogVisible.value = false
}

defineExpose({
  show
})
</script>
<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
