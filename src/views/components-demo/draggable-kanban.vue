<!--
 * @FilePath: \vue-typescript-admin-template\src\views\components-demo\draggable-kanban.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 18:27:51
 * @Reference: 引用方
 * @Descripttion: 说明 可拖拽看板
-->
<template>
  <div class="components-container board">
    <draggable-kanban
      :key="1"
      :list="list1"
      :group="group"
      class="kanban todo"
      header-text="Todo"
    />
    <draggable-kanban
      :key="2"
      :list="list2"
      :group="group"
      class="kanban working"
      header-text="Working"
    />
    <draggable-kanban
      :key="3"
      :list="list3"
      :group="group"
      class="kanban done"
      header-text="Done"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DraggableKanban from '@/components/DraggableKanban/index.vue'

@Component({
  name: 'DraggableKanbanDemo',
  components: {
    DraggableKanban
  }
})
export default class extends Vue {
  private group = 'mission'
  private list1 = [
    { name: 'Mission', id: 1 },
    { name: 'Mission', id: 2 },
    { name: 'Mission', id: 3 },
    { name: 'Mission', id: 4 }
  ]

  private list2 = [
    { name: 'Mission', id: 5 },
    { name: 'Mission', id: 6 },
    { name: 'Mission', id: 7 }
  ]

  private list3 = [
    { name: 'Mission', id: 8 },
    { name: 'Mission', id: 9 },
    { name: 'Mission', id: 10 }
  ]
}
</script>

<style lang="scss">
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }

  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }

  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

<style lang="scss" scoped>
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
</style>
