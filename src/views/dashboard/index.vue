<template>
  <div class="app-container windi-flex-center flex-wrap min-h-full bg-white accent-inherit m-20px">
    <div class="windi-wh-full text-[50px] text-center font-sans">api接口管理平台(eapulis)</div>
    <div class="w-300px h-100px">
      <el-button
        type="primary"
        style="width: 100% !important; height: 100% !important ; font-size: xx-large !important"
        @click="createProject"
        >我的项目</el-button
      >
    </div>
    <EditDialog ref="editDialogRef" @initData="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import EditDialog from "./components/edit-dialog.vue"
import { useRouter } from "vue-router"

const editDialogRef = ref<InstanceType<typeof EditDialog>>()
const router = useRouter()

// 创建项目
const createProject = () => {
  router.push({ path: "/team" })
}
const getList = () => {}
</script>

<style scoped lang="scss"></style>
