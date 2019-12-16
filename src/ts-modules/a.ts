/************************ 模块 **********************************/

// [1] export
// TypeScript 中，仍然使用 export 来导出声明，而且能够导出的不仅有变量、函数、类，还包括 TypeScript 特有的类型别名和接口。

export interface FuncInterface {
  name: string
  (age: number): string
}

export class ClassC {
  constructor() {
    //
  }
}

class ClassD {
  constructor() {
    //
  }
}
export { ClassD }
export { ClassD as ClassNameD }
// 你可以使用 export 直接导出一个声明，也可以先声明一个类或者其它内容，然后使用 export { }的形式导出，也可以使用 as 来为导出的接口换个名字再导出一次。

export * from './b'

export { name } from './b'

export { name as nameProp } from './b'
