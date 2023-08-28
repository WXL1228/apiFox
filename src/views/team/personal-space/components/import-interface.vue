<template>
  <el-dialog :title="titleName" width="40%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form-item label="项目ID:">{{ projectId }}</el-form-item>
    <el-upload
      class="upload-demo"
      drag
      action="#"
      accept=""
      :show-file-list="false"
      :auto-upload="true"
      :http-request="handleChange"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text"><em>点击</em>或者拖拽文件到此区域</div>
      <template #tip>
        <div class="el-upload__tip">Swagger数据导入 (支持v2.0+)</div>
        <a :href="'data:text/json;charset=urf-8,' + dome" download="模板.yaml" color="blueGray"
          >下载模板(请遵循模板格式)</a
        >
      </template>
    </el-upload>
  </el-dialog>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue"
import { FormInstance } from "element-plus"
import { ref } from "vue"
import { uploadFile } from "@/api/team/personal-space/import-interface"
import { ElMessage } from "element-plus"
// import { getDomeDataApi } from "@/api/table/index"
import axios from "axios"
import { getToken } from "@/utils/cache/cookies"

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const emit = defineEmits(["initData"])
const titleName = ref("")
const projectId = ref<string>("") //接口id

// 显示弹窗
const show = async (obj: { id?: number; title: string; projectId: string }) => {
  titleName.value = obj.title
  projectId.value = obj.projectId
  dialogVisible.value = true
  getDome()
}
// 关闭事件
const close = () => {
  formRef.value?.resetFields()
  emit("initData")
  dialogVisible.value = false
}

const dome = ref<string>("")

const getDome = () => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  }
  axios.get("http://47.99.59.29:3000/download/template", config).then((res: any) => {
    dome.value = res.data
  })
  // getDomeDataApi().then((res: any) => {
  //   console.log(res)
  // })
}

// 专题图上传
const handleChange: any = (file: any) => {
  const form = new FormData()
  form.append("projectId", projectId.value)
  form.append("swaggerFile", file.file)
  uploadFile(form)
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage.success(res.message)
        emit("initData")
        dialogVisible.value = false
      }
    })
    .finally(() => {})
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
