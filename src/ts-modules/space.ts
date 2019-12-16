namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/ // 这里定义一个正则
  export const isNumberReg = /^[0-9]+$/ // 这里再定义一个正则，与isLetterReg的区别在于他使用export导出了
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text)
  }
}
