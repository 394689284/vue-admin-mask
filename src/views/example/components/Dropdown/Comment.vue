<!--
 * @FilePath: \vue-typescript-admin-template\src\views\example\components\Dropdown\Comment.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 16:05:42
 * @Reference: 引用方 src\views\example\components\ArticleDetail.vue
 * @Descripttion: 单选框下拉列表
-->

<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      {{ !disableComment ? 'Comment: opened' : 'Comment: closed' }}
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding">
      <el-dropdown-item>
        <el-radio-group v-model="disableComment" style="padding: 10px">
          <el-radio :label="true"> Close comment </el-radio>
          <el-radio :label="false"> Open comment </el-radio>
        </el-radio-group>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'CommentDropdown'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: boolean

  get disableComment() {
    return this.value
  }

  set disableComment(value) {
    this.$emit('input', value)
  }
}
</script>
