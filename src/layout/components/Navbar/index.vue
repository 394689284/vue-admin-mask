<!--
 * @FilePath: \vue-typescript-admin-template\src\layout\components\Navbar\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:41:42
 * @Reference: 引用方 src\layout\index.vue
 * @Descripttion: 说明 框架-头部导航
-->
<template>
  <div class="navbar">
    <!--汉堡组件-->
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <!--面包屑导航组件-->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <!--右键菜单-->
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!--头部搜索-->
        <header-search class="right-menu-item" />
        <!--错误日志组件-->
        <error-log class="errLog-container right-menu-item hover-effect" />
        <!--全屏-->
        <screenfull class="right-menu-item hover-effect" />
        <!--尺寸调整-->
        <el-tooltip
          :content="$t('navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <size-select class="right-menu-item hover-effect" />
        </el-tooltip>
        <!--语言设置-->
        <lang-select class="right-menu-item hover-effect" />
      </template>
      <!--右部下拉框容器-->
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <!--头像按钮-->
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <!--下拉箭头-->
          <i class="el-icon-caret-bottom" />
        </div>
        <!--下栏菜单列表-->
        <el-dropdown-menu slot="dropdown">
          <!--个人中心-->
          <router-link to="/profile/">
            <el-dropdown-item>
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </router-link>
          <!--首页-->
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <!--项目地址 打开新窗口-->
          <a
            target="_blank"
            href="https://github.com/armour/vue-typescript-admin-template/"
          >
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>
          <!--项目主页-->
          <a
            target="_blank"
            href="https://armour.github.io/vue-typescript-admin-docs/"
          >
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <!--退出登录-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">
              {{ $t('navbar.logOut') }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import Breadcrumb from '@/components/Breadcrumb/index.vue' // 面包屑组件
import ErrorLog from '@/components/ErrorLog/index.vue' // 错误日志组件
import Hamburger from '@/components/Hamburger/index.vue' // 汉堡组件
import HeaderSearch from '@/components/HeaderSearch/index.vue' // 搜索组件
import LangSelect from '@/components/LangSelect/index.vue' // 语言选择组件
import Screenfull from '@/components/Screenfull/index.vue' // 全屏组件
import SizeSelect from '@/components/SizeSelect/index.vue' // 尺寸选择组件

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    ErrorLog,
    Hamburger,
    HeaderSearch,
    LangSelect,
    Screenfull,
    SizeSelect
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }

  get device() {
    return AppModule.device.toString()
  }

  get avatar() {
    return UserModule.avatar
  }

  // 汉堡包 子组件触发缩小
  public toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }

  // 退出登录
  public async logout() {
    await UserModule.LogOut()
    this.$router
      .push(`/login?redirect=${this.$route.fullPath}`)
      .catch((err) => {
        console.warn(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
