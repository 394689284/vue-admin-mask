<!--
 * @FilePath: \vue-typescript-admin-template\src\views\components-demo\split-pane.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-19 10:30:10
 * @Reference: 引用方
 * @Descripttion: 说明 分割面板
-->
<template>
  <div class="components-container">
    <aside>
      <strong>SplitPane</strong> If you've used
      <a href="https://codepen.io/" target="_blank"> codepen</a>,
      <a href="https://jsfiddle.net/" target="_blank"> jsfiddle </a>will not be
      unfamiliar.
      <a href="https://github.com/PanJiaChen/vue-split-pane" target="_blank">
        Github repository</a
      >
    </aside>
    <!-- 面板分割 -->
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container" />
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script lang="ts">
import SplitPane from 'vue-splitpane'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SplitPaneDemo',
  components: {
    SplitPane
  }
})
export default class extends Vue {
  resize() {
    // Handle resize
  }
}
</script>

<style lang="scss" scoped>
.components-container {
  height: 100vh;
}

.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
</style>
