/**************** 2.8.1 为函数定义类型 ***********************/
// function add1(arg1: number, arg2: number): number {
//   return arg1 + arg2;
// }
// // 或者
// const add2 = (arg1: number, arg2: number): number => {
//   return arg1 + arg2;
// };

/**************** 2.8.2 完成的函数类型 ***********************/
// 一个函数的定义包括函数名、参数、逻辑和返回值。我们为一个函数定义类型时，完整的定义应该包括参数类型和返回值类型。
// let add: (x: number, y: number) => number;
// add = (arg1: number, arg2: number): number => arg1 + arg2;
// add = (arg1: string, arg2: string): string => arg1 + arg2; // error

// 我们首先定义了一个变量 add，给它指定了函数类型，也就是(x: number, y: number) => number，
// 这个函数类型包含参数和返回值的类型。然后我们给 add 赋了一个实际的函数，这个函数参数类型和返回类型都和函数类型中定义的一致，所以可以赋值。
// 后面我们又给它赋了一个新函数，而这个函数的参数类型和返回值类型都是 string 类型，这时就会报如下错误：

// 函数中如果使用了函数体之外定义的变量，这个变量的类型是不体现在函数类型定义的。
// let arg3 = 3
// add = (arg1: number, arg2: number): number => arg1 + arg2 + arg3

/**************** 2.8.3 使用接口定义函数类型 ***********************/
// interface Add {
//   (x: number, y: number): number;
// }
// let add: Add = (arg1: string, arg2: string): string => arg1 + arg2;
// error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
// 这里我们通过接口的形式定义函数类型，这个接口Add定义了这个结构是一个函数，两个参数类型都是number类型，返回值也是number类型。
// 然后我们指定变量add类型为Add时，再要给add赋值，就必须是一个函数，且参数类型和返回值类型都要满足接口Add，
// 显然例子中这个函数并不满足条件，所以报错了。

/**************** 2.8.4 使用类型别名 ***********************/

// type Add = (x: number, y: number) => number;
// let add: Add = (arg1: string, arg2: string): string => arg1 + arg2;
// error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
// 使用type关键字可以为原始值、联合类型、元组以及任何我们定义的类型起一个别名。上面定义了 Add 这个别名后，Add就成为了一个和(x: number, y: number) => number一致的类型定义。
// 例子中定义了Add类型，指定add类型为Add，但是给add赋的值并不满足Add类型要求，所以报错了

/**************** 2.8.5 可选参数 ***********************/
type AddFunction = (arg1: number, arg2: number, arg3?: number) => number
let addFunction: AddFunction
addFunction = (x: number, y: number) => x + y
let addFunction1: AddFunction = (x: number, y: number, z: number) => x + y + z

// tslint:disable-next-line: no-console
console.log(addFunction(1, 2))
// tslint:disable-next-line: no-console
console.log(addFunction1(1, 2, 3))

/*
*  类型兼容
*  如果类型A可以被赋值给类型B,那么就可以说类型B兼容类型A
*  如果 : B(目标类型) = A(源类型) ,	则 : 类型B兼容类型A
*  之前的例子中,我们就遇到过number和null的兼容问题:
*  在tsconfig.json中strictNullChecks = false时(默认true),字符串变量是可以被赋值为null类型的
*/

/**************** 2.8.6 默认参数 ***********************/

// const add = (x: number, y = 2) => {
//   return x + y;
// };
// add(1, "a"); // error 类型"string"的参数不能赋给类型"number"的参数
// 当然了，你也可以显式地给 y 设置类型：

// const add = (x: number, y: number = 2) => {
//   return x + y;
// };

/**************** 2.8.7 剩余参数 ***********************/

// js代码
// function handleData() {
//   if (arguments.length === 1 ) {
//     return arguments[0] * 2
//   } else if (arguments.length === 2 ) {
//     return arguments[0] * arguments[1]
//   } else {
//     Array.prototype.slice.apply(arguments).join('_')
//   }
// }

// console.log(handleData(2)) // 4
// console.log(handleData(2, 3)) // 6
// console.log(handleData(2, 3, 3, 4)) // 2_3_3_4

// es6
// const handleData = (...args) => {
//   console.log(args)
// }
// console.log(handleData(2)) // [2]
// console.log(handleData(2, 3)) // [2, 3]
// console.log(handleData(2, 3, 3, 4)) // [2, 3, 3, 4]

// const handleData = (arg1: number, ...args: number[]) => {
//   //
// };
// handleData(1, "a"); // error 类型"string"的参数不能赋给类型"number"的参数

/**************** 2.8.8 函数重载 此重载vs彼重载 ***********************/
// function handleData(x: string): string[]; // 这个是重载的一部分，指定当参数类型为string时，返回值为string类型的元素构成的数组
// function handleData(x: number): string; // 这个也是重载的一部分，指定当参数类型为number时，返回值类型为string
// function handleData(x: any): any { // 这个就是重载的内容了，他是实体函数，不算做重载的部分
//   if (typeof x === "string") {
//     return x.split("");
//   } else {
//     return x
//       .toString()
//       .split("")
//       .join("_");
//   }
// }
// handleData("abc").join("_");
// handleData(123).join("_"); // error 类型"string"上不存在属性"join"
// handleData(false); // error 类型"boolean"的参数不能赋给类型"number"的参数。
