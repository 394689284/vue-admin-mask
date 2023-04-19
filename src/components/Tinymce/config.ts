/*
 * @FilePath: \vue-typescript-admin-template\src\components\Tinymce\config.ts
 * @Author: maskMan
 * @Date: 2023-04-18 18:58:20
 * @LastEditTime: 2023-04-19 10:02:15
 * @Reference: 引用方
 * @Descripttion: 说明 富文本配置
 */
// Import plugins that you want to use
// Detail plugins list see: https://www.tiny.cloud/apps/#core-plugins
// Custom builds see: https://www.tiny.cloud/get-tiny/custom-builds/
// 富文本功能插件
export const plugins = ['advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullpage fullscreen help hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textpattern visualblocks visualchars wordcount']
// 富文本工具栏
// Here is the list of toolbar control components
// Details see: https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols
export const toolbar = ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample help', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons charmap forecolor backcolor fullpage fullscreen']
