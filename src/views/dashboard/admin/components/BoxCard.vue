<!--
 * @FilePath: \vue-typescript-admin-template\src\views\dashboard\admin\components\BoxCard.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 19:50:00
 * @Reference: 引用方 src\views\dashboard\admin\index.vue
 * @Descripttion: 说明 框架-主页-管理员-显示卡
-->

<template>
  <el-card class="box-card-component" style="margin-left: 8px">
    <!-- 设置头部图片 -->
    <div slot="header" class="box-card-header">
      <img
        src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
      />
    </div>
    <div style="position: relative">
      <!-- 拇指头像动画图 -->
      <pan-thumb :image="avatar" class="panThumb" />
      <!-- 标题特效 -->
      <mallki class="mallki-text" text="vue-typescript-admin" />
      <!-- 数据进度条 -->
      <div style="padding-top: 35px" class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="51" />
      </div>
      <!-- 数据进度条 -->
      <div class="progress-item">
        <span>Typescript</span>
        <el-progress :percentage="45" />
      </div>
      <!-- 数据进度条 -->
      <div class="progress-item">
        <span>CSS</span>
        <el-progress :percentage="4" />
      </div>
      <!-- 数据进度条 -->
      <div class="progress-item">
        <span>ESLint</span>
        <el-progress :percentage="100" status="success" />
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import PanThumb from '@/components/PanThumb/index.vue'
import Mallki from '@/components/TextHoverEffect/Mallki.vue'

@Component({
  name: 'BoxCard',
  components: {
    PanThumb,
    Mallki
  }
})
export default class extends Vue {
  get name() {
    return UserModule.name
  }

  get avatar() {
    return UserModule.avatar
  }

  get roles() {
    return UserModule.roles
  }
}
</script>

<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}

.panThumb {
  z-index: 100;
  height: 70px !important;
  width: 70px !important;
  position: absolute !important;
  top: -45px;
  left: 0px;
  border: 5px solid #ffffff;
  background-color: #fff;
  margin: auto;
  box-shadow: none !important;

  .pan-info {
    box-shadow: none !important;
  }
}
</style>

<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }

  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
