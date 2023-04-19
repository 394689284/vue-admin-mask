/*
 * @FilePath: \vue-typescript-admin-template\src\utils\zip.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 11:42:12
 * @Reference: 引用方
 * @Descripttion: 说明 文件压缩保存
 */
import { saveAs } from 'file-saver'// 保存文件模块
import JSZip from 'jszip'// 文件压缩
// 压缩文件处理
export const exportTxt2Zip = (th: string[], jsonData: any, txtName = 'file', zipName = 'file') => {
  const zip = new JSZip()
  const data = jsonData
  let txtData = `${th}\r\n`
  data.forEach((row: any) => {
    let tempStr = ''
    tempStr = row.toString()
    txtData += `${tempStr}\r\n`
  })
  zip.file(`${txtName}.txt`, txtData)
  zip.generateAsync({
    type: 'blob'
  }).then((blob: Blob) => {
    saveAs(blob, `${zipName}.zip`)
  }, (err: Error) => {
    alert('Zip export failed: ' + err.message)
  })
}
