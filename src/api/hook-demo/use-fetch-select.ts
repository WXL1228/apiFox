/** 模拟接口响应数据 */
const SELECT_RESPONSE_DATA = {
  code: 200,
  data: [
    {
      label: "1 ~ 10000",
      value: Math.floor(Math.random() * 10000 + 1)
    },
    {
      label: "1 ~ 10000",
      value: Math.floor(Math.random() * 10000 + 1)
    },
    {
      label: "1 ~ 10000",
      value: Math.floor(Math.random() * 10000 + 1),
      disabled: true
    }
  ],
  message: "获取 1 ~ 1000 随机数据成功！",
  info: ""
}

/** 模拟接口 */
export function getSelectDataApi() {
  return new Promise<typeof SELECT_RESPONSE_DATA>((resolve, reject) => {
    // 模拟接口响应时间 2s
    setTimeout(() => {
      // 模拟接口调用成功
      if (Math.random() < 0.8) {
        resolve(SELECT_RESPONSE_DATA)
      } else {
        // 模拟接口调用出错
        reject(new Error("接口发生错误"))
      }
    }, 2000)
  })
}
