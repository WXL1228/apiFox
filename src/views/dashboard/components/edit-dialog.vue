<template>
  <el-dialog :title="titleName" width="30%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form ref="formRef" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="项目名称：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="项目描述：" prop="description">
        <el-input
          maxlength="300"
          placeholder="请输入项目描述"
          show-word-limit
          type="textarea"
          :rows="3"
          v-model="formData.description"
        />
      </el-form-item>
      <el-form-item label="设为私有项目：">
        <el-switch v-model="formData.isPrivate" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="windi-flex-center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRules, ElInput, FormInstance, ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import { createTableDataApi, updateTableDataApi } from "@/api/dashboard/index"
import { CreateTableRequestData } from "@/api/dashboard/types/table"

interface DetailMsg {
  name: string
  description: string
  created_time: string
  isPrivate: boolean
  created_by: string
  members: []
  __v: number | null
  _id: string
}

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const emit = defineEmits(["initData"])
const formData = ref<CreateTableRequestData>({
  name: "",
  description: "",
  isPrivate: false
})
const titleName = ref("")
const isAdd = ref(true)
const projectId = ref("") //项目id

// 规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: "项目名称不能为空！", trigger: "change" }],
  description: [{ required: true, message: "项目描述不能为空！", trigger: "change" }]
})

// 显示弹窗
const show = async (obj: { id?: number; title: string; isAdd: boolean; detailMsg?: DetailMsg }) => {
  titleName.value = obj.title
  isAdd.value = obj.isAdd
  if (obj.detailMsg) {
    projectId.value = obj.detailMsg._id
    formData.value.name = obj.detailMsg.name
    formData.value.description = obj.detailMsg.description
    formData.value.isPrivate = obj.detailMsg.isPrivate
  }
  dialogVisible.value = true
}

// 跳转项目页
import { useRouter } from "vue-router"
const router = useRouter()
const detail = () => {
  router.push({
    name: "Private-Program",
    query: {}
  })
}

// 保存信息
const save = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        createTableDataApiFun()
      } else {
        updateTableDataApiFun()
      }
      emit("initData")
      dialogVisible.value = false
    }
  })
}
// 关闭事件
const close = () => {
  formRef.value?.resetFields()
  emit("initData")
  dialogVisible.value = false
}

// 创建项目接口
const createTableDataApiFun = () => {
  const params = {
    name: formData.value.name,
    description: formData.value.description,
    isPrivate: formData.value.isPrivate
  }
  createTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.message)
      formData.value.name = ""
      formData.value.description = ""
      formData.value.isPrivate = false
      detail()
    }
  })
}

// 修改项目接口
const updateTableDataApiFun = () => {
  const params = {
    projectId: projectId.value,
    name: formData.value.name,
    description: formData.value.description,
    isPrivate: formData.value.isPrivate
  }
  updateTableDataApi(params).then((res) => {
    console.log(res)
  })
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
