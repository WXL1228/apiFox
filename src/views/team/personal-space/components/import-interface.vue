<template>
  <el-dialog :title="titleName" width="40%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form-item label="项目ID:"
      >{{ projectId }}
      <el-button class="ml-10px" type="primary" @click="downloadTemplate">下载模板</el-button></el-form-item
    >
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
      </template>
    </el-upload>
  </el-dialog>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue"
import { FormInstance } from "element-plus"
import { ref } from "vue"
import { uploadFile, downLoadFile } from "@/api/team/personal-space/import-interface"
import { ElMessage, ElNotification } from "element-plus"

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
}
// 关闭事件
const close = () => {
  formRef.value?.resetFields()
  emit("initData")
  dialogVisible.value = false
}

// 文件上传
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

// 下载模板
const downloadTemplate = () => {
  ElNotification({
    title: "下载",
    message: "开始执行下载任务...",
    type: "success",
    duration: 3000
  })
  downLoadFile()
    .then((res: any) => {
      const dispositionArr = res.headers["content-disposition"].split("=")
      const fileName = decodeURIComponent(dispositionArr[1])
      const blob: any = new Blob([res.data], {
        type: res.data.type
      })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        URL.revokeObjectURL(blob)
        document.body.removeChild(link)
      }, 0)
    })
    .catch(() => {
      ElMessage.error("下载失败")
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
