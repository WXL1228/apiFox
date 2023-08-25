import Mock from "mockjs"
export default [
  {
    url: "/api/getInfo",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock([
          {
            label: "String",
            value: "@csentence(5, 50)"
          },
          {
            label: "Integer",
            value: { "number|1-1000": 100 }
          },
          {
            label: "Boolean",
            value: {
              "boolean|1-2": true
            }
          },
          {
            label: "Array",
            value: {
              "PersonList|11": [
                {
                  name: "@cname",
                  "age|12-80": 12,
                  list1: "@csentence(5, 25)",
                  list2: Mock.mock({
                    "number|1-100": 100
                  }),
                  "list3|2-4": [
                    {
                      "item|1": "@csentence(5, 25)"
                    }
                  ]
                }
              ]
            }
          },
          {
            label: "Object",
            value: {
              布尔值: Mock.Random.boolean(),
              整数: Mock.Random.integer(100, 100293),
              小数: Mock.Random.float(1, 34322, 0.0, 0.234),
              字符串: Mock.Random.string(25),
              英文名: Mock.Random.name(),
              中文名: Mock.Random.cname(),
              日期: Mock.Random.date(),
              时间: Mock.Random.time()
            }
          },
          {
            label: "Number",
            value: {
              "number|123.1-10": 1
            }
          },
          {
            label: "Null",
            value: ""
          },
          {
            label: "Any",
            value: "@paragraph()"
          }
        ]),
        message: "获取数据成功！",
        info: ""
      }
    }
  },
  {
    url: "/api/getString",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock("@csentence(5, 50)"),

        info: ""
      }
    }
  },
  {
    url: "/api/getInteger",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          "number|1-1000": 100
        }),

        info: ""
      }
    }
  },
  {
    url: "/api/getBoolean",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          "boolean|1-2": true
        }),

        info: ""
      }
    }
  },
  {
    url: "/api/getArray",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          "PersonList|11": [
            {
              name: "@cname",
              "age|12-80": 12,
              list1: "@csentence(5, 25)",
              list2: Mock.mock({
                "number|1-100": 100
              }),
              "list3|2-4": [
                {
                  "item|1": "@csentence(5, 25)"
                }
              ]
            }
          ]
        }),

        info: ""
      }
    }
  },
  {
    url: "/api/getObject",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          布尔值: Mock.Random.boolean(),
          整数: Mock.Random.integer(100, 100293),
          小数: Mock.Random.float(1, 34322, 0.0, 0.234),
          字符串: Mock.Random.string(25),
          英文名: Mock.Random.name(),
          中文名: Mock.Random.cname(),
          日期: Mock.Random.date(),
          时间: Mock.Random.time()
        }),
        message: "获取 1 ~ 10000 随机数据成功！",
        info: ""
      }
    }
  },
  {
    url: "/api/getNumber",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          "number|123.1-10": 1
        }),
        message: "获取 1 ~ 10000 随机数据成功！",
        info: ""
      }
    }
  },
  {
    url: "/api/getNull",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: "",
        message: "获取 1 ~ 10000 随机数据成功！",
        info: ""
      }
    }
  },
  {
    url: "/api/getAny",
    method: "get",
    response: () => {
      return {
        code: 200,
        data: Mock.mock("@paragraph()"),
        message: "获取 1 ~ 10000 随机数据成功！",
        info: ""
      }
    }
  }
]
