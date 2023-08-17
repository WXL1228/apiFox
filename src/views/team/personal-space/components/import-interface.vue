<template>
  <el-dialog :title="titleName" width="40%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form-item label="项目ID:">{{ projectId }}</el-form-item>
    <el-upload class="upload-demo" drag action="" multiple>
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

// 跳转项目页
// import { useRouter } from "vue-router"
// const router = useRouter()
// const detail = () => {
//   emit("initData")
//   router.push({
//     name: "Personal-Space"
//   })
// }

// 保存信息
// const save = () => {
//   formRef.value?.validate((valid) => {})
//   emit("initData")
// }
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
