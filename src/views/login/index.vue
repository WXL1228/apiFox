<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div class="title">
        <h1>api接口平台</h1>
      </div>
      <div class="content" v-if="flag">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <div class="flex justify-between">
            <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">登 录</el-button>
            <!-- <el-button :loading="loading" type="primary" plain size="large" @click.prevent="handleLogin"
              >注 册</el-button
            > -->
          </div>
        </el-form>
      </div>
      <div class="content" v-if="!flag">
        <el-form ref="registerFormRef" :model="ruleForm" :rules="registerRules" @keyup.enter="handleRegister">
          <el-form-item prop="username">
            <el-input
              v-model.trim="ruleForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="ruleForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              @input="isInputValue"
            />
          </el-form-item>
          <el-form-item prop="confirmedPassword">
            <el-input
              :disabled="isShow"
              v-model.trim="ruleForm.confirmedPassword"
              placeholder="确认密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <div class="flex justify-between">
            <el-button :loading="loading" type="primary" size="large" @click.prevent="handleRegister">注 册</el-button>
          </div>
        </el-form>
      </div>
      <el-button class="set-register" @click.prevent="setFlag" v-if="flag">注册</el-button>
      <el-button class="set-register" @click.prevent="setFlag" v-if="!flag">登录</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { type FormInstance, FormRules } from "element-plus"
import { User, Lock } from "@element-plus/icons-vue"
import { type LoginRequestData } from "@/api/login/types/login"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { register } from "@/api/login/index"

const router = useRouter()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

const flag = ref(true)

/** 登录按钮 Loading */
const loading = ref(false)
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: "",
  password: "",
  confirmedPassword: ""
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ]
}

// 注册逻辑验证
const ruleForm = reactive({
  username: "",
  password: "",
  confirmedPassword: ""
})
// 声明注册表单
const registerFormRef = ref<FormInstance | null>(null)
// 为密码添加规则
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"))
  } else {
    if (ruleForm.confirmedPassword !== "") {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField("checkPass", () => null)
    }
    callback()
  }
}
// 确认密码添加规则
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不相同！！！"))
  } else {
    callback()
  }
}
// 注册规则
const registerRules = reactive<FormRules<typeof ruleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  confirmedPassword: [{ validator: validatePass2, trigger: "blur" }]
})
// 填写密码后才可以填写确认密码
const isShow = ref(true)
const isInputValue = (row: any) => {
  if (row !== "") {
    isShow.value = false
  } else {
    isShow.value = true
  }
}
/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      useUserStore()
        .login(loginFormData)
        .then(() => {
          router.push({ path: "/" })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}

const handleRegister = () => {
  registerFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      const params = {
        username: loginFormData.username,
        password: loginFormData.password
      }
      register(params)
        .then((res: any) => {
          console.log(res)
        })
        .finally(() => {
          loading.value = false
          loginFormData.username = params.username
          loginFormData.password = params.password
          flag.value = true
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}

const setFlag = () => {
  if (flag.value) {
    loginFormData.username = ""
    loginFormData.password = ""
    loginFormData.confirmedPassword = ""
    flag.value = false
  } else {
    flag.value = true
    loginFormData.username = ""
    loginFormData.password = ""
  }
}
</script>

<style lang="scss" scoped>
.set-register {
  position: relative;
  left: 400px;
  bottom: 22px;
  border-radius: 20px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
