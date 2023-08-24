/** 模拟接口响应数据 */
import { ref } from "vue"
import axios from "axios"

const SELECT_RESPONSE_DATA = {
  code: 200,
  data: {},
  message: "获取数据成功",
  info: ""
}

// /** 模拟接口 */
export function getSelectDataApi(item: any) {
  const data = ref()
  axios.get("/api/getInfo").then((res) => {
    data.value = res.data.data
  })
  const returnData = ref({})
  for (let i = 0; i < item.length; i++) {
    if (item[i].format === "string") {
      axios.get("api/getString").then((res) => {
        returnData.value = Object.assign(returnData.value, { [item[i].name]: res.data.data })
      })
    } else if (item[i].format === "integer") {
      axios.get("api/getInteger").then((res) => {
        returnData.value = Object.assign(returnData.value, { [item[i].name]: res.data.data })
      })
    } else if (item[i].format === "boolean") {
      axios.get("api/getBoolean").then((res) => {
        returnData.value = Object.assign(returnData.value, { [item[i].name]: res.data.data })
      })
    } else if (item[i].format === "array") {
      axios.get("api/getArray").then((res) => {
        returnData.value = Object.assign(returnData.value, { [item[i].name]: res.data.data })
      })
    } else if (item[i].format === "object") {
      axios.get("api/getObject").then((res) => {
        returnData.value = Object.assign(returnData.value, { [item[i].name]: res.data.data })
      })
    } else if (item[i].format === "number") {
      axios.get("api/getNumber").then((res) => {
        returnData.value = Object.assign(returnData.value, { [item[i].name]: res.data.data })
      })
    } else if (item[i].format === "null") {
      axios.get("api/getNull").then((res) => {
        returnData.value = Object.assign(returnData.value, { [item[i].name]: res.data.data })
      })
    } else if (item[i].format === "any") {
      axios.get("api/getAny").then((res) => {
        returnData.value = Object.assign(returnData.value, { [item[i].name]: res.data.data })
      })
    }
  }

  SELECT_RESPONSE_DATA.data = returnData.value
  console.log(returnData.value)
  return new Promise<typeof SELECT_RESPONSE_DATA>((resolve, reject) => {
    // 模拟接口响应时间 2s
    setTimeout(() => {
      // 模拟接口调用成功
      if (Math.random() < 1) {
        resolve(SELECT_RESPONSE_DATA)
      } else {
        // 模拟接口调用出错
        reject(new Error("接口发生错误"))
      }
    }, 2000)
  })
}
