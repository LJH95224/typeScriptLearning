/**************** TS this类型 ***********************/
// 在 JavaScript 中，this 可以用来获取对全局对象、类实例对象、构建函数实例等的引用，在 TypeScript 中，this 也是一种类型，我们先来看个计算器 Counter 的例子：
// class Counters {
//   constructor(public count: number = 0) {
//     //
//   }
//   public add(value: number) {
//     this.count += value
//     return this
//   }
//   public subtract(value: number) {
//     this.count -= value
//     return this
//   }
// }

// let counter1 = new Counters(10)
// console.log(counter1.add(3).subtract(1))

// class PowCounter extends Counters {
//   constructor(public count: number = 0) {
//     super(count)
//   }
//   public pow(value: number) {
//     this.count = this.count ** value
//     return this
//   }
// }

// let powCounter = new PowCounter(2)
// console.log(powCounter.pow(3).add(1).subtract(2))

/**************** TS 索引类型 ***********************/
/**
 * 包含两个内容
 * 1、索引类型操作符
 * 2、索引访问
 */
// 1. 索引类型操作符
// 索引类型查询操作符就是keyof这个操作符，它连接一个类型然后返回由这个类型的所有索引属性名组成的联合类型

// keyof
// interface InfoInterfaceAdvanced {
//   name: string
//   age: number
// }

// let infoProp: keyof InfoInterfaceAdvanced
// infoProp = 'name'
// infoProp = 'age'
// infoProp = 'sex' // 不能将类型“"sex"”分配给类型“"name" | "age"”。

// 通过和泛型结合使用，TS 就可以检查使用了动态属性名的代码
// 这里使用泛型，并且约束泛型变量K的类型是"keyof T"，也就是类型T的所有字段名组成的联合类型
// function getValue<T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> {
//   return names.map((n) => obj[n]) // 指定getValue的返回值类型为T[K][]，即类型为T的值的属性值组成的数组
// }

// const info = {
//   name: 'lison',
//   age: 18
// }

// let infoValues = getValue(info, ['name', 'age'])
// console.log(infoValues)

// let infoValues2: string[] = getValue(info, ['name', 'age'])
// 报错： age 是number 属性的值

// let infoValues3: Array<string | number> = getValue(info, ['name', 'age'])
// console.log(infoValues3)

// 2.0 索引访问操作符
// 索引访问操作符也就是[]，其实和我们访问对象的某个属性值是一样的语法，但是在 TS 中它可以用来访问某个属性的类型
// interface InfoInterfaceAdvanced {
//   name: string
//   age: number
// }
// type NameType = InfoInterfaceAdvanced['name']

// function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
//   return o[name] // o[name] is of type T[K]
// }
// 两个参数的类型分别为泛型 T 和 K，而函数的返回值类型为T[K]，只要函数的返回值也是这种形式，即访问参数 o 的参数 name 属性
// interface Obj<T> {
//   [key: string]: T
// }
// let key: keyof Obj<number> // keys的类型为number | string
// key = 123 // right
// 也可以使用访问操作符，获取索引签名的类型：

// interface Obj1<T> {
//   [key: string]: T
// }
// const obj1: Obj<number> = {
//   age: 18
// }
// let value1: Obj<number>['age'] // value的类型是number，也就是name的属性值18的类型
// 还有一点，我们在讲后面知识的时候会遇到，就是当tsconfig.json里strictNullChecks设为false时，通过Type[keyof Type]获取到的，
// 是除去never & undefined & null这三个类型之后的字段值类型组成的联合类型，来看例子：

// interface Type {
//   a: never
//   b: never
//   c: string
//   d: number
//   e: undefined
//   f: null
//   g: object
// }
// type test = Type[keyof Type]
// test的类型是string | number | object

/**************** TS 映射类型 ***********************/

// 1.0 基础
// TS提供了借助旧类型创建一个新类型的方式，也就是映射类型
// interface Info1 {
//   age: number
// }
// interface ReadonlyType {
//   readonly age: number
// }

// 创建没个属性都是只读的接口
// interface Info1 {
//   age: number
//   name: string
//   sex: string
// }

// type ReadonlyType<T> = {
//   readonly [P in keyof T]: T[P] // 这里定义了一个ReadonlyType<T>映射类型
// }

// type ReadonlyInfo1 = ReadonlyType<Info1>

// let info11: ReadonlyInfo1 = {
//   age: 18,
//   name: 'lison',
//   sex: 'man'
// }
// console.log(ReadonlyInfo1)

// info11.age = 28 // error Cannot assign to 'age' because it is a constant or a read-only property

// 创建每个属性都是可选属性的接口
// interface Info {
//   age: number
// }

// type ReadonlyType<T> = {
//   readonly [P in keyof T]? : T[P]
// }

// type ReadonlyInfo1 = ReadonlyType<Info>
// let info: ReadonlyInfo1 = {}

// console.log(info)

// Readonly和Partial
// type Pick<T, K extends keyof T> = { [P in K]: T[P] }
// type Record<K extends keyof any, T> = { [P in K]: T }

// interface Info {
//   name: string
//   age: number
//   address: string
// }

// const info: Info = {
//   name: 'lison',
//   age: 18,
//   address: 'beijing'
// }

// function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
//   const res = {} as Pick<T, K>
//   keys.forEach((key) => {
//     res[key] = obj[key]
//   })
//   return res
// }

// const nameAddress = pick(info, ['name', 'address'])
// console.log(nameAddress)

// Record，它适用于将一个对象中的每一个属性转换为其他值的场景
// function mapObject<K extends string | number, T, U>(
//   obj: Record<K, T>,
//   f: (x: T) => U
//   ): Record<K, U> {
//     const res: any = {}
//     for (const key in obj) {
//       res[key] = f(obj[key])
//     }
//     return res
// }

// const names = {
//   0: 'hello',
//   1: 'world',
//   2: 'bye'
// }

// const lengths = mapObject(names, (s) => s.length)
// console.log(lengths) // { 0: 5, 1: 5, 2: 3 }
// 同态在维基百科的解释是：两个相同类型的代数结构之间的结构保持映射。这四个内置映射类型中，Readonly、Partial 和 Pick 是同态的，
// 而 Record 不是，因为 Record 映射出的对象属性值是新的，和输入的值的属性值不同。

// 2.0 由映射类型进行推断
// 我们学习了使用映射类型包装一个类型的属性后，也可以进行逆向操作，也就是拆包，先来看我们的包装操作

// interface Proxy<T> { // 这里定义一个映射类型，他将一个属性拆分成get/set方法
//   get(): T
//   set(value: T): void
// }
// type Proxify<T> = { [P in keyof T]: Proxy<T[P]> } // 这里再定义一个映射类型，将一个对象的所有属性值类型都变为Proxy<T>处理之后的类型
// function proxify<T>(obj: T): Proxify<T> { // 这里定义一个proxify函数，用来将对象中所有属性的属性值改为一个包含get和set方法的对象
//   const result = {} as Proxify<T>
//   for (const key in obj) {
//     result[key] = {
//       get: () => obj[key],
//       set: (value) => (obj[key] = value)
//     }
//   }
//   return result
// }
// let props = {
//   name: 'lison',
//   age: 18
// }

// let proxyProps = proxify(props)
// console.log(proxyProps.name.get()) // "lison"
// proxyProps.name.set('li')
// // 这里查询 proxyProps 的时候没有任何值，当调用方法的时候，才回显示值
// console.log(proxyProps.name.get())

// // 如何将其拆包
// function unproxify<T>(t: Proxify<T>): T { // 这里我们定义一个拆包函数，其实就是利用每个属性的get方法获取到当前属性值，然后将原本是包含get和set方法的对象改为这个属性值
//   const result = {} as T
//   for (const k in t) {
//     result[k] = t[k].get() // 这里通过调用属性值这个对象的get方法获取到属性值，然后赋给这个属性，替换掉这个对象
//   }
//   return result
// }
// let originalProps = unproxify(proxyProps)
// console.log(originalProps)

// 3.0 增加或者移除特定修饰符
// 使用+和-符号作为前缀来指定增加还是删除修饰符
// interface Info {
//   name: string
//   age: number
// }

// type AddReadOnlyType<T> = {
//   + readonly [P in keyof T]+? : T[P]
// }

// type AddReadOnlyInfo = AddReadOnlyType<Info>

// type RemoveReadOnlyType<T> = {
//   - readonly [P in keyof T]-?: T[P]
// }

// type RemovereadOnlyInfo = RemoveReadOnlyType<AddReadOnlyInfo>

// 4.0 keyof 和映射类型在 2.9 的升级
// TS 在 2.9 版本中，keyof 和映射类型支持用 number 和 symbol 命名的属性

// const stringIndex = 'a'
// const numberIndex = 1
// const symbolIndex = Symbol()
// interface Obj {
//   [stringIndex]: string
//   [numberIndex]: number
//   [symbolIndex]: symbol
// }

// type keys = keyof Obj
// let key1: keys = 2
// let key2: keys = 1
// let key3: keys = 'b'
// let key4: keys = 'a'
// let key5: keys = Symbol()
// let key6: keys = symbolIndex

// type ReadonlyType<T> = {
//   readonly [P in keyof T]: T[P]
// }

// let objInit2: ReadonlyType<Obj> = {
//   a: 'aa',
//   1: 11,
//   [symbolIndex]: Symbol()
// }

// objInit2.a = 'bb' // error Cannot assign to 'a' because it is a read-only property
// objInit2[1] = 22 // error Cannot assign to '1' because it is a read-only property
// objInit2[symbolIndex] = Symbol() // error Cannot assign to '[symbolIndex]' because it is a read-only propert

// 5.0 元组和数组上的映射类型

// type MapToPromise<T> = {
//   [K in keyof T]: Promise<T[K]>
// }

// type Tuple = [number, string, boolean]
// type PromiseTuple = MapToPromise<Tuple>
// let tuple1: PromiseTuple = [
//   new Promise((resolve, reject) => resolve(1)),
//   new Promise((resolve, reject) => resolve('a')),
//   new Promise((resolve, reject) => resolve(false))
// ]

// console.log(tuple1)

/**************** TS 映射类型 ***********************/
// 学习完交叉类型、联合类型、类型断言、映射类型、索引后，我们就可以补充一个基础类型中没有讲的知识了，
// 就是 TS 在 3.0 版本新增的顶级类型 unknown。它相对于 any 来说是安全的。关于 unknown 类型，有如下几点需要注意

// 1.0  任何类型的值都可以赋值给 unknown 类型
// let value1: unknown
// value1 = 'a'
// value1 = 123

// 2.0 如果没有类型断言或基于控制流的类型细化时 unknown 不可以赋值给其它类型，此时它只能赋值给 unknown 和 any 类型
// let value2: unknown
// let value3: string = value2 // error 不能将类型“unknown”分配给类型“string”
// value1 = value2

// 3.0 如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作
// let value4: unknown
// value4 += 1 // error 对象的类型为 "unknown"

// 4.0 unknown 与任何其他类型组成的交叉类型，最后都等于其他类型
// type type1 = unknown & string // type1 => string
// type type2 = number & unknown // type2 => number
// type type3 = unknown & unknown // type3 => unknown
// type type4 = unknown & string[] // type4 => string[]

// 5.0 unknown 与任何其它类型组成的联合类型，都等于 unknown 类型，但只有any例外，unknown与any组成的联合类型等于any)
// type type5 = string | unknown // type5 => unknown
// type type6 = any | unknown // type6 => any
// type type7 = number[] | unknown // type7 => unknown

// 6.0 never 类型是 unknown 的子类型
// type type8 = never extends unknown ? true : false // type8 => true

// 7.0 keyof unknown 等于类型 never
// type type9 = keyof unknown // type9 => never

// 8.0 只能对 unknown 进行等或不等操作，不能进行其它操作
// tslint:disable-next-line: no-unused-expression
// value1 === value2
// tslint:disable-next-line: no-unused-expression
// value1 !== value2
// value1 += value2 // error

// 9.0 unknown 类型的值不能访问其属性、作为函数调用和作为类创建实例
// let value5: unknown
// value5.age // error
// value5() // error
// new value5() // error

// 10.0 使用映射类型时如果遍历的是 unknown 类型，则不会映射任何属性
// type Types<T> = { [P in keyof T]: number }
// type type10 = Types<any> // type10 => { [x: string]: number }
// type type11 = Types<unknown> // type10 => {}
// 我们在实际使用中，如果有类型无法确定的情况，要尽量避免使用 any，因为 any 会丢失类型信息，一旦一个类型被指定为 any，那么在它上面进行任何操作都是合法的，
// 所以会有意想不到的情况发生。因此如果遇到无法确定类型的情况，要先考虑使用 unknown。

/**************** TS 条件类型 ***********************/

// (1) 基础使用
// 条件类型从语法上看它像是三元操作符。它会以一个条件表达式进行类型关系检测，然后在后面两种类型中选择一个
// T extends U ? X : Y

// type Type<T> = T extends string ? string : number
// let index: Type<'a'>
// let index2: Type<false> // index2的类型为number

// (2) 分布式条件类型
// 当待检测的类型是联合类型，则该条件类型被称为“分布式条件类型”，在实例化时会自动分发成联合类型
// type TypeName<T> = T extends any ? T : never
// type Type1 = TypeName<string | number> // Type1的类型是string|number

// 复杂例子
// type TypeName<T> =
//   T extends string ? string :
//   T extends number ? number :
//   T extends boolean ? boolean :
//   T extends undefined ? undefined :
//   T extends () => void ? () => void :
//   object

// type Type1 = TypeName<() => void>
// type Type2 = TypeName<string[]>
// type Type3 = TypeName<(() => void) | string[] >

// 我们来看一个分布式条件类型的实际应用
// type Diff<T, U> = T extends U ? never : T
// type Test = Diff<string | number | boolean, undefined | number>

// type Type<T> = {
//   [K in keyof T]: T[K] extends Function ? K : never
// }[keyof T]

// interface Part {
//   id: number
//   name: string
//   subparts: Part[]
//   updatePart(newName: string): void
// }

// type Test = Type<Part> // Test的类型为"updatePart"

// (3) 条件类型的类型推断-infer
// 条件类型提供一个infer关键字用来推断类型
// 需求： 如果传入的类型是一个数组，则返回它元素的类型；如果是一个普通类型，则直接返回这个类型。
// type Type<T> = T extends any[] ? T[number] : T
// type test = Type<string[]> // test的类型为string
// type test2 = Type<string> // test2的类型为string

// 我们来看下怎么使用 infer
// type Type<T> = T extends Array<infer U> ? U : T
// type test = Type<string[]> // test的类型为string
// type test2 = Type<string> // test2的类型为string
// 这里 infer 能够推断出 U 的类型，并且供后面使用，你可以理解为这里定义了一个变量 U 来接收数组元素的类型。

// (4) TS 预定义条件类型
// Exclude<T, U>，从 T 中去掉可以赋值给 U 的类型
type Type = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
// Type => 'c'
type Type2 = Exclude<string | number | boolean, string | number>
// Type2 => boolean

// Extract < T, U >，选取 T 中可以赋值给 U 的类型
type Type3 = Extract<'a' | 'b' | 'c', 'a' | 'c' | 'f'>
// Type => 'a' | 'c'
type Type4 = Extract<number | string | boolean, string | boolean>
// Type2 => string | boolean

// NonNullable，从 T 中去掉 null 和 undefined：
type Type5 = NonNullable<string | number | undefined | null>
// Type => string | number

// ReturnType，获取函数类型返回值类型：
type Type6 = ReturnType<() => string>
// Type => string
type Type7 = ReturnType < (arg: number) => void>
// Type2 => void

// InstanceType，获取构造函数类型的实例类型
class A {
  constructor() {
    //
  }
}
type T1 = InstanceType<typeof A> // T1的类型为A
type T2 = InstanceType<any> // T2的类型为any
type T3 = InstanceType<never> // T3的类型为never
// type T4 = InstanceType<string> // error
// T1 的定义中，typeof A返回的的是类 A 的类型，
// 也就是 A，这里不能使用 A 因为它是值不是类型，类型 A 是构造函数，
// 所以 T1 是 A 构造函数的实例类型，也就是 A；T2 传入的类型为 any，
// 因为 any 是任何类型的子类型，所以它满足T extends new (…args: any[]) => infer R，
//  这里 infer 推断的 R 为 any；传入 never 和 any 同理。传入 string 时因为 string 不能不给构造函数类型，所以报错。
