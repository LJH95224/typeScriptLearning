/**************** TS 类型推论 ***********************/

//  1.0 基础
// let name = 'lison'

// tslint:disable-next-line: max-line-length
// name = 123 // error: 报错，TypeScript 根据我们赋给 name 的值的类型，推断出我们的 name 的类型，这里是 string 类型，当我们再给 string 类型的 name 赋其他类型值的时候就会报错。

// 2.0 多类型联合
// 当我们定义一个数组或元组这种包含多个元素的值的时候，多个元素可以有不同的类型，这种时候 TypeScript 会将多个类型合并起来，组成一个联合类型

// let arr = [1, 'a']
// arr = ["b", 2, false]; // error 不能将类型“false”分配给类型“string | number”

// 3.0 上下文类型
// 如果此处显示event 的类型是any的话，则可以自己设置为MouseEvent
// window.onmousedown = (event: MouseEvent) => {
//   console.log(event.a) // error: 访问出错，a 不属于鼠标对象的必有属性和方法
// }

/**************** TS 类型兼容性 ***********************/

// 1 基础
// interface InfoInterface {
//   name: string,
//   info: { age: number }
// }

// let infos: InfoInterface

// const infos1 = { name: 'lison', info: { age: 18} }
// const infos2 = { age: 18 }
// const infos3 = { name: 'lison', age: 18 }
// infos = infos1
// console.log(infos)

// 2 函数兼容性
// (1) 函数参数个数
// 函数参数个数如果要兼容，需要满足一个要求：如果对函数 y 进行赋值，
// 那么要求 x 中的每个参数都应在 y 中有对应，也就是 x 的参数个数小于等于 y 的参数个数，

// let x = (a: number) => 0
// let y = (b: number, c: string) => 0

// y = x // 没问题
// x = y // // error Type '(b: number, s: string) => number' is not assignable to type '(a: number) => number'

// const arr = [1, 2, 3]
// arr.forEach((item, index, array) => {
//   console.log(item)
// })
// arr.forEach((item) => {
//   console.log(item)
// })

// (2) 函数参数类型
// 除了参数个数，参数的类型需要对应：
// let x = (a: number) => 0
// let y = (b: string) => 0
// let z = (c: string) => false
// x = y // error 不能将类型“(b: string) => number”分配给类型“(a: number) => number”。
// x = z // error 不能将类型“(c: string) => boolean”分配给类型“(a: number) => number”。

// (3) 剩余参数和可选参数
// 当要被赋值的函数参数中包含剩余参数（…args）时，赋值的函数可以用任意个数参数代替，但是类型需要对应。
const getNum = ( // 这里定义一个getNum函数，他有两个参数
  arr: number[], // 第一个参数是一个数组
  callback: (...args: number[]) => number, // 第二个参数是一个函数，这个函数的类型要求可以传入任意多个参数，但是类型必须是数值类型，返回值必须是数值类型
): number => {
  return callback(...arr) // 这个getNum函数直接返回调用传入的第二个参数这个函数，以第一个参数这个数组作为参数的函数返回值
}
// const res = getNum(
//   [1, 2],
//   // (...args: number[]): number => args.length, // 这里传入一个函数，逻辑是返回参数的个数
//   (...args: number[]): number => args.reduce((a, b) => a + b, 0),
// )
// console.log(res)

// 上面的可以使用任意个参数，下面只能用3个参数
// const res = getNum(
//   [1, 2, 3],
//   // (...args: number[]): number => args.length, // 这里传入一个函数，逻辑是返回参数的个数
//   (arg1: number, arg2: number, arg3: number): number => arg1 + arg2 + arg3,
// )
// console.log(res)

// (4) 函数参数双向协变
// 函数参数双向协变即参数类型无需绝对相同
let funcA = (arg: number | string): void => {
  //
}
let funcB = (arg: number): void => {
  //
}
// funcA = funcB 和 funcB = funcA都可以
// 在这个例子中，funcA 和 funcB 的参数类型并不完全一样，funcA 的参数类型为一个联合类型 number | string，
// 而 funcB 的参数类型为 number | string 中的 number，他们两个函数也是兼容的。

// (5) 函数返回值类型
let x = (a: number): string | number => 0
let y = (b: number) => 'a'
let z = (c: number) => false
x = y
// x = z // 不能将类型“(c: number) => boolean”分配给类型“(a: number) => string | number”

// (6) 函数重载
// 带有重载的函数，要求被赋值的函数的每个重载都能在用来赋值的函数上找到对应的签名，
// function merge(arg1: number, arg2: number): number // 这是merge函数重载的一部分
// function merge(arg1: string, arg2: string): string // 这也是merge函数重载的一部分
// function merge(arg1: any, arg2: any) { // 这是merge函数实体
//   return arg1 + arg2
// }
// console.log(merge(1, 2))
// console.log(merge('1', '2'))
// console.log(merge('1', '2').length)

// function sum(arg1: number, arg2: number): number
// function sum(arg1: any, arg2: any): any {
//   return arg1 + arg2
// }

// let func = merge
// func = sum // sum函数的重载缺少参数都为string返回值为string的情况，与merge函数不兼容，所以赋值时会报错。

// 2. 枚举
// 数字枚举成员类型与数字类型互相兼容，
// enum Status {
//   On,
//   Off,
// }
// let s = Status.On
// s = 1
// s = 3
// 虽然Status.On的值是0，但是这里数字枚举成员类型和数值类型互相兼容，所以这里给s赋值为3也没问题。

// 但是不同枚举值之间是不兼容的
// enum Status {
//   On,
//   Off
// }
// enum Color {
//   White,
//   Black
// }
// let s = Status.On
// s = Color.White // error Type 'Color.White' is not assignable to type 'Status'
//  Status.On 和 Color.White 的值都是 0，但它们是不兼容的。

// 字符串枚举成员类型和字符串类型是不兼容的
// enum Status {
//   On = 'on',
//   Off = 'off'
// }
// let s = Status.On
// s = 'Lison' // error 不能将类型“"Lison"”分配给类型“Status”
// 因为字符串字面量类型'Lison'和Status.On是不兼容的。

// 3. 类
// 较两个类类型的值的兼容性时，只比较实例的成员，类的静态成员和构造函数不进行比较
// class Animal {
//   public static age: number
//   constructor(public name: string) {}
// }

// class People {
//   public static age: number
//   constructor(public name: string) { }
// }

// class Food {
//   constructor(public name: number) { }
// }
// let a: Animal
// let p: People
// let f: Food
// a = p // right
// a = f // error Type 'Food' is not assignable to type 'Animal'

// 类的私有成员和受保护成员
// class Parent {
//   private age: number
//   constructor() {
//     //
//   }
// }
// class Children extends Parent {
//   constructor() {
//     super()
//   }
// }

// class Other {
//   private age: number
//   constructor() {
//     //
//   }
// }

// const children: Parent = new Children()
// const other: Parent = new Other() // 不能将类型“Other”分配给类型“Parent”。类型具有私有属性“age”的单独声明

// 泛型的兼容性
// 泛型包含类型参数，这个类型参数可能是任意类型，使用时类型参数会被指定为特定的类型，而这个类型只影响使用了类型参数的部分。

// interface Data<T> {}
// let data1: Data<number>
// let data2: Data<string>

// data1 = data2
// data1 和 data2 都是 Data 接口的实现，但是指定的泛型参数的类型不同，TS 是结构性类型系统，
// 所以上面将 data2 赋值给 data1 是兼容的，因为 data2 指定了类型参数为 string 类型，但是接口里没有用到参数 T，所以传入 string 类型还是传入 number 类型并没有影响。
// interface Data<T> {
//   data: T
// }
// let data1: Data<number>
// let data2: Data<string>

// data1 = data2 // error 不能将类型“Data<string>”分配给类型“Data<number>”。不能将类型“string”分配给类型“number”
// 赋值时报错，因为 data1 和 data2 传入的泛型参数类型不同，生成的结果结构是不兼容的。
