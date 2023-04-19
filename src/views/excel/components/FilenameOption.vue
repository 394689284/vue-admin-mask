<!--
 * @FilePath: \vue-typescript-admin-template\src\views\excel\components\FilenameOption.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 13:29:13
 * @Reference: 引用方 src\views\excel\export-excel.vue
 * @Descripttion: 说明 框架-excel-导出全部excel-文件名字输入框
-->

<template>
  <div style="display: inline-block">
    <label class="radio-label" style="padding-left: 0">Filename: </label>
    <el-input
      v-model="filename"
      :placeholder="$t('excel.placeholder')"
      style="width: 345px"
      prefix-icon="el-icon-document"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'FilenameOption'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string

  get filename() {
    return this.value
  }

  set filename(value) {
    this.$emit('input', value)
  }
}
</script>
