<template>
  <el-dialog :title="titleName" width="40%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form ref="formRef" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="接口名称：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入接口名称" />
      </el-form-item>
      <el-form-item label="接口地址：" prop="url">
        <el-input v-model="formData.url" placeholder="/path" />
      </el-form-item>
      <el-form-item label="请求方法：" prop="method">
        <div>
          <el-radio-group v-model="formData.method">
            <el-radio-button label="GET" />
            <el-radio-button label="POST" />
            <el-radio-button label="PUT" />
            <el-radio-button label="DELETE" />
          </el-radio-group>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="windi-flex-center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRules, ElInput, FormInstance, ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import { createInterfaceDataApi, updateInterfaceDataApi } from "@/api/table/index"
import { CreateInterfaceRequestData } from "@/api/table/types/table"
import { useProjectStore } from "@/store/modules/personal-space"

const projectStore = useProjectStore()

interface DetailMsg {
  projectId: string
  name: string
  url: string
  http_method: "GET" | "POST" | "PUT" | "DELETE"
  query: object
  body: object
  response_data: object
  __v: number | null
  _id: string
}

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const emit = defineEmits(["initData"])
const formData = ref<CreateInterfaceRequestData>({
  projectId: projectStore.projectId,
  name: "",
  url: "",
  method: "GET",
  query: {},
  body: {},
  responseData: {}
})
const titleName = ref("")
const isAdd = ref(true)
const interfaceId = ref("") //接口id

// 规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: "接口名称不能为空！", trigger: "change" }],
  url: [{ required: true, message: "接口地址不能为空！", trigger: "change" }],
  method: [{ required: true, message: "请求方法不能为空！", trigger: "change" }]
})

// 显示弹窗
const show = async (obj: { id?: number; title: string; isAdd: boolean; detailMsg?: DetailMsg }) => {
  titleName.value = obj.title
  isAdd.value = obj.isAdd
  if (obj.detailMsg) {
    interfaceId.value = obj.detailMsg._id
    formData.value.projectId = obj.detailMsg.projectId
    formData.value.name = obj.detailMsg.name
    formData.value.url = obj.detailMsg.url
    formData.value.method = obj.detailMsg.http_method
    formData.value.query = obj.detailMsg.query
    formData.value.body = obj.detailMsg.body
    formData.value.responseData = obj.detailMsg.response_data
  } else {
    formData.value.name = ""
    formData.value.url = ""
    formData.value.method = "GET"
    formData.value.query = {}
    formData.value.body = {}
    formData.value.responseData = {}
  }
  dialogVisible.value = true
}

// 跳转项目页
import { useRouter } from "vue-router"
const router = useRouter()
const detail = () => {
  emit("initData")
  router.push({
    name: "Personal-Space"
  })
}

// 保存信息
const save = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        createTableDataApiFun()
      } else {
        updateTableDataApiFun()
      }
      emit("initData")
      dialogVisible.value = false
    }
  })
  emit("initData")
}
// 关闭事件
const close = () => {
  formRef.value?.resetFields()
  emit("initData")
  dialogVisible.value = false
}

//创建接口
const createTableDataApiFun = () => {
  if (projectStore.projectId === "") {
    ElMessage.error("请选择项目")
    return
  }
  const params = {
    projectId: projectStore.projectId,
    name: formData.value.name,
    url: "127.0.0.1" + formData.value.url,
    method: formData.value.method,
    query: [{ name: "", is_have: "", format: "", dome: "", remark: "" }],
    body: [{ name: "", is_have: "", format: "", dome: "", remark: "" }],
    responseData: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: [
                              {
                                name: "",
                                is_have: "",
                                format: "",
                                http_dome: "",
                                remark: "",
                                node: [
                                  {
                                    name: "",
                                    is_have: "",
                                    format: "",
                                    http_dome: "",
                                    remark: "",
                                    node: [
                                      {
                                        name: "",
                                        is_have: "",
                                        format: "",
                                        http_dome: "",
                                        remark: "",
                                        node: [
                                          {
                                            name: "",
                                            is_have: "",
                                            format: "",
                                            http_dome: "",
                                            remark: "",
                                            node: [
                                              {
                                                name: "",
                                                is_have: "",
                                                format: "",
                                                http_dome: "",
                                                remark: "",
                                                node: []
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

  createInterfaceDataApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.message)
      formData.value.name = ""
      formData.value.url = ""
      formData.value.method = "GET"
      formData.value.query = []
      formData.value.body = []
      formData.value.responseData = []
      emit("initData")
      detail()
    }
  })
}

//修改接口
const updateTableDataApiFun = () => {
  if (projectStore.projectId === "") {
    ElMessage.error("请选择项目")
    return
  }
  const params = {
    interfaceId: interfaceId.value,
    name: formData.value.name,
    url: formData.value.url,
    method: formData.value.method,
    query: formData.value.query,
    responseData: formData.value.responseData,
    body: formData.value.body
  }
  updateInterfaceDataApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.message)
      emit("initData")
      detail()
    }
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
