<!-- eslint-disable vue/valid-v-for -->
<template>
  <el-dialog :title="titleName" width="60%" v-model="dialogVisible" :destroy-on-close="true">
    <div>
      <json-editor-vue
        v-model="isJson"
        class="editor"
        :show-btns="true"
        :expandedOnStart="false"
        language="zh-cn"
        :style="{ height: '300px', overflowX: 'hidden', overflowY: 'auto' }"
        @blur="validate"
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
import { ref, reactive } from "vue"
import JsonEditorVue from "json-editor-vue3" // 导入模块
import { ElMessage } from "element-plus"

const emit = defineEmits(["initData"])

const dialogVisible = ref(false)

const titleName = ref("")
const isJson = ref("")

const stateJson = reactive({
  ruleForm: {
    returnConfig: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: ""
      }
    ]
  }
})

const validate = async (editor: any) => {
  const res = await editor.validate()
  console.log("----------------")
  if (res.length != 0) {
    errorFlag.value = false
  } else errorFlag.value = true
  console.log(errorFlag.value)
}

// 显示弹窗
const show = async (obj: { id?: number; title: string; detailMsg: any; responseData: any }) => {
  titleName.value = obj.title
  console.log(obj.responseData)
  stateJson.ruleForm.returnConfig = obj.responseData
  console.log(stateJson.ruleForm.returnConfig)
  dialogVisible.value = true
}
const errorFlag = ref<boolean>(true)

const save = () => {
  // console.log(isJson.value)

  emit("initData", isJson.value)
  // console.log(11111, isJson.value)
  if (errorFlag.value) {
    if (isJson.value === "") {
      ElMessage.error("请输入json字符")
    } else {
      const json = ref<string>("")
      json.value = JSON.stringify(isJson.value)
      const string = ref<string[]>([])
      string.value = json.value.split(",")
      console.log(string.value)
      const key = ref<string[]>([])
      for (let i = 0; i < string.value.length; i++) {
        const str = ref<string[]>([])
        str.value = string.value[i].split('"')
        key.value.push(str.value[1])
      }
      for (let i = 0; i < key.value.length; i++) {
        const keyString = ref("")
        const valueString = ref("")
        const isFlag = ref<boolean>(false)
        const typeString = ref("")
        keyString.value = key.value[i]
        valueString.value = (isJson.value as any)[keyString.value]
        typeString.value = typeof (isJson.value as any)[keyString.value]
        for (let j = 0; j < stateJson.ruleForm.returnConfig.length; j++) {
          if (stateJson.ruleForm.returnConfig[j].name === keyString.value) isFlag.value = true
        }
        if (!isFlag.value)
          stateJson.ruleForm.returnConfig.push({
            name: keyString.value,
            is_have: "",
            format: typeString.value,
            http_dome: "",
            remark: ""
          })
      }
      isJson.value = ""
      ElMessage.success("导入成功")
      dialogVisible.value = false
    }
  } else {
    ElMessage.error("输入非法！")
  }
}

// const changePosition = () => {
//   console.log(errorFlag.value)
//   // emit("initData", isJson.value)
// }

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
