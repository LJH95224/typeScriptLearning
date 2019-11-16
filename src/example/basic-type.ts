// 布尔类型
// let bool: boolean = false
// 或者
let bool: boolean
bool = true

// 数值类型
// 所有的数值都是浮点数所有只有一个number类型
let num: number = 123
// TypeScript 和 JavaScript 一样，所有数字都是浮点数，所以只有一个 number类型，而没有int或者float类型。而 且 TypeScript 还支持 ES6 中新增的二进制和八进制数字字面量，所以 TypeScript 中共支持二、八、十和十六四种进制的数值。

num = 0b1111011 // 二进制
num = 0o173 // 八进制
num = 0x7b // 16进制

// 字符串类型
let str: string
str = 'abc'
str = `数值是${num}`
console.log(str)

// 数组类型
// [1, 2, 3]
// 写法1
let arr1: number[]
arr1 = [ 5 ]
// 写法2
let arr2: Array<number>
let arr3: (string | number)[]
let arr4: Array<string | number>
arr3 = [ 'a', 1]
arr4 = [ 'b', 2]

// 元祖类型
let tuple: [string, number, boolean]
tuple = ['a', 1, false]

// 枚举类型
enum Roles {
  SUPER_ADMIN,
  ADMIN = 4,
  USER
}

console.log(Roles)
console.log(Roles.USER)

// any 类型(可以表示是任何类型)
let value: any
value = 'abc'
value = 123
value = false
const arr5: any[] = [1, 'a']

// void 类型 （什么类型都不是）
const consoleTest = (text: string): void => {
  console.log(text)
}
consoleTest('abc')

let v: void
v = undefined
// v = null // 报错


// null && undefined
let u: undefined
u = undefined

let n: null
n = null

// null && undefined 是其他类型的子类型
// num = undefined

// never 类型 (对于抛出错误的和无线循环的，不可能有返回值，那么返回值的类型是never) never 是任何类型的子类型
const errorFunc = (message: string): never => {
  throw new Error(message);
}

const infiniteFunc = (): never => {
  while (true) {}
}

let neverVariable = (() => {
  while (true) {
  }
})
// neverVariable = '123'

// object 类型
let obj = {
  name: 'alfred'
}
let obj2 = obj
obj2.name = 'L'
console.log(obj)
// 对象赋值赋的是对象在内存地址中的引用，







