<template>
  <div class="app-container flex-wrap min-h-27/28 bg-white accent-inherit m-20px">
    <div class="windi-wh-full text-[50px] text-center font-sans" m-50px>API接口管理平台(eapulis)</div>
    <div class="h-600px min-w-full" />
    <div class="h-100px min-w-full">
      <div class="w-300px h-100px m-auto">
        <el-button type="primary" style="width: 100%; height: 100%; font-size: xx-large" @click="createProject"
          >我的项目</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

// 创建项目
const createProject = () => {
  router.push({ path: "/team" })
}
</script>

<style scoped lang="scss"></style>
