<template>
  <el-dialog :title="titleName" width="60%" v-model="dialogVisible" @close="close" :destroy-on-close="true">
    <el-form-item label="ID:">{{ ID }}</el-form-item>
    <div class="demo-collapse">
      <el-collapse>
        <el-collapse-item title="接口详情" name="1">
          <div>{{ interfaceDerail }}</div>
        </el-collapse-item>
        <el-collapse-item title="接口当前版本" name="2">
          <div>
            {{ currentVersion }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="当前接口所有版本信息" name="3">
          <div>
            {{ interfaces }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="接口信息" name="4">
          <div>{{ interface1 }}</div>
        </el-collapse-item>
        <el-collapse-item title="接口名称" name="5">
          <div>
            {{ name }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="接口地址" name="6">
          <div>
            {{ url }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="请求方法" name="7">
          <div>
            {{ http_method }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="请求参数格式" name="8">
          <div>
            {{ query }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="请求体格式" name="9">
          <div>
            {{ body }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="返回数据格式" name="10">
          <div>
            {{ response_data }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="最新更新接口的用户ID" name="11">
          <div>{{ update_by }}}</div>
        </el-collapse-item>
        <el-collapse-item title="最新接口更新时间" name="12">
          <div>
            {{ update_time }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div></el-dialog
  >
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus"
import { ref } from "vue"
import { getInterfaceDetailApi } from "@/api/table/index"

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const emit = defineEmits(["initData"])
const titleName = ref("")
const isAdd = ref(true)
const ID = ref<string>("")
const interfaceDerail = ref<object>()
const currentVersion = ref<number>()
const interfaces = ref<object[]>()
const interface1 = ref<object>()
const name = ref<string>()
const url = ref<string>()
const http_method = ref<string>()
const query = ref<object>()
const body = ref<object>()
const response_data = ref<object>()
const update_by = ref<string>()
const update_time = ref<String>()

// 显示弹窗
const show = async (obj: { id: number; title: string; isAdd: boolean; item: string }) => {
  titleName.value = obj.title
  isAdd.value = obj.isAdd
  ID.value = obj.item
  console.log(ID.value)
  dialogVisible.value = true

  getInterfaceDetailApiFun(obj.item)
}

const getInterfaceDetailApiFun = (data: string) => {
  if (ID.value === "") return
  const params = {
    interfaceId: data
  }
  getInterfaceDetailApi(params).then((res: any) => {
    if (res.code === 200) {
      interfaceDerail.value = res.data.interfaceDetail
      currentVersion.value = res.data.interfaceDetail.current_version
      interfaces.value = res.data.interfaceDetail.interfaces
      interface1.value = res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1]
      update_by.value = res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].update_by
      update_time.value = new Date(
        +new Date(res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].update_time) +
          8 * 3600 * 1000
      )
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "")
      name.value = res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.name
      url.value = res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.url
      http_method.value =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.http_method
      query.value = res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.query
      response_data.value =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data
      body.value = res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.body
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
