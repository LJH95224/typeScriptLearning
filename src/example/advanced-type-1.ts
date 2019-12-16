// 16,17,18
/**************** TS 交叉类型 ***********************/
// 取多个类型的并集，用 & 符号定义

// const mergeFun = <T, U>(arg1: T, arg2: U): T & U => {
//   let res = {} as T & U
//   res = Object.assign(arg1, arg2)
//   return res
// }

// console.log(mergeFun({a: 'a'}, {b: 'b'}))

/**************** TS 联合类型 ***********************/
// type1 | type2 | type3 类型可以是type1，也可以是type2，甚至可以是type3

// const getLengthFun = (content: number | string): number => {
//   if (typeof content === 'string') {
//     return content.length
//   } else {
//     return content.toString().length
//   }
// }

// console.log(getLengthFun(1234))

/**************** TS 类型保护 ***********************/
// const valueList = [123, 'abc']
// const getRandomValue = () => {
//   const numbers = Math.random() * 10
//   if (numbers < 5) {
//     return valueList[0]
//   } else {
//     return valueList[1]
//   }
// }
// const item = getRandomValue()
// console.log(item)

// if (item.length) { // error 类型“number”上不存在属性“length”
//   console.log(item.length) // error 类型“number”上不存在属性“length”
// } else {
//   console.log(item.toFixed()) // error 类型“string”上不存在属性“toFixed”
// }

// 使用类型断言的方式来解决
// if ((item as string).length) {
//   console.log((item as string).length)
// } else {
//   console.log((item as number).toFixed())
// }

// 这样写的话，下面只要使用到item的时候，就需要写一次类型断言，很麻烦，
// 除了使用类型断言以外，还可以使用类型保护

// 1.0 自定义类型保护
// const valueList = [123, 'abc']
// const getRandomValue = () => {
//   const numbers = Math.random() * 10
//   if (numbers < 5) {
//     return valueList[0]
//   } else {
//     return valueList[1]
//   }
// }

// function isString(value: number | string): value is string {
//   return typeof value === 'string'
// }

// const item = getRandomValue()
// console.log(item)

// if (isString(item)) {
//   console.log(item.length)
// } else {
//   console.log(item.toFixed())
// }
// 但是这样定义一个函数来用于判断类型是字符串类型，难免有些复杂，因为在 JavaScript 中，只需要在 if 的判断逻辑地方使用 typeof 关键字即可判断一个值的类型。
// 所以在 TS 中，如果是基本类型，而不是复杂的类型判断，你可以直接使用 typeof 来做类型保护：\

// 2.0 typeof 类型保护
// if (typeof item === 'string') {
//   console.log(item.length)
// } else {
//   console.log(item.toFixed())
// }
// 直接写也是可以的，效果和自定义类型保护一样。但是在 TS 中，对 typeof 的处理还有些特殊要求
// 只能使用=和!两种形式来比较
// type 只能是number、string、boolean和symbol四种类型

// 错误实例
// const valueList = [{}, () => {
//   //
// }]
// const getRandomValue = () => {
//   const numbers = Math.random() * 10
//   if (numbers < 5) {
//     return valueList[0]
//   } else {
//     return valueList[1]
//   }
// }
// const res = getRandomValue()
// if (typeof res === 'object') {
//   console.log(res.toString())
// } else {
//   console.log(res()) // error 无法调用类型缺少调用签名的表达式。类型“{}”没有兼容的调用签名
// }

// 3.0 instanceof 类型保护
// instanceof操作符是 JS 中的原生操作符，它用来判断一个实例是不是某个构造函数创建的，或者是不是使用 ES6 语法的某个类创建的。在 TS 中，
// 使用 instanceof 操作符同样会具有类型保护效果

// class CreateByClass1 {
//   public age = 18
//   constructor() {
//     //
//   }
// }
// class CreateByClass2 {
//   public name = 'lison'
//   constructor() {
//     //
//   }
// }

// function getRandomItem() {
//   // 如果随机数小于0.5就返回CreateByClass1的实例，否则返回CreateByClass2的实例
//   return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2()
// }
// const item = getRandomItem()
// if (item instanceof CreateByClass1) { // 这里判断item是否是CreateByClass1的实例
//   console.log(item.age)
// } else {
//   console.log(item.name)
// }
// if 的判断逻辑中使用 instanceof 操作符判断了 item 。如果是 CreateByClass1 创建的，那么它应该有 age 属性，如果不是，那它就有 name 属性。

/**************** TS null 和 undefined ***********************/

// 在普通场景下定义一个values
// let values1 = '123'
// 相当于 string 和 undefined的联合类型
// let values2: string | undefined = '123'

// values1 = undefined
// values2 = undefined

// 所以ts中有严格模式，你可以关掉这个，只是让其显示string
// 在tsconfig.json文件中，打开strictNullChecks: true
// 那么values1 就会报错 不能将类型“undefined”分配给类型“string”

// 1.0 严格模式下null和undefined赋值给其他类型的值
// 当我们在 tsconfig.json 中将 strictNullChecks 设为 true 后，就不能再将 undefined 和 null 赋值给除它们自身和void 之外的任意类型值了，
// 但有时我们确实需要给一个其它类型的值设置初始值为空，然后再进行赋值，这时我们可以自己使用联合类型来实现 null 或 undefined 赋值给其它类型
// string|undefined、string|null和string|undefined|null是三种不同的类型。

// let str1 = 'lison'
// str1 = null // error 不能将类型“null”分配给类型“string”
// let strNull: string | null = 'lison' // 这里你可以简单理解为，string | null即表示既可以是string类型也可以是null类型
// strNull = null // right
// strNull = undefined // error 不能将类型“undefined”分配给类型“string | null”

// 2.0 可选参数和可选属性
// 如果开启了 strictNullChecks，可选参数会被自动加上 | undefined
// const sunFunc = (x: number, y?: number) {
//   return x + (y || 0)
// }
// sunFunc(1, 2) // 3
// sunFunc(1) // 1
// sunFunc(1, undefined) // 1
// sunFunc(1, null) // error Argument of type 'null' is not assignable to parameter of type 'number | undefined'
// 可以根据错误信息看出，这里的参数 y 作为可选参数，它的类型就不仅是 number 类型了，它可以是 undefined，所以它的类型是联合类型number | undefined。

// TS 对可选属性和对可选参数的处理一样，可选属性的类型也会被自动加上 | undefined。
// interface PositionInterface {
//   x: number,
//   y?: number
// }

// const position: PositionInterface = {
//   x: 12
// }
// position.y = 'abc' // error 不能将类型“"abc"”分配给类型“number | undefined”。
// position.y = undefined
// position.y = null // error 不能将类型“null”分配给类型“number | undefined”。

/**************** TS 类型保护和类型断言 ***********************/

// const getLengthFunction1 = (value: string | null): number => {
//   if (value === null) {
//     return 0
//   } else {
//     return value.length
//   }
// }
// 简写
// const getLengthFunction2 = (value: string | null): number => {
//   return (value || '').length
// }

// 当我们开启 strictNullChecks 时，有些情况下编译器是无法在我们声明一些变量前知道一个值是否是 null 的，所以我们需要使用类型断言手动指明该值不为 null。

// function getSplicedStr1(num: number | null): string {
//   function getRes(prefix: string): string {
//     // 这里使用参数num，num的类型为number或null，在运行前编译器是无法知道在运行时num参数的实际类型的，所以这里会报错，因为num参数可能为null
//     return prefix + num.toFixed().toString()
//   }
//   num = num || 0.1
//   return getRes('lison-')
// }
// 因为有嵌套函数，而编译器无法去除嵌套函数的 null（除非是立即调用的函数表达式），所以我们需要使用显式赋值断言，写法就是在不为 null 的值后面加个!。
// function getSplicedStr2(num: number | null): string {
//   function getRes(prefix: string): string {
//     // 这里使用参数num，num的类型为number或null，在运行前编译器是无法知道在运行时num参数的实际类型的，所以这里会报错，因为num参数可能为null
//     return prefix + num!.toFixed().toString()
//   }
//   num = num || 0.1
//   return getRes('lison-')
// }
// console.log(getSplicedStr2(1.2))

// num 不为 null，即便 getSplicedStr 函数在调用的时候传进来的参数是null，在 getLength函数中的 num 也不会是 null。

/**************** TS 类型别名 ***********************/
// 类型别名就是给一种类型起个别的名字，之后只要使用这个类型的地方，都可以用这个名字作为类型代替，但是它只是起了一个名字，并不是创建了一个新类型。
// 如何定义类型别名
// type TypeString = string
// let str1: TypeString
// str1 = 123 // error Type '123' is not assignable to type 'string'
// 类型别名也可以使用泛型
//  tslint自动将 type PositionType<T> = { x: T; y: T } 转换为 interface PositionType<T> {x: T, y: T}
interface PositionType<T> {x: T, y: T}
const position: PositionType<number> = {
  x: 1,
  y: -1
}
const position2: PositionType<string> = {
  x: 'right',
  y: 'top'
}
// 使用类型别名时也可以在属性中引用自己：
interface Child<T> {
  current: T
  child?: Child<T>
}
let ccc: Child<string> = {
  current: 'first',
  child: {
    // error
    current: 'second',
    child: {
      current: 'third',
      // child: 'test' // 这个地方不符合type，造成最外层child处报错
    }
  }
}
// 但是要注意，只可以在对象属性中引用类型别名自己，不能直接使用，比如下面这样是不对的：
// type Child = Child[] // error 类型别名“Child”循环引用自身
// interface Alias {
//   num: number
// }
// interface Interface {
//   num: number
// }
// let _alias: Alias = {
//   num: 123
// }
// let _interface: Interface = {
//   num: 321
// }
// _alias = _interface
// console.log(_alias)
// 那么什么时候用类型别名，什么时候用接口呢？可以通过两点来选择：
// 当你定义的类型要用于拓展，即使用 implements 等修饰符时，用接口。
// 当无法通过接口，并且需要使用联合类型或元组类型，用类型别名。

/**************** TS 字面量类型 ***********************/
// 1.0 字符串字面量
// 字符串字面量类型其实就是字符串常量，与字符串类型不同的是它是具体的值。
// type Name = 'lison'
// const name1: Name = 'test' // 不能将类型“"test"”分配给类型“"lison"”
// const name2: Name = 'lison'
// 你还可以使用联合类型来使用多个字符串：
// type Direction = 'north' | 'east' | 'south' | 'west'
// function getDirectionFirstLetter(direction: Direction) {
//   return direction.substr(0, 1)
// }
// getDirectionFirstLetter('test') // error 类型“"test"”的参数不能赋给类型“Direction”的参数
// console.log(getDirectionFirstLetter('east'))

// 2.0 数字字面量
// 数字字面量和字符串字面量类型差不多，都是指定类型为具体的值。
// type Age = 18
// interface Info {
//   name: string
//   age: Age
// }
// const info: Info = {
//   name: 'Lison',
//   // age: 28 // error 不能将类型“28”分配给类型“18”
//   age: 18
// }

/**************** TS 枚举成员类型 ***********************/
/*
  能够做类型使用的枚举要符合三个条件

  1.不带初始值的枚举成员

  2.成员的值为字符串自变量。

  3.值是数值自变量或者带有一个负号的数值自变量

  以上三种满足一个就可以。那么这个枚举值和他的枚举成员都可以做为类型来使用
*/
/**************** TS 可辨识联合 ***********************/
// 把单例类型、联合类型、类型保护和类型别名这几种类型进行合并，
// 来创建一个叫做可辨识联合的高级类型。它也可称作标签联合或代数数据类型。
/*
  所谓单例类型，你可以理解为符合单例模式的数据类型，比如枚举成员类型，字面量类型。
  可辨识联合要求具有两个要素
  1. 具有普通的单例类型属性（这个要作为辨识的特征，也是重要因素）。
  2. 一个类型别名，包含了那些类型的联合（即把几个类型封装为联合类型，并起一个别名）。
 */
// interface Square {
//   kind: 'square' // 这个就是具有辨识性的属性
//   size: number
// }
// interface Rectangle {
//   kind: 'rectangle' // 这个就是具有辨识性的属性
//   height: number
//   width: number
// }
// interface Circle {
//   kind: 'circle' // 这个就是具有辨识性的属性
//   radius: number
// }
// type Shape = Square | Rectangle | Circle // 这里使用三个接口组成一个联合类型，并赋给一个别名Shape，组成了一个可辨识联合。
// function getArea(s: Shape) {
//   switch (s.kind) {
//     case 'square':
//       return s.size * s.size
//     case 'rectangle':
//       return s.height * s.width
//     case 'circle':
//       return Math.PI * s.radius ** 2
//   }
// }
// 这里有个 ES7 的新特性：** 运算符，两个*符号组成的这个运算符就是求幂运算符，2 ** 3 ==> 8

// 看了上面的例子，你可以看到我们的函数内应该包含联合类型中每一个接口的 case。但是如果遗漏了，我们希望编译器应该给出提示。所以我们来看下两种完整性检查的方法：

// (1) 利用strictNullChecks
// 我们可以开启 strictNullChecks，然后让函数的返回值类型为 number，那么当返回 undefined 的时候，就会报错
// interface Square {
//   kind: 'square'
//   size: number
// }
// interface Rectangle {
//   kind: 'rectangle'
//   height: number
//   width: number
// }
// interface Circle {
//   kind: 'circle'
//   radius: number
// }
// interface Triangle {
//   kind: 'triangle'
//   bottom: number
//   height: number
// }
// type Shape = Square | Rectangle | Circle | Triangle // 这里我们在联合类型中新增了一个接口，但是下面的case却没有处理Triangle的情况
// function getArea(s: Shape): number { // 函数缺少结束返回语句，返回类型不包括 "undefined"。
//   switch (s.kind) {
//     case 'square':
//       return s.size * s.size
//     case 'rectangle':
//       return s.height * s.width
//     case 'circle':
//       return Math.PI * s.radius ** 2
//   }
// }

// 这种方法简单，但是对旧代码支持不好，因为strictNullChecks这个配置项是2.0版本才加入的，如果你使用的是低于这个版本的，这个方法并不会有效。

// (1) 利用never 类型
// 函数返回一个错误或者不可能有返回值的时候，返回值类型为 never。所以我们可以给 switch 添加一个 default 流程，当前面的 case 都不符合的时候，会执行 default 后的逻辑
// function assertNever(value: never): never {
//   throw new Error('Unexpected object: ' + value)
// }
// function getArea(s: Shape) {
//   switch (s.kind) {
//     case 'square':
//       return s.size * s.size
//     case 'rectangle':
//       return s.height * s.width
//     case 'circle':
//       return Math.PI * s.radius ** 2
//     default:
//       // return assertNever(s) // error 类型“Triangle”的参数不能赋给类型“never”的参数
//   }
// }
// 采用这种方式，需要定义一个额外的 asserNever 函数，但是这种方式不仅能够在编译阶段提示我们遗漏了判断条件，而且在运行时也会报错。
