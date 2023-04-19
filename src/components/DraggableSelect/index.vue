<!--
 * @FilePath: \vue-typescript-admin-template\src\components\DraggableSelect\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 18:31:05
 * @Reference: 引用方
 * @Descripttion: 说明 可拖拽选择器组件
-->
<template>
  <el-select
    ref="draggableSelect"
    v-model="selectVal"
    v-bind="$attrs"
    class="draggable-select"
    multiple
    v-on="$listeners"
  >
    <slot />
  </el-select>
</template>

<script lang="ts">
import Sortable from 'sortablejs'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Select } from 'element-ui'

@Component({
  name: 'DraggableSelect'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string[]

  private sortable: Sortable | null = null

  get selectVal() {
    return [...this.value]
  }

  set selectVal(value) {
    this.$emit('input', [...value])
  }

  mounted() {
    this.setSort()
  }

  private setSort() {
    const draggableSelect = this.$refs.draggableSelect as Select
    const el = draggableSelect.$el.querySelectorAll(
      '.el-select__tags > span'
    )[0] as HTMLElement
    this.sortable = Sortable.create(el, {
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder
      onEnd: (evt) => {
        if (
          typeof evt.oldIndex !== 'undefined' &&
          typeof evt.newIndex !== 'undefined'
        ) {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          this.value.splice(evt.newIndex, 0, targetRow)
        }
      }
    })
  }
}
</script>

<style lang="scss">
.draggable-select .sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}

.draggable-select .el-tag {
  cursor: pointer;
}
</style>
