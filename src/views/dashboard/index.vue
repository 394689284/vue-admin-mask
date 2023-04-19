<!--
 * @FilePath: \vue-typescript-admin-template\src\views\dashboard\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 18:19:28
 * @Reference: 引用方 src\layout\components\Sidebar\index.vue
 * @Descripttion: 说明 框架-侧边栏-首页-主组件
-->
<template>
  <!-- 切换路由 -->
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminDashboard from './admin/index.vue' // 管理元
import EditorDashboard from './editor/index.vue' // 编辑者

@Component({
  name: 'Dashboard',
  components: {
    AdminDashboard,
    EditorDashboard
  }
})
export default class extends Vue {
  private currentRole = 'admin-dashboard'

  get roles() {
    return UserModule.roles
  }

  // 如果不是管理员权限则是编辑者权限
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editor-dashboard'
    }
  }
}
</script>
