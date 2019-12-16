// export const name = 'lison'
// export const age = 18
// export const address = 'beijing'

// const name = 'lison'
// const age = 18
// const address = 'beijing'
// export {name, age, address }

export function func(params) {
  // 
}
export class A { }

function func1(params) {
  
}
class B {}
const b = ''
export {
  func1 as Function1m,
  B as ClassB,
  b as StringB,
  b as String
}
// 注意：export导出的是对外的接口，而不是具体的值
// 下面是直接导出一个具体的值，是错误的
// export 'lison'

// const name = 'lison'
// export name // 这样导出也是错误的，