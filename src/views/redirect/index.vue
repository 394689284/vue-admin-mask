<!--
 * @FilePath: \vue-typescript-admin-template\src\views\redirect\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 17:36:12
 * @Reference: 引用方 src\components\SizeSelect\index.vue
 * @Descripttion: 说明 直跳链接 用于尺寸改变
-->

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Redirect'
})
export default class extends Vue {
  created() {
    // 路由 路径重定向解析
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query }).catch((err) => {
      console.warn(err)
    })
  }

  render() {
    // 避免丢失模板的警告
  }
}
</script>
