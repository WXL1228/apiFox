<!-- eslint-disable vue/valid-v-for -->
<template>
  <el-dialog
    :fullscreen="true"
    :title="titleName"
    width="90%"
    v-model="dialogVisible"
    @close="close"
    :destroy-on-close="true"
  >
    <el-form-item label="项目名称/ID:">{{ projectStore.projectName }}--------{{ projectStore.projectId }}</el-form-item>
    <el-form-item label="接口名称/ID:">{{ interfaceName }}--------{{ interfaceId }}</el-form-item>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="预览" name="first"
        ><el-descriptions size="large" :border="true" title="基本信息">
          <el-descriptions-item label="接口名称:">{{ formData.name }}</el-descriptions-item
          ><el-descriptions-item label="接口路径:">{{ formData.url }}</el-descriptions-item
          ><el-descriptions-item label="请求方法:">{{ formData.method }}</el-descriptions-item
          ><el-descriptions-item label="状态:">
            <el-tag size="small">开发中</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="最近更新成员ID:">{{ update_by }}</el-descriptions-item>
          <el-descriptions-item label="最近更新时间:">{{ update_time }}</el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions size="large" :border="true" title="Mock服务">
          <el-descriptions-item label="Mock地址:">{{ [0] }}</el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions size="large" :border="true" title="返回数据">
          <el-descriptions-item><el-input v-model="v_input" /></el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <el-tab-pane label="编辑" name="second">
        <el-descriptions size="large" title="基本设置">
          <el-descriptions-item
            ><el-form ref="formRef" label-width="100px" :model="formData" :rules="rules">
              <el-form-item label="接口名称：" prop="name">
                <el-input v-model="formData.name" placeholder="请输入接口名称" />
              </el-form-item>
              <el-form-item label="接口地址：" prop="url">
                <el-input v-model="formData.url" placeholder="请输入接口地址"
                  ><template #prepend>http://</template></el-input
                >
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
          </el-descriptions-item>
        </el-descriptions>
        <el-divider />

        <el-descriptions size="large" :border="true" title="请求参数设置">
          <el-descriptions-item label="Query"
            ><el-form :model="ruleForm" status-icon ref="formRef_1" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" @click="addQueryConfig">添加Query参数</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="item in ruleForm.QueryConfig">
                <el-col :span="4">
                  <el-form-item label="参数名称" prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="Query参数" prop="'is_have' + index">
                    <el-select v-model="item.is_have" class="m-2" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="参数格式" prop="'format' + index">
                    <el-select v-model="item.format" class="m-2" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="参数示例" prop="'dome' + index">
                    <el-input type="text" v-model="item.dome" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注" prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeQueryConfig(item)" />
                </el-col>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>
        <el-descriptions size="large" :border="true">
          <el-descriptions-item label="Body*">
            <el-form :model="ruleForm_1" status-icon ref="formRef_2" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" @click="addBodyConfig">添加Body*参数</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="item in ruleForm_1.BodyConfig">
                <el-col :span="4">
                  <el-form-item label="参数名称" prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="Body参数" prop="'is_have' + index">
                    <el-select v-model="item.is_have" class="m-2" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="参数格式" prop="'format' + index">
                    <el-select v-model="item.format" class="m-2" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="参数示例" prop="'dome' + index">
                    <el-input type="text" v-model="item.dome" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注" prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeBodyConfig(item)" />
                </el-col>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions size="large" title="返回数据设置" />
        <el-radio-group v-model="radio" @change="setFlag">
          <el-radio :label="3">JSON</el-radio>
          <el-radio :label="6">XML</el-radio>
          <el-radio :label="9">HTML</el-radio>
          <el-radio :label="12">RAW</el-radio>
        </el-radio-group>
        <el-descriptions v-if="flag" size="large" :border="true">
          <el-descriptions-item label="模板">
            <el-form :model="ruleForm_2" status-icon ref="formRef_3" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button size="small" round>导入JSON/SMl</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="item in ruleForm_2.returnConfig">
                <el-col :span="4">
                  <el-form-item prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="根节点" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="'is_have' + index">
                    <el-select v-model="item.is_have" class="m-2" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="'format' + index">
                    <el-select v-model="item.format" class="m-2" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_2" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="'http_dome' + index">
                    <el-input
                      type="text"
                      v-model="item.http_dome"
                      autocomplete="off"
                      maxlength="50"
                      placeholder="http状态码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" placeholder="备注" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="success" :icon="Plus" circle @click="addReturnConfig" />
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeReturnConfig(item)" />
                </el-col>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>

        <el-descriptions v-if="!flag" size="large" :border="true">
          <el-descriptions-item label="预览"><el-input v-model="v_input" /></el-descriptions-item>
        </el-descriptions>

        <el-divider />
        <div class="windi-flex-center">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="运行" name="third">运行</el-tab-pane>
      <el-tab-pane label="Mock" name="fourth">Mock</el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRules, ElInput, FormInstance, ElMessage, TabsPaneContext } from "element-plus"
import { reactive, ref, toRefs } from "vue"
import { updateInterfaceDataApi } from "@/api/table/index"
import { CreateInterfaceRequestData } from "@/api/table/types/table"
import { useProjectStore } from "@/store/modules/personal-space"
import { getInterfaceDetailApi } from "@/api/table/index"
import { Delete, Plus } from "@element-plus/icons-vue"
// 参数声明
const formRef_1 = ref(null)
const state = reactive({
  ruleForm: {
    QueryConfig: [
      {
        name: "",
        is_have: "",
        format: "",
        dome: "",
        remark: ""
      }
    ]
  }
})
console.log(state.ruleForm.QueryConfig)

const addQueryConfig = () => {
  state.ruleForm.QueryConfig.push({
    name: "",
    is_have: "",
    format: "",
    dome: "",
    remark: ""
  })
}

const removeQueryConfig = (item: any) => {
  const index = state.ruleForm.QueryConfig.indexOf(item)
  if (index !== -1) {
    state.ruleForm.QueryConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm } = {
  ...toRefs(state)
}

const formRef_2 = ref(null)
const state_1 = reactive({
  ruleForm_1: {
    BodyConfig: [
      {
        name: "",
        is_have: "",
        format: "",
        dome: "",
        remark: ""
      }
    ]
  }
})
console.log(state_1.ruleForm_1.BodyConfig)

const addBodyConfig = () => {
  state_1.ruleForm_1.BodyConfig.push({
    name: "",
    is_have: "",
    format: "",
    dome: "",
    remark: ""
  })
}

const removeBodyConfig = (item: any) => {
  const index = state_1.ruleForm_1.BodyConfig.indexOf(item)
  if (index !== -1) {
    state_1.ruleForm_1.BodyConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_1 } = {
  ...toRefs(state_1)
}

const formRef_3 = ref(null)
const state_2 = reactive({
  ruleForm_2: {
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
console.log(state_2.ruleForm_2.returnConfig)

const addReturnConfig = () => {
  state_2.ruleForm_2.returnConfig.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: ""
  })
}

const removeReturnConfig = (item: any) => {
  const index = state_2.ruleForm_2.returnConfig.indexOf(item)
  if (index !== -1) {
    state_2.ruleForm_2.returnConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_2 } = {
  ...toRefs(state_2)
}

const projectStore = useProjectStore()

const options = [
  {
    value: "必需",
    label: "必需"
  },
  {
    value: "非必需",
    label: "非必需"
  }
]

const options_1 = [
  {
    value: "string",
    label: "string"
  },
  {
    value: "number",
    label: "number"
  },
  {
    value: "array",
    label: "array"
  },
  {
    value: "integer",
    label: "integer"
  }
]

const options_2 = [
  {
    value: "string",
    label: "string"
  },
  {
    value: "integer",
    label: "integer"
  },
  {
    value: "boolean",
    label: "boolean"
  },
  {
    value: "array",
    label: "array"
  },
  {
    value: "object",
    label: "object"
  },
  {
    value: "number",
    label: "number"
  },
  {
    value: "null",
    label: "null"
  },
  {
    value: "any",
    label: "any"
  }
]

const flag = ref<boolean>()
const activeName = ref("first")
const radio = ref(4)
const setFlag = () => {
  console.log(radio.value)
  if (radio.value === 3 || radio.value === 6) flag.value = true
  else flag.value = false
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

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
const interfaceId = ref("") //接口id
const interfaceName = ref("") //接口name
const update_by = ref<string>()
const update_time = ref<String>()
const v_input = ref<string>()

// 规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: "接口名称不能为空！", trigger: "change" }],
  url: [{ required: true, message: "接口地址不能为空！", trigger: "change" }],
  method: [{ required: true, message: "请求方法不能为空！", trigger: "change" }]
})

// 显示弹窗
const show = async (obj: { id?: number; title: string; detailMsg?: DetailMsg }) => {
  titleName.value = obj.title
  if (obj.detailMsg) {
    interfaceId.value = obj.detailMsg._id
    interfaceName.value = obj.detailMsg.name
    // console.log(interfaceId.value)
    formData.value.projectId = obj.detailMsg.projectId
    formData.value.name = obj.detailMsg.name
    formData.value.url = obj.detailMsg.url
    formData.value.method = obj.detailMsg.http_method
    formData.value.query = obj.detailMsg.query
    formData.value.body = obj.detailMsg.body
    // console.log(formData.value.responseData)
    // console.log(obj.detailMsg.response_data)
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
  getInterfaceDetailApiFun(interfaceId.value)
}

const getInterfaceDetailApiFun = (data: string) => {
  if (interfaceId.value === "") return
  const params = {
    interfaceId: data
  }
  getInterfaceDetailApi(params).then((res: any) => {
    if (res.code === 200) {
      update_by.value = res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].update_by
      update_time.value = new Date(
        +new Date(res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].update_time) +
          8 * 3600 * 1000
      )
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "")
    }
  })
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
  // console.log(isAdd.value)
  // console.log(projectStore.projectId)
  // console.log(formData.value)
  // console.log(formData.value.name)
  formRef.value?.validate((valid) => {
    if (valid) {
      updateTableDataApiFun()

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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
