/**************** 2.9.1 简单使用 ***********************/
// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
// const getArray = <T>(value: T, times: number = 5): T[] => {
//   return new Array(times).fill(value);
// }

// getArray<number[]>([1, 2], 3).forEach((item) => {
//   console.log(item.length);
// });
// getArray<number>(2, 3).forEach((item) => {
//   console.log(item.length); // 类型“number”上不存在属性“length”
// });

/**************** 2.9.2 泛型变量 ***********************/
// const getLength = <T, U>(param1: T, params2: U, times: number): Array<[T, U]> => {
//   return new Array(times).fill([param1, param2]);
// }

// getArray(1, "a", 3).forEach((item) => {
//   console.log(item[0].length); // error 类型“number”上不存在属性“length”
//   console.log(item[1].toFixed(2)); // error 属性“toFixed”在类型“string”上不存在
// });

/**************** 2.9.3 泛型函数类型 ***********************/

/**************** 2.9.4 泛型约束 ***********************/
// interface ValueWithLength {
//   length: number;
// }
// const getLength = <T extends ValueWithLength>(param: T): number => {
//   return param.length;
// };
// getLength("abc"); // 3
// getLength([1, 2, 3]); // 3
// getLength({ length: 3 }); // 3
// getLength(123); // error 类型“123”的参数不能赋给类型“ValueWithLength”的参数

/**************** 2.9.5 在泛型约束中使用类型参数 ***********************/
// const getProp = <T, K extends keyof T>(object: T, propName: K) => {
//   return object[propName];
// };
// const obj = { a: "aa", b: "bb" };
// getProp(obj, "c"); // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数
