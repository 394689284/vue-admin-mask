<!--
 * @FilePath: \vue-typescript-admin-template\src\components\LangSelect\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 17:15:44
 * @Reference: 引用方 src\layout\components\Navbar\index.vue
 * @Descripttion: 说明 框架-头部导航-语言选择器
-->

<template>
  <!-- 下拉框 -->
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon name="language" class="international-icon" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <!-- 下拉框选择列表 -->
      <el-dropdown-item :disabled="language === 'zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import settings from '@/settings' // 读取网页配置
@Component({
  name: 'Login'
})
export default class extends Vue {
  get language() {
    return AppModule.language
  }

  // 切换语言设置
  public handleSetLanguage(lang: string) {
    this.$i18n.locale = lang
    AppModule.SetLanguage(lang)
    document.documentElement.lang = lang
    // 切换网页标题
    const title = this.$route.meta?.title
      ? `${this.$t(`route.${this.$route.meta.title}`)} - ${settings.title}`
      : `${settings.title}`
    document.title = title
    this.$message({
      message: this.$t('components.changeLanguageTips').toString(),
      type: 'success'
    })
  }
}
</script>
