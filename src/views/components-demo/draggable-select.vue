<!--
 * @FilePath: \vue-typescript-admin-template\src\views\components-demo\draggable-select.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 18:30:35
 * @Reference: 引用方 src\layout\components\Navbar\index.vue
 * @Descripttion: 说明 可拖拽选择器
-->
<template>
  <div class="components-container">
    <draggable-select
      v-model="value"
      style="width: 500px"
      multiple
      placeholder="Please select"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </draggable-select>

    <div style="margin-top: 30px">
      <el-tag v-for="item of value" :key="item" style="margin-right: 15px">
        {{ item }}
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DraggableSelect from '@/components/DraggableSelect/index.vue'

@Component({
  name: 'DraggableSelectDemo',
  components: {
    DraggableSelect
  }
})
export default class extends Vue {
  private value = ['Apple', 'Banana', 'Orange']
  private options = [
    {
      value: 'Apple',
      label: 'Apple'
    },
    {
      value: 'Banana',
      label: 'Banana'
    },
    {
      value: 'Orange',
      label: 'Orange'
    },
    {
      value: 'Pear',
      label: 'Pear'
    },
    {
      value: 'Strawberry',
      label: 'Strawberry'
    }
  ]
}
</script>
