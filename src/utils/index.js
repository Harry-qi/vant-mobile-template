// 格式化时间戳
export function formatDate(date = 0, fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = new Date(+date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : `00${str}`.substr(str.length))
    }
  }
  return fmt
}

/*
* sessionStorage的封装
* */
export const sessionSetItem = (key, value) => {
  // 将数组、对象类型的数据 转换为 JSON格式字符串 进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

// 2、获取JSON对象格式的数据----把字符串转为对象获取
export const sessionGetItem = (key) => {
  const data = window.sessionStorage.getItem(key)
  // 如果是一个真实有效的JSON格式字符串，则执行try中的代码，转为对象
  // 注意如果是字符串1，JSON.parse后会变成Number类型
  try {
    return JSON.parse(data)
  } catch (err) {
    // 如果不是一个真实有效的JSON格式字符串，直接返回原字符串
    return data
  }
}

// 3、删除数据
export const sessionRemoveItem = (key) => {
  window.sessionStorage.removeItem(key)
}
// 获取url的参数 （适配hash模式）
// 返回字符串
export const getParamsByKey = (url = window.location.href, key = '') =>
  (url.match(new RegExp(`([&?])${key}=([^&#]*)`)) || [])[2]
