<!--
 * @FilePath: \vue-typescript-admin-template\src\components\SizeSelect\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 17:12:53
 * @Reference: 引用方 src\layout\components\Navbar\index.vue
 * @Descripttion: 说明 框架-头部导航栏-尺寸选择组件
-->

<template>
  <!-- 显示下拉框容器 -->
  <el-dropdown id="size-select" trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class="size-icon" name="size" />
    </div>
    <!-- 下拉框列表 -->
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size === item.value"
        :command="item.value"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule } from '@/store/modules/tags-view'

@Component({
  name: 'SizeSelect'
})
export default class extends Vue {
  // 下拉列表选项
  private sizeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Mini', value: 'mini' }
  ]

  // 获取尺寸
  get size() {
    return AppModule.size
  }

  // 设置尺寸
  private handleSetSize(size: string) {
    const tem = this as any
    tem.$ELEMENT.size = size
    AppModule.SetSize(size)
    // 刷新页面
    this.refreshView()
    this.$message({
      message: 'Switch Size Success',
      type: 'success'
    })
  }

  // 刷新网页视图重定向路由路径
  private refreshView() {
    // In order to make the cached page re-rendered
    // 删除标签路由全部视图
    TagsViewModule.delAllCachedViews()
    const { fullPath } = this.$route
    this.$nextTick(() => {
      // 下一帧 重定向路由路径
      this.$router
        .replace({
          path: '/redirect' + fullPath
        })
        .catch((err) => {
          console.warn(err)
        })
    })
  }
}
</script>
