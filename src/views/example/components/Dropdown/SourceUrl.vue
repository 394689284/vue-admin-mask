<!--
 * @FilePath: \vue-typescript-admin-template\src\views\example\components\Dropdown\SourceUrl.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 16:06:25
 * @Reference: 引用方 src\views\example\components\ArticleDetail.vue
 * @Descripttion: 说明 网址下拉列表
-->
<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      Link
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding" style="width: 400px">
      <el-form-item
        label-width="0px"
        style="margin-bottom: 0px"
        prop="sourceURL"
      >
        <el-input v-model="sourceURL" placeholder="Please enter the content">
          <template slot="prepend"> URL </template>
        </el-input>
      </el-form-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SourceUrlDropdown'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string

  get sourceURL() {
    return this.value
  }

  set sourceURL(value) {
    this.$emit('input', value)
  }
}
</script>
