<!--
 * @FilePath: \vue-typescript-admin-template\src\components\Tinymce\index.vue
 * @Author: maskMan
 * @Date: 2023-04-18 18:58:20
 * @LastEditTime: 2023-04-19 10:09:46
 * @Reference: 引用方 src\views\components-demo\tinymce.vue
 * @Descripttion: 说明 富文本组件
-->
<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <!-- 显示富文本编辑器 -->
    <tinymce-editor :id="id" v-model="tinymceContent" :init="initOptions" />
    <!-- 显示上传图片富文本按钮组件 -->
    <div class="editor-custom-btn-container">
      <editor-image-upload
        :color="uploadButtonColor"
        class="editor-upload-btn"
        @success-callback="imageSuccessCBK"
      />
    </div>
  </div>
</template>

<script lang="ts">
// Docs: https://www.tiny.cloud/docs/advanced/usage-with-module-loaders/
// Import TinyMCE
import 'tinymce/tinymce'
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default'
// Import themes
import 'tinymce/themes/silver'
import 'tinymce/themes/mobile'
// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import TinymceEditor from '@tinymce/tinymce-vue' // 导入富文本包
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { SettingsModule } from '@/store/modules/settings'
import EditorImageUpload, { IUploadObject } from './components/EditorImage.vue' // 导入富文本图片上传组件
import { plugins, toolbar } from './config' // 富文本配置

const defaultId = () =>
  'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

@Component({
  name: 'Tinymce',
  components: {
    EditorImageUpload,
    TinymceEditor
  }
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string
  @Prop({ default: defaultId }) private id!: string
  @Prop({ default: () => [] }) private toolbar!: string[]
  @Prop({ default: 'file edit insert view format table' })
  private menubar!: string

  @Prop({ default: '360px' }) private height!: string | number
  @Prop({ default: 'auto' }) private width!: string | number

  private hasChange = false
  private hasInit = false
  private fullscreen = false
  // https://www.tiny.cloud/docs/configure/localization/#language
  // when adding a new language, please also add the corresponding lang file under public/tinymce/langs folder
  private languageTypeList: { [key: string]: string } = {
    en: 'en',
    zh: 'zh_CN'
  }

  get language() {
    return this.languageTypeList[AppModule.language]
  }

  get uploadButtonColor() {
    return SettingsModule.theme
  }

  get tinymceContent() {
    return this.value
  }

  set tinymceContent(value) {
    this.$emit('input', value)
  }

  get containerWidth() {
    const width = this.width
    // Test matches `100`, `'100'`
    if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
      return `${width}px`
    }
    return width
  }

  // 初始化富文本配置
  get initOptions() {
    return {
      selector: `#${this.id}`, // 编辑框选择器
      height: this.height, // 编辑框 高度
      body_class: 'panel-body',
      object_resizing: false,
      toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar, // 显示工具栏
      menubar: this.menubar, // 显示菜单栏
      plugins: plugins, // 显示插件
      language: this.language, // 显示语言
      language_url:
        this.language === 'en'
          ? ''
          : `${process.env.BASE_URL}tinymce/langs/${this.language}.js`, // 富文本语言选择 路径 在public\tinymce
      skin_url: `${process.env.BASE_URL}tinymce/skins/`, // 富文本皮肤样式选择 路径 在public\tinymce
      emoticons_database_url: `${process.env.BASE_URL}tinymce/emojis.min.js`, // 富文本表情包选择 路径 在public\tinymce
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      default_link_target: '_blank',
      link_title: false,
      // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
      nonbreaking_force_tab: true,
      // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
      // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
      convert_urls: false,
      init_instance_callback: (editor: any) => {
        if (this.value) {
          editor.setContent(this.value)
        }
        this.hasInit = true
        editor.on('NodeChange Change KeyUp SetContent', () => {
          this.hasChange = true
          this.$emit('input', editor.getContent())
        })
      },
      setup: (editor: any) => {
        editor.on('FullscreenStateChanged', (e: any) => {
          this.fullscreen = e.state
        })
      }
    }
  }

  // 语言选择
  @Watch('language')
  private onLanguageChange() {
    const tinymceManager = (window as any).tinymce
    const tinymceInstance = tinymceManager.get(this.id)
    if (this.fullscreen) {
      tinymceInstance.execCommand('mceFullScreen')
    }
    if (tinymceInstance) {
      tinymceInstance.destroy()
    }
    this.$nextTick(() => tinymceManager.init(this.initOptions))
  }

  // 图片上传结束
  private imageSuccessCBK(arr: IUploadObject[]) {
    const tinymce = (window as any).tinymce.get(this.id)
    arr.forEach((v) => {
      tinymce.insertContent(`<img class="wscnph" src="${v.url}" >`)
    })
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;

  .mce-fullscreen {
    z-index: 10000;
  }
}

.editor-custom-btn-container {
  position: absolute;
  right: 6px;
  top: 6px;
  z-index: 1002;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}

textarea {
  visibility: hidden;
  z-index: -1;
}
</style>
