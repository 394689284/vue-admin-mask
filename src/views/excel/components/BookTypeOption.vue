<!--
 * @FilePath: \vue-typescript-admin-template\src\views\excel\components\BookTypeOption.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 13:39:39
 * @Reference: 引用方 src\views\excel\export-excel.vue
 * @Descripttion: 说明 框架-excel-导出全部excel-文件类型选项
-->

<template>
  <div style="display: inline-block">
    <label class="radio-label">Book Type: </label>
    <el-select v-model="bookType" style="width: 120px">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'BookTypeOption'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string

  private options = ['xlsx', 'csv', 'txt']

  get bookType() {
    return this.value
  }

  set bookType(value) {
    this.$emit('input', value)
  }
}
</script>
