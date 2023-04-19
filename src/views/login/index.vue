<!--
  *用户登录模块
!-->
<template>
  <div class="login-container">
    <!--用户表单-->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
        <!--语言设置-->
        <lang-select class="set-language" />
      </div>
      <!--用户名-->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <!--用户密码-->
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon name="password" />
          </span>
          <!--按键弹起登录 handleLogin-->
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <!--显示隐藏密码-->
            <svg-icon
              :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <!--点击登录 handleLogin-->
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        <!--国际化语言转换-->
        {{ $t('login.logIn') }}
      </el-button>
      <div style="position: relative; width: 100%">
        <!--用户登录提示-->
        <!-- <div class="tips">
          <span>{{ $t('login.username') }} : admin </span>
              <span>{{ $t('login.password') }} : {{ $t('login.any') }} </span>
            </div>
                                                                                                                                                                                                                                                                                                                                                       </div> -->
        <!--三方登录-->
        <!-- <social-sign /> -->
        <social-sign />
        <!--按钮提示-->
        <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog = true">
                                                                                                                                                                                                                                                                                                                                                                              </el-button> -->
      </div>
    </el-form>
    <!--提示面板-->
    <!-- <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
                                                                                                                                                                  {{ $t('login.thirdpartyTips') }}
                                                                                                                                                                  <br>                                                                                                                                           <br>                                                                                                                                        <br>                                                                                                                                        <social-sign />                                                                                                                                                                                                 </el-dialog> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator' // 扩展类装饰器
import { Route } from 'vue-router' // 路由
import { Dictionary } from 'vue-router/types/router'
import { Form as ElForm, Input } from 'element-ui' // element-ui组件
import { UserModule } from '@/store/modules/user' // 用户状态管理
import { isValidUsername } from '@/utils/validate' // 有效用户验证
import LangSelect from '@/components/LangSelect/index.vue' // 语言选择组件
import SocialSign from './components/SocialSignin.vue' // 三方登录组件
import { ErrorLogModule } from '@/store/modules/error-log'
@Component({
  name: 'Login',
  components: {
    LangSelect,
    SocialSign
  }
})
export default class extends Vue {
  /** 验证有效用户名表达式 */
  isShow = true
  public validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error('请输入正确的用户名'))
    } else {
      callback()
    }
  }

  /** 验证有效密码 */
  public validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }

  // 默认表单密码
  public loginForm = {
    username: 'admin',
    password: '111111'
  }

  // 验证规则
  public loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }

  public passwordType = 'password'
  public loading = false
  public showDialog = false
  public capsTooltip = false
  public redirect?: string
  public otherQuery: Dictionary<string> = {}
  // 监听路由 变化载入后立即生效
  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // 任意字符串类型Dictionary<string>
    const query = route.query as Dictionary<string>
    if (query) {
      // 初始化获取路由跳转地址和参数
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
    // 输入框为空强制获得输入焦点
    if (this.loginForm.username === '') {
      const tem = this.$refs.username as Input
      tem.focus()
    } else if (this.loginForm.password === '') {
      const tem = this.$refs.password as Input
      tem.focus()
    }
  }

  // 大小写切换焦点输入
  public checkCapslock(e: KeyboardEvent) {
    const { key } = e
    this.capsTooltip =
      key !== null && key.length === 1 && key >= 'A' && key <= 'Z'
  }

  // 显示隐藏密码
  public showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    // 强制获取焦点
    this.$nextTick(() => {
      const tem = this.$refs.password as Input
      tem.focus()
    })
  }

  // 登录
  public handleLogin() {
    const tem = this.$refs.loginForm as ElForm
    tem.validate(async (valid: boolean) => {
      // 验证成功
      if (valid) {
        this.loading = true
        await UserModule.Login(this.loginForm)
        // 验证成功则携带参数跳转 默认跳转到主页
        this.$router
          .push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
          .catch((err) => {
            // console.log(err)
          })
        // 强制定时器后重置登录
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      } else {
        return false
      }
    })
  }

  // 获取其他路由参数
  public getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
      // 累加初始值
    }, {} as Dictionary<string>)
  }
}
</script>
<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }

    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
