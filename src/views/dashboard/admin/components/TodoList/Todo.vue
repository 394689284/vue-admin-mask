<!--
 * @FilePath: \vue-typescript-admin-template\src\views\dashboard\admin\components\TodoList\Todo.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 19:42:47
 * @Reference: 引用方 src\views\dashboard\admin\components\TodoList\index.vue
 * @Descripttion: 说明 框架-主页-管理员-待办事项-todo 选项
-->

<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      />
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo(todo)" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface ITodo {
  text: string
  done: boolean
}

@Component({
  name: 'TodoDemo',
  directives: {
    focus: (el, { value }, { context }) => {
      if (value) {
        if (context) {
          context.$nextTick(() => {
            el.focus()
          })
        }
      }
    }
  }
})
export default class extends Vue {
  @Prop({ default: { text: '', done: false } }) private todo!: ITodo

  private editing = false

  private deleteTodo(todo: ITodo) {
    this.$emit('delete-todo', todo)
  }

  private editTodo({ todo, value }: any) {
    this.$emit('edit-todo', { todo, value })
  }

  private toggleTodo(todo: ITodo) {
    this.$emit('toggle-todo', todo)
  }

  private doneEdit(e: KeyboardEvent) {
    const value = (e.target as HTMLInputElement).value.trim()
    const { todo } = this
    if (!value) {
      this.deleteTodo(todo)
    } else if (this.editing) {
      this.editTodo({
        todo,
        value
      })
      this.editing = false
    }
  }

  private cancelEdit(e: KeyboardEvent) {
    const tem = e.target as HTMLInputElement
    tem.value = this.todo.text
    this.editing = false
  }
}
</script>
