<!--
 * @FilePath: \vue-typescript-admin-template\src\views\example\components\Dropdown\Platform.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 16:06:14
 * @Reference: 引用方 src\views\example\components\ArticleDetail.vue
 * @Descripttion: 说明 多选框下拉列表
-->
<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      Platfroms({{ platforms.length }})
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-checkbox-group v-model="platforms" style="padding: 5px 15px">
        <el-checkbox
          v-for="item in platformsOptions"
          :key="item.key"
          :label="item.key"
        >
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PlatformDropdown'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string[]

  private platformsOptions = [
    { key: 'a-platform', name: 'a-platform' },
    { key: 'b-platform', name: 'b-platform' },
    { key: 'c-platform', name: 'c-platform' }
  ]

  get platforms() {
    return this.value
  }

  set platforms(value) {
    this.$emit('input', value)
  }
}
</script>
