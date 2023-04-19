<!--
 * @FilePath: \vue-typescript-admin-template\src\views\table\dynamic-table\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-19 11:03:22
 * @Reference: 引用方
 * @Descripttion: 说明 动态表格
-->
<template>
  <div class="app-container">
    <div style="margin: 0 0 5px 20px">
      {{ $t('table.dynamicTips1') }}
    </div>
    <fixed-header-table />

    <div style="margin: 30px 0 5px 20px">
      {{ $t('table.dynamicTips2') }}
    </div>
    <unfixed-header-table />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FixedHeaderTable from './components/FixedHeaderTable.vue'
import UnfixedHeaderTable from './components/UnfixedHeaderTable.vue'

@Component({
  name: 'DynamicTable',
  components: {
    FixedHeaderTable,
    UnfixedHeaderTable
  }
})
export default class extends Vue {}
</script>
