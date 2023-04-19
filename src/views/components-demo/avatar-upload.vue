<!--
 * @FilePath: \vue-typescript-admin-template\src\views\components-demo\avatar-upload.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 18:11:45
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明 头像更换组件
-->
<template>
  <div class="components-container">
    <aside>
      基于插件
      <a class="link-type" href="//github.com/dai-siki/vue-image-crop-upload">
        vue-image-crop-upload
      </a>
    </aside>
    <!-- 拇指动画 -->
    <pan-thumb :image="image" />
    <el-button
      type="primary"
      icon="el-icon-upload"
      tyle="position: absolute;bottom: 15px;margin-left: 40px;"
      @click="toggleShow"
    >
      更改头像
    </el-button>
    <avatar-upload
      v-model="showImageUpload"
      field="avatar"
      :width="300"
      :height="300"
      :params="params"
      :headers="headers"
      url="https://httpbin.org/post"
      @close="onClose"
      @crop-upload-success="onCropUploadSuccess"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AvatarUpload from '@/components/AvatarUpload/index.vue' // 导入头像更换组件
import PanThumb from '@/components/PanThumb/index.vue' // 拇指动画

@Component({
  name: 'AvatarUploadDemo',
  components: {
    AvatarUpload,
    PanThumb
  }
})
export default class extends Vue {
  private showImageUpload = false
  private image =
    'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'

  private params = { someParams: 'your_params_goes_here' }
  private headers = { smail: '*_~' }
  // 切换显示
  private toggleShow() {
    this.showImageUpload = !this.showImageUpload
  }

  // 获取图片地址
  private onCropUploadSuccess(jsonData: any, field: string) {
    this.showImageUpload = false
    this.image = jsonData.files[field]
  }

  // 关闭上传框
  private onClose() {
    this.showImageUpload = false
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
