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
        <el-button class="windi-mb-md" type="primary">添加成员</el-button>
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
              <span>{{ scope.$index + (pagination.page - 1) * pagination.size + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="成员昵称" align="center" prop="userName" width="180" />
          <el-table-column label="成员权限" align="center" prop="fileName" min-width="220" show-overflow-tooltip>
            <template #default="{ row }">
              <el-link :underline="false" type="primary" @click="goDetail(row)">
                {{ row.fileName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="描述" align="center" prop="text" min-width="300" show-overflow-tooltip />
          <el-table-column label="最近修改" align="center" prop="createTime" width="180" />
          <el-table-column label="操作" align="center" width="150">
            <template #default="{ row }">
              <span v-if="false">{{ row }}</span>
              <el-button link type="primary">修改</el-button>
              <el-button link type="danger">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          :total="pagination.total"
          v-model:size="pagination.size"
          v-model:page="pagination.page"
          @change="initData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ElMessage, ElMessageBox } from "element-plus"
import { ref } from "vue"
import { useRouter } from "vue-router"

defineOptions({
  name: "CommentManage"
})

interface ITable {
  id: number
  creationIp: string
  text: string
  userId: number
  userName: string
  createTime: string
  fileId: number
  fileName: string
}

const pagination = ref({
  page: 1,
  size: 10,
  total: 0
})
const commentText = ref("")
const tableData = ref<ITable[]>([
  {
    id: 1,
    creationIp: "2222",
    text: "string",
    userId: 1,
    userName: "string",
    createTime: "string",
    fileId: 1,
    fileName: "string"
  }
])
const loading = ref<Boolean>(false)
const selectVal = ref<ITable[]>([])
const router = useRouter()

// 初始化数据
const initData = () => {}
// 获取批量选择数据
const handleSelectionChange = (val: ITable[]) => {
  selectVal.value = val
}

// 检索
const search = () => {
  pagination.value.page = 1
  initData()
}
// 跳转到详情页面
const goDetail = (item: any) => {
  router.push({
    name: "",
    params: { id: item.fileId }
  })
}

initData()
</script>

<style scoped></style>
