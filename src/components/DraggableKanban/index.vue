<!--
 * @FilePath: \vue-typescript-admin-template\src\components\DraggableKanban\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 18:29:45
 * @Reference: 引用方 引用方 src\layout\components\Navbar\index.vue
 * @Descripttion: 说明 可拖拽看板组件
-->
<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <!-- 可拖拽 -->
    <draggable :list="list" v-bind="$attrs" class="board-column-content">
      <div v-for="element in list" :key="element.id" class="board-item">
        {{ element.name }} {{ element.id }}
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import Draggable from 'vuedraggable' // 可拖拽组件
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'DraggableKanban',
  components: {
    Draggable
  }
})
export default class extends Vue {
  @Prop({ default: 'header' }) private headerText!: string
  @Prop({ default: () => [] }) private list!: any[]
  @Prop({ default: () => null }) private options!: object
}
</script>

<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
