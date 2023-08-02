<script lang="ts" setup>
import { ref } from "vue"
import { Setting } from "@element-plus/icons-vue"

interface Props {
  buttonbottom?: number
}

const props = withDefaults(defineProps<Props>(), {
  buttonbottom: 0
})

const buttonTopCss = props.buttonbottom + "px"
const show = ref(false)
</script>

<template>
  <div class="handle-button" @click="show = true">
    <el-icon :size="24">
      <Setting />
    </el-icon>
  </div>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  width: 38px;
  height: 38px;
  background-color: gainsboro;
  position: fixed;
  bottom: v-bind(buttonTopCss);
  right: 0px;
  border-radius: 6px 0 0 6px;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
