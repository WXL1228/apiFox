<template>
  <el-dialog :title="titleName" width="70%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form-item label="项目名称/ID:">{{ NAME }}--------{{ ID }}</el-form-item
    ><el-form :inline="true">
      <el-form-item label="用户名称："
        ><el-input placeholder="请输入用户名" clearable v-model="commentText"
      /></el-form-item>
      <el-form-item><el-button type="primary" @click="addTeamConfig">添加成员</el-button></el-form-item>
    </el-form>
    <div style="margin-top: 5px">
      <el-table
        class="windi-mb-md"
        size="large"
        :data="tableData.members"
        v-loading="loading"
        tooltip-effect="light"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column label="成员ID" align="center" prop="member" width="220" />
        <el-table-column
          label="权限(0:管理 1:读写 2:只读)"
          align="center"
          prop="permission"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column label="操作" align="center" width="250">
          <template #default="{ row }">
            <el-button m-2 flex-nowrap link type="success" @click="upDeleteTeam(row)">修改权限</el-button>
            <el-button m-2 flex-nowrap link type="danger" @click="deleteTeam(row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus"
import { ref } from "vue"
import { AddTeamTableDataApi, getTableDataApi, getPublicTableDataApi } from "@/api/table/index"
import { updateTableDataApi } from "@/api/dashboard/index"
import { ElMessage } from "element-plus"
const dialogVisible = ref(false)
const loading = ref<Boolean>(false)
const formRef = ref<FormInstance>()
const emit = defineEmits(["initData"])
const titleName = ref("")
const ID = ref("")
const NAME = ref<string>("")

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
    }
  ]
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
      permission: 2
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
      permission: ""
    }
  ]
})

// 显示弹窗
const show = async (obj: { id: number; title: string; item: DetailMsg }) => {
  console.log(obj.item)
  titleName.value = obj.title
  ID.value = obj.item._id
  NAME.value = obj.item.name

  tableData.value = obj.item
  dialogVisible.value = true

  searchTeam()
}

const commentText = ref("")

const addTeamConfig = () => {
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
  console.log(tableData.value)
  console.log(row)
  for (let i = 0; i < tableData.value.members.length; i++) {
    if (tableData.value.members[i] === row) {
      tableData.value.members.splice(i, 1)
    }
  }
  const params = {
    projectId: ID.value,
    members: tableData.value.members
  }

  updateTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.error)
      console.log(res)

      searchTeam()
    }
  })
}

const upDeleteTeam = (row: any) => {
  console.log(tableData.value)
  console.log(row)

  for (let i = 0; i < tableData.value.members.length - 1; i++) {
    tableData1.value.members.push({ userId: "", permission: "" })
  }

  tableData1.value.projectId = ID.value
  for (let i = 0; i < tableData.value.members.length; i++) {
    console.log(tableData.value.members[i])

    tableData1.value.members[i].userId = tableData.value.members[i].member
    if (tableData.value.members[i] === row) {
      if (tableData.value.members[i].permission === 1) tableData1.value.members[i].permission = "write"
      else if (tableData.value.members[i].permission === 2) tableData1.value.members[i].permission = "admin"
      else tableData1.value.members[i].permission = "write"
      console.log("111111111111111111111111111111111111")
    } else {
      if (tableData.value.members[i].permission === 1) tableData1.value.members[i].permission = "read"
      else if (tableData.value.members[i].permission === 2) tableData1.value.members[i].permission = "write"
      else tableData1.value.members[i].permission = "admin"
    }

    console.log(tableData1.value)
  }
  console.log(tableData.value)

  const params = {
    projectId: ID.value,
    members: tableData1.value.members
  }

  updateTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.error)
      console.log(res)

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
      console.log("---------------------------")
      console.log(res)
      tableData.value.members = res.data.project.members
      console.log(tableData.value.members)
      // tableData1.value.__v = res.data.project.__v
      // tableData1.value._id = res.data.project._id
      // tableData1.value.created_by = res.data.project.created_by
      // tableData1.value.created_time = res.data.project.created_time
      // tableData1.value.description = res.data.project.description
      // tableData1.value.isPrivate = res.data.project.isPrivate
      // tableData1.value.name = res.data.project.name
      // console.log(tableData.value)
      // console.log(tableData1.value)
      // console.log(tableData.value.members[0])
      // console.log(tableData.value.members[0].member)
      // tableData.value.members[0].member = "1"
      // console.log(tableData.value.members[0])
      // console.log(tableData.value.members[1])
      // for (let i = 0; i < res.data.project.members.length; i++) {
      //   tableData1.value.members[i]["member"] = tableData.value.members[i]["member"]
      // }
      // console.log(tableData.value)
      // console.log(tableData1.value)
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
