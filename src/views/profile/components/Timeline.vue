<!--
 * @FilePath: \vue-typescript-admin-template\src\views\profile\components\Timeline.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 17:23:56
 * @Reference: 引用方 src\views\profile\index.vue
 * @Descripttion: 说明 时间进度线
-->
<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) of timeline"
        :key="index"
        :timestamp="item.timestamp"
        placement="top"
      >
        <!-- 显示卡文本 -->
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Timeline'
})
export default class extends Vue {
  private timeline = [
    {
      timestamp: '2019/4/20',
      title: 'Update Github template',
      content: 'Armour committed 2019/4/20 20:46'
    },
    {
      timestamp: '2019/4/21',
      title: 'Update Github template',
      content: 'Armour committed 2019/4/21 20:46'
    },
    {
      timestamp: '2019/4/22',
      title: 'Build Template',
      content: 'Armour committed 2019/4/22 20:46'
    },
    {
      timestamp: '2019/4/23',
      title: 'Release New Version',
      content: 'Armour committed 2019/4/23 20:46'
    }
  ]
}
</script>
