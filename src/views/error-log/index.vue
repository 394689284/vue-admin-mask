<!--
 * @FilePath: \vue-typescript-admin-template\src\views\error-log\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 14:56:03
 * @Reference: 引用方
 * @Descripttion: 说明  框架-导航栏- 错误日志查询
-->

<template>
  <div class="errPage-container">
    <!-- 错误组件A -->
    <error-a />/
    <!-- 错误组件B -->
    <error-b />
    <h3>{{ $t('errorLog.tips') }}</h3>
    <!-- 侧边栏 -->
    <aside>
      {{ $t('errorLog.description') }}
      <a
        target="_blank"
        class="link-type"
        href="https://armour.github.io/vue-typescript-admin-docs/guide/advanced/error.html"
      >
        {{ $t('errorLog.documentation') }}
      </a>
    </aside>
    <!-- 错误说明动画 -->
    <a href="#">
      <img
        src="https://wpimg.wallstcn.com/360e4842-4db5-42d0-b078-f9a84a825546.gif"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ErrorA from './components/ErrorTestA.vue' // 导入错误组件A
import ErrorB from './components/ErrorTestB.vue' // 导入错误组件B

@Component({
  name: 'ErrorLog',
  components: {
    ErrorA,
    ErrorB
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.errPage-container {
  padding: 30px;
}
</style>
