<!--
  第三方微信和QQ授权登录
!-->
<template>
  <div class="social-signup-container">
    <!--微信-->
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container"><svg-icon name="wechat" class="icon" /></span>
      <div> 微信授权</div>
  </div>
  <!--QQ-->
  <!-- <div class="sign-btn" @click="// @ts-ignore
        tencentHandleClick('tencent')">
        <span class="qq-svg-container"><svg-icon name="qq" class="icon" /></span> QQ
      </div> -->
  </div>
</template>

<script lang="ts">
// import openWindow from '@/utils/openWindow'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SocialSignin'
})
export default class extends Vue {
  public wechatHandleClick(param: string) {
    alert('handle ' + param + ' here')
    // const appid = 'xxxxx'
    // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
    // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
    // openWindow(url, 'wechat', 540, 540)
  }

  public tencentHandleClick(param: string) {
    alert('handle ' + param + ' here')
    // const client_id = 'xxxxx'
    // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
    // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
    // openWindow(url, 'tencent', 540, 540)
  }
}
</script>

<style lang="scss" scoped>
.social-signup-container {
  margin: 20px;
  display: flex;
  justify-content: center;

  .sign-btn {
    display: inline-block;
    cursor: pointer;
    text-align: center;
  }

  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }

  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 10px;
    margin-right: 5px;
  }

  .wx-svg-container {
    background-color: #24da70;
  }

  .qq-svg-container {
    background-color: #6BA2D6;
    margin-left: 10px;
  }
}
</style>
