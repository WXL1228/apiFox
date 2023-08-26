<template>
  <el-dialog :title="titleName" width="60%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form-item label="名称:">{{ name }}</el-form-item>
    <div class="demo-collapse">
      <el-collapse>
        <el-collapse-item title="项目名称" name="2">
          <div>
            {{ name }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="项目描述" name="3">
          <div>
            {{ description }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="创建时间" name="5">
          <div>
            {{ created_time }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div></el-dialog
  >
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus"
import { ref } from "vue"
import { getTableDetailApi } from "@/api/dashboard/index"

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const emit = defineEmits(["initData"])
const titleName = ref("")
const isAdd = ref(true)
const ID = ref<string>("")
const projects = ref<object[]>()
const name = ref<object>()
const description = ref<string>()
const created_by = ref<string>()
const created_time = ref<string>()

// 显示弹窗
const show = async (obj: { id: number; title: string; isAdd: boolean; item: string }) => {
  titleName.value = obj.title
  isAdd.value = obj.isAdd
  ID.value = obj.item
  dialogVisible.value = true

  getTableDetailApiFun(obj.item)
}

const getTableDetailApiFun = (data: string) => {
  const params = {
    projectId: data
  }
  getTableDetailApi(params).then((res: any) => {
    if (res.code === 200) {
      projects.value = res.data.project
      name.value = res.data.project.name
      description.value = res.data.project.description
      created_by.value = res.data.project.created_by
      created_time.value = new Date(+new Date(res.data.project.created_time) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "")
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
