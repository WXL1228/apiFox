<!-- eslint-disable vue/valid-v-for -->
<template>
  <el-dialog :title="titleName" width="60%" v-model="dialogVisible" :destroy-on-close="true">
    <div @click.left="changePosition">
      <json-editor-vue
        v-model="isJson"
        class="editor"
        :show-btns="true"
        :expandedOnStart="false"
        language="zh-cn"
        :style="{ height: '300px', overflowX: 'hidden', overflowY: 'auto' }"
      />
    </div>
    <template #footer>
      <div class="windi-flex-center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </template></el-dialog
  >
</template>

<script setup lang="ts">
// import { FormInstance } from "element-plus"
import { ref } from "vue"
import JsonEditorVue from "json-editor-vue3" // 导入模块
import { ElMessage } from "element-plus"

const emit = defineEmits(["initData"])

const dialogVisible = ref(false)

const titleName = ref("")
const isJson = ref("")

// 显示弹窗
const show = async (obj: { id?: number; title: string }) => {
  titleName.value = obj.title

  dialogVisible.value = true
}

const save = () => {
  // console.log(isJson.value)
  emit("initData", isJson.value)
  // console.log(11111, isJson.value)
  if (isJson.value === "") {
    ElMessage.error("请输入json字符")
  } else {
    dialogVisible.value = false
  }
}

const changePosition = () => {
  console.log(11111, isJson.value)
  // emit("initData", isJson.value)
}

defineExpose({
  show
})
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
