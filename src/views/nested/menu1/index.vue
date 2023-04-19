<!--
 * @FilePath: \vue-typescript-admin-template\src\views\nested\menu1\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 16:24:44
 * @Reference: 引用方
 * @Descripttion: 说明 路由嵌套1
-->
<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="menu 1">
      <!-- 淡入动画 -->
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </el-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Menu1'
})
export default class extends Vue {}
</script>
