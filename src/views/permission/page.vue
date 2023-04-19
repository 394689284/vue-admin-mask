<!--
 * @FilePath: \vue-typescript-admin-template\src\views\permission\page.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-19 11:04:43
 * @Reference: 引用方
 * @Descripttion: 说明 页面权限
-->
<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SwitchRoles from './components/SwitchRoles.vue' // 选择权限组件

@Component({
  name: 'PagePermission',
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
  private handleRolesChange() {
    this.$router
      .push({ path: '/permission/index?' + +new Date() })
      .catch((err) => {
        console.warn(err)
      })
  }
}
</script>
