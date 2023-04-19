<!--
 * @FilePath: \vue-typescript-admin-template\src\views\excel\components\AutoWidthOption.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 13:40:18
 * @Reference: 引用方 src\views\excel\export-excel.vue
 * @Descripttion: 说明  * @Descripttion: 说明 框架-excel-导出全部excel-单元格选项
-->
<template>
  <div style="display: inline-block">
    <label class="radio-label">单元格: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border> True </el-radio>
      <el-radio :label="false" border> False </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'AutoWidthOption'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: boolean

  get autoWidth() {
    return this.value
  }

  set autoWidth(value) {
    this.$emit('input', value)
  }
}
</script>
