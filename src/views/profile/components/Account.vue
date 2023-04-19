<!--
 * @FilePath: \vue-typescript-admin-template\src\views\profile\components\Account.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 17:34:44
 * @Reference: 引用方 src\views\profile\index.vue
 * @Descripttion: 说明 用户信息修改
-->
<template>
  <el-form>
    <!-- 名字 -->
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <!-- 邮箱 -->
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <!-- 更新 -->
    <el-form-item>
      <el-button type="primary" @click="submit"> Update </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IProfile } from '../index.vue'

@Component({
  name: 'Account'
})
export default class extends Vue {
  @Prop({ required: true }) private user!: IProfile
  // 更新成功
  private submit() {
    this.$message({
      message: 'User information has been updated successfully',
      type: 'success',
      duration: 5 * 1000
    })
  }
}
</script>
