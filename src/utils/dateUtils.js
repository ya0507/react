/* 格式化时间 */
/* 包含n个日期时间处理的工具函数模块 */

export  function formataDate(time){
    if (!time) return ''
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
      ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() 
}