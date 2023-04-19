<!--
 * @FilePath: \vue-typescript-admin-template\src\views\example\create.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 16:08:15
 * @Reference: 引用方
 * @Descripttion: 说明 创建列表
-->
<template>
  <article-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArticleDetail from './components/ArticleDetail.vue' // 文章详情页面

@Component({
  name: 'CreateArticle',
  components: {
    ArticleDetail
  }
})
export default class extends Vue {}
</script>
