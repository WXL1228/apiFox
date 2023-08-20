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
      <el-tab-pane label="编辑" name="first">
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
                  <el-form-item label="参数名称:" prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="是/否必填:" prop="'is_have' + index">
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="参数类型:" prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="参数示例:" prop="'dome' + index">
                    <el-input type="text" v-model="item.dome" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注:" prop="'remark' + index">
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
                  <el-form-item label="参数名称:" prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="是/否必填:" prop="'is_have' + index">
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="参数类型:" prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="参数示例:" prop="'dome' + index">
                    <el-input type="text" v-model="item.dome" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注:" prop="'remark' + index">
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
                    <el-button size="small" round>导入JSON/XML</el-button>
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
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
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
                      placeholder="中文名"
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
          <el-button type="warning" @click="clear_1">清空(参数信息))</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="运行" name="second">
        <el-divider />
        <div class="mt-4">
          <el-input v-model="urlRunConfig" disabled prefix placeholder="/" class="input-with-select">
            <template #prepend>
              <el-select v-model="methodRun" disabled placeholder="Method" style="width: 220px" />
            </template>
            <template #append>
              <el-select v-model="RunData" disabled placeholder="Method" style="width: 1020px" />
            </template>
          </el-input>
        </div>
        <el-divider />
        <div>
          <el-radio-group v-model="radio1" size="large" @change="setFlag1">
            <el-radio-button label="Headers" />
            <el-radio-button label="Cookies" />
            <el-radio-button label="Params" />
            <el-radio-button label="Body" />
          </el-radio-group>
        </div>
        <el-form
          v-if="flag_1 === 1"
          :model="ruleForm_3"
          status-icon
          ref="formRef_4"
          label-width="100px"
          style="margin-top: 20px"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>参数名 (Headers) </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item> 类型 (Headers) </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item> 参数值 (Headers) </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item> 说明 (Headers) </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="success" :icon="Plus" circle @click="addHeadersConfig" />
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="item in ruleForm_3.HeadersConfig">
            <el-col :span="4">
              <el-form-item prop="'name' + index">
                <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="添加参数" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="'format' + index">
                <el-select v-model="item.format" autocomplete="off" placeholder="string">
                  <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="'value' + index">
                <el-input type="text" v-model="item.value" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="'remark' + index">
                <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" :icon="Delete" circle @click.prevent="removeHeadersConfig(item)" />
            </el-col>
          </el-row>
        </el-form>
        <el-form
          v-if="flag_1 === 2"
          :model="ruleForm_4"
          status-icon
          ref="formRef_5"
          label-width="100px"
          style="margin-top: 20px"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>参数名 (Cookies) </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item> 类型 (Cookies) </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item> 参数值 (Cookies) </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item> 说明 (Cookies) </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="success" :icon="Plus" circle @click="addCookiesConfig" />
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="item in ruleForm_4.CookiesConfig">
            <el-col :span="4">
              <el-form-item prop="'name' + index">
                <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="添加参数" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="'format' + index">
                <el-select v-model="item.format" autocomplete="off" placeholder="string">
                  <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="'value' + index">
                <el-input type="text" v-model="item.value" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="'remark' + index">
                <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" :icon="Delete" circle @click.prevent="removeCookiesConfig(item)" />
            </el-col>
          </el-row>
        </el-form>
        <el-form
          v-if="flag_1 === 3"
          :model="ruleForm_5"
          status-icon
          ref="formRef_6"
          label-width="100px"
          style="margin-top: 20px"
          @change="checkParams"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>参数名 (Params) </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item> 类型 (Params) </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item> 参数值 (Params) </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item> 说明 (Params) </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="success" :icon="Plus" circle @click="addParamsConfig" />
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="item in ruleForm_5.ParamsConfig">
            <el-col :span="4">
              <el-form-item prop="'name' + index">
                <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="添加参数" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="'format' + index">
                <el-select v-model="item.format" autocomplete="off" placeholder="string">
                  <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="'value' + index">
                <el-input type="text" v-model="item.value" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="'remark' + index">
                <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" :icon="Delete" circle @click.prevent="removeParamsConfig(item)" />
            </el-col>
          </el-row>
        </el-form>
        <el-form
          v-if="flag_1 === 4"
          :model="ruleForm_6"
          status-icon
          ref="formRef_7"
          label-width="100px"
          style="margin-top: 20px"
          @change="checkBody"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>参数名 (Body) </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item> 类型 (Body) </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item> 参数值 (Body) </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item> 说明 (Body) </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="success" :icon="Plus" circle @click="addBody1Config" />
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="item in ruleForm_6.BodyConfig">
            <el-col :span="4">
              <el-form-item prop="'name' + index">
                <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="添加参数" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="'format' + index">
                <el-select v-model="item.format" autocomplete="off" placeholder="string">
                  <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="'value' + index">
                <el-input type="text" v-model="item.value" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="'remark' + index">
                <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" :icon="Delete" circle @click.prevent="removeBody1Config(item)" />
            </el-col>
          </el-row>
        </el-form>
        <el-divider />
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span style="font-size: large">Response (预览HTML)</span>
            </div>
          </template>
          <el-descriptions>
            <el-descriptions-item label="Body">
              <textarea rows="19" disabled style="width: 100%; resize: vertical" :v-model="formData.body" />
            </el-descriptions-item>
            <el-descriptions-item label="Headers">
              <textarea rows="19" disabled style="width: 100%; resize: vertical">[0]</textarea>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-divider />
        <el-button @click="clear">重置</el-button>
        <el-button type="warning" @click="sendData">发送</el-button>
      </el-tab-pane>
      <el-tab-pane label="Mock(高级)" name="third"
        ><el-descriptions title="接口参数信息" :column="2">
          <el-descriptions-item label="Headers">
            <textarea rows="15" disabled style="width: 100%; resize: vertical">[0]</textarea>
          </el-descriptions-item>
          <el-descriptions-item label="Cookies">
            <textarea rows="15" disabled style="width: 100%; resize: vertical">[0]</textarea>
          </el-descriptions-item>
          <el-descriptions-item label="body">
            <textarea rows="15" disabled style="width: 100%; resize: vertical">[0]</textarea>
          </el-descriptions-item>
          <el-descriptions-item label="query">
            <textarea rows="15" disabled style="width: 100%; resize: vertical">[0]</textarea>
          </el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions title="Mock服务" :column="1">
          <el-descriptions-item label="Mock地址:">{{ mockUrl }}</el-descriptions-item>
        </el-descriptions> </el-tab-pane
      ><el-tab-pane label="预览" name="fourth"
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
          <el-descriptions-item label="Mock地址:">{{ mockUrl }}</el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions size="large" :border="true" title="返回数据">
          <el-descriptions-item>
            <textarea disabled rows="27" style="width: 100%; resize: vertical">[0]</textarea>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRules, ElInput, FormInstance, ElMessage, TabsPaneContext } from "element-plus"
import { reactive, ref, toRefs } from "vue"
import { updateInterfaceDataApi, MockInterfaceDetailApi } from "@/api/table/index"
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

const formRef_4 = ref(null)
const state_3 = reactive({
  ruleForm_3: {
    HeadersConfig: [
      {
        name: "",
        value: "",
        format: "",
        remark: ""
      }
    ]
  }
})
console.log(state_3.ruleForm_3.HeadersConfig)

const addHeadersConfig = () => {
  state_3.ruleForm_3.HeadersConfig.push({
    name: "",
    value: "",
    format: "",
    remark: ""
  })
}

const removeHeadersConfig = (item: any) => {
  const index = state_3.ruleForm_3.HeadersConfig.indexOf(item)
  if (index !== -1) {
    state_3.ruleForm_3.HeadersConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_3 } = {
  ...toRefs(state_3)
}

const formRef_5 = ref(null)
const state_4 = reactive({
  ruleForm_4: {
    CookiesConfig: [
      {
        name: "",
        value: "",
        format: "",
        remark: ""
      }
    ]
  }
})
console.log(state_4.ruleForm_4.CookiesConfig)

const addCookiesConfig = () => {
  state_4.ruleForm_4.CookiesConfig.push({
    name: "",
    value: "",
    format: "",
    remark: ""
  })
}

const removeCookiesConfig = (item: any) => {
  const index = state_4.ruleForm_4.CookiesConfig.indexOf(item)
  if (index !== -1) {
    state_4.ruleForm_4.CookiesConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_4 } = {
  ...toRefs(state_4)
}

const formRef_7 = ref(null)
const state_6 = reactive({
  ruleForm_6: {
    BodyConfig: [
      {
        name: "",
        value: "",
        format: "",
        remark: ""
      }
    ]
  }
})
console.log(state_6.ruleForm_6.BodyConfig)

const addBody1Config = () => {
  state_6.ruleForm_6.BodyConfig.push({
    name: "",
    value: "",
    format: "",
    remark: ""
  })
}

const removeBody1Config = (item: any) => {
  const index = state_6.ruleForm_6.BodyConfig.indexOf(item)
  if (index !== -1) {
    state_6.ruleForm_6.BodyConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_6 } = {
  ...toRefs(state_6)
}

const formRef_6 = ref(null)
const state_5 = reactive({
  ruleForm_5: {
    ParamsConfig: [
      {
        name: "",
        value: "",
        format: "",
        remark: ""
      }
    ]
  }
})
console.log(state_5.ruleForm_5.ParamsConfig)

const addParamsConfig = () => {
  state_5.ruleForm_5.ParamsConfig.push({
    name: "",
    value: "",
    format: "",
    remark: ""
  })
}

const removeParamsConfig = (item: any) => {
  const index = state_5.ruleForm_5.ParamsConfig.indexOf(item)
  if (index !== -1) {
    state_5.ruleForm_5.ParamsConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_5 } = {
  ...toRefs(state_5)
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

const flag = ref<boolean>(true)
const flag_1 = ref<number>(4)
const activeName = ref("first")
const radio = ref()
const radio1 = ref("Body")
const setFlag = () => {
  console.log(radio.value)
  if (radio.value === 3 || radio.value === 6) flag.value = true
  else flag.value = false
}
const setFlag1 = () => {
  console.log(flag_1.value)
  if (radio1.value === "Headers") flag_1.value = 1
  else if (radio1.value === "Cookies") flag_1.value = 2
  else if (radio1.value === "Params") flag_1.value = 3
  else flag_1.value = 4
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
const methodRun = ref("")
const urlRunConfig = ref("")
const RunData = ref("/111111")
const mockUrl = ref<string>("")
const formData = ref<CreateInterfaceRequestData>({
  projectId: projectStore.projectId,
  name: "",
  url: "",
  method: "GET",
  query: [],
  body: [],
  responseData: []
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
    urlRunConfig.value = "local: http://" + obj.detailMsg.url
    formData.value.method = obj.detailMsg.http_method
    methodRun.value = obj.detailMsg.http_method
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
  getInterfaceDetailApiFun(interfaceId.value)
  mockConfig()
}

const clear = () => {
  state_4.ruleForm_4.CookiesConfig = [
    {
      name: "",
      value: "",
      format: "",
      remark: ""
    }
  ]
  state_3.ruleForm_3.HeadersConfig = [
    {
      name: "",
      value: "",
      format: "",
      remark: ""
    }
  ]
  state_5.ruleForm_5.ParamsConfig = [
    {
      name: "",
      value: "",
      format: "",
      remark: ""
    }
  ]
  state_6.ruleForm_6.BodyConfig = [
    {
      name: "",
      value: "",
      format: "",
      remark: ""
    }
  ]
  save()
}

const clear_1 = () => {
  state_2.ruleForm_2.returnConfig = [{ name: "", is_have: "", format: "", http_dome: "", remark: "" }]
  state_1.ruleForm_1.BodyConfig = [{ name: "", is_have: "", format: "", dome: "", remark: "" }]
  state.ruleForm.QueryConfig = [{ name: "", is_have: "", format: "", dome: "", remark: "" }]
  radio.value = 0
  save()
}

const sendData = () => {}

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
      state.ruleForm.QueryConfig =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.query
      state_1.ruleForm_1.BodyConfig =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.body
      state_2.ruleForm_2.returnConfig =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data
    }
  })
  mockConfig()
}

const paramFlag = ref<string>("")
//检查Params
const checkParams = () => {
  if (state_5.ruleForm_5.ParamsConfig.length != state.ruleForm.QueryConfig.length) {
    paramFlag.value = "false"
  }
  if (state_5.ruleForm_5.ParamsConfig.length === 0 && state.ruleForm.QueryConfig.length === 0) {
    paramFlag.value = ""
    return
  }
  const max = ref<number>()
  if (state_5.ruleForm_5.ParamsConfig.length >= state.ruleForm.QueryConfig.length) {
    max.value = state_5.ruleForm_5.ParamsConfig.length
  } else {
    max.value = state.ruleForm.QueryConfig.length
  }
  for (let i = 0; i < max.value; i++) {
    if (
      state_5.ruleForm_5.ParamsConfig[i].name === "" ||
      state.ruleForm.QueryConfig[i].name === "" ||
      state_5.ruleForm_5.ParamsConfig[i].format === "" ||
      state.ruleForm.QueryConfig[i].format === ""
    ) {
      paramFlag.value = "false"
      return
    }
    if (
      state_5.ruleForm_5.ParamsConfig[i].name != state.ruleForm.QueryConfig[i].name ||
      state_5.ruleForm_5.ParamsConfig[i].format != state.ruleForm.QueryConfig[i].format
    ) {
      paramFlag.value = "false"
      return
    }
  }
  paramFlag.value = "true"
  console.log(paramFlag.value)
}

const bodyFlag = ref<string>("")
//检查Body
const checkBody = () => {
  if (state_6.ruleForm_6.BodyConfig.length != state_1.ruleForm_1.BodyConfig.length) {
    bodyFlag.value = "false"
  }
  if (state_6.ruleForm_6.BodyConfig.length === 0 && state_1.ruleForm_1.BodyConfig.length === 0) {
    bodyFlag.value = ""
    return
  }
  const max1 = ref<number>()
  if (state_6.ruleForm_6.BodyConfig.length >= state_1.ruleForm_1.BodyConfig.length) {
    max1.value = state_6.ruleForm_6.BodyConfig.length
  } else {
    max1.value = state_1.ruleForm_1.BodyConfig.length
  }
  for (let i = 0; i < max1.value; i++) {
    if (
      state_6.ruleForm_6.BodyConfig[i].name === "" ||
      state_1.ruleForm_1.BodyConfig[i].name === "" ||
      state_6.ruleForm_6.BodyConfig[i].format === "" ||
      state_1.ruleForm_1.BodyConfig[i].format === ""
    ) {
      bodyFlag.value = "false"
      return
    }
    if (
      state_6.ruleForm_6.BodyConfig[i].name != state_1.ruleForm_1.BodyConfig[i].name ||
      state_6.ruleForm_6.BodyConfig[i].format != state_1.ruleForm_1.BodyConfig[i].format
    ) {
      bodyFlag.value = "false"
      return
    }
  }
  bodyFlag.value = "true"
  console.log(bodyFlag.value)
}

// 跳转项目页
const detail = () => {
  emit("initData")
  emit("initData")
}

// 保存信息
const save = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log(state_2.ruleForm_2.returnConfig)
      console.log(state_1.ruleForm_1.BodyConfig)
      console.log(state.ruleForm.QueryConfig)
      console.log()
      updateTableDataApiFun()
      emit("initData")
      emit("initData")
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

// mock
const mockConfig = () => {
  if (projectStore.projectId === "") {
    ElMessage.error("请选择项目")
    return
  }
  const params = {
    interfaceId: interfaceId.value
  }

  MockInterfaceDetailApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.message)
      mockUrl.value = "http://localhost:3333/api/v1" + res.data.mockUrl
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
    query: state.ruleForm.QueryConfig,
    responseData: state_2.ruleForm_2.returnConfig,
    body: state_1.ruleForm_1.BodyConfig
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
