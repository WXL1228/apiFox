<template>
  <div class="app-container">
    <div class="app-text">api接口管理平台(eapulis)</div>
    <div class="app-content">
      <el-button class="el-button" type="primary">创建项目</el-button>
    </div>
  </div>
</template>

<script long="ts" setup></script>

<style scoped>
.app-content {
  width: 300px;
  height: 100px;
  padding: 0px;
}

.el-button {
  width: 100%;
  height: 100%;
  font-size: xx-large;
}
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-color: white;
  accent-color: inherit;
  flex-wrap: wrap;
  margin: 20px;
  box-shadow: 0 0 10px #dcdfe6;
}

.app-text {
  width: 100%;
  height: 250px;
  text-align: center;
  font-size: 50px;
  font-family: sans-serif;
}
</style>
