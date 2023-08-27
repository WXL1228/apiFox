<template>
  <div class="app-container flex-wrap min-h-27/28 bg-white accent-inherit m-20px">
    <div class="windi-wh-full text-[50px] text-center font-sans" m-50px>API接口管理平台(eapulis)</div>
    <!-- <div class="h-600px min-w-full" /> -->
    <div class="h-100px min-w-full mt-300px">
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

// 我的项目
const createProject = () => {
  router.push({ path: "/team" })
}

// // get 请求  delete一样  只是get换delete  
// import axios from "axios"
// import { getToken } from "@/utils/cache/cookies"
// const initData = () => {
//   const token = getToken()
//   const id = "64e73476050867165909ba8d"
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }

//   axios
//     .get(`http://47.99.59.29:3001/ ${id}/1`, config)
//     .then((res) => {
//       console.log(res.data)
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// }

// // post请求  put一样 只是post换put
// import axios from "axios"
// import { getToken } from "@/utils/cache/cookies"
// const initData = () => {
//   const token = getToken()
//   const id = "64e73476050867165909ba8d"
//   const postData = {
//     //  传值信息
//   }

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }

//   axios
//     .get(`http://47.99.59.29:3001/ ${id}/1`, postData, config)
//     .then((res) => {
//       console.log(res.data)
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// }
</script>

<style scoped lang="scss"></style>
