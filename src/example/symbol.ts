// const s1 = Symbol()
// console.log(s1)

// const s2 = Symbol()
// console.log(s2)

// console.log(s1 === s2) // 会有错误提示，因为s1永远不会等于s2， 但是放在浏览器中使用的时候，会显示出来

// const s3 = Symbol({ a: 'a' }) // Symbol里面的值，只能是number或者字符串，对象会报错

// const s4 = Symbol('Alfred')
// console.log(s4)
// console.log(s4.toString())
// console.log(Boolean(s4))   // --> true
// console.log(!s4)    // --> false

/**************** 2.3.1作为属性名 ***********************/
// let prop = 'name'
// const info = {
//   name: 'Alfred'
// }
// console.log(info)

// 在es6可以直接将一个变量或者其他表达式作为属性名
// let prop = 'name'
// const info = {
//   [prop]: 'Alfred'
// }
// console.log(info)

// 还可以进行字符串拼接
let prop = 'name'
const info = {
  [`my${prop}is`]: 'Alfred'
}
console.log(info)

const s5 = Symbol('name')
const info2 = {
  [s5]: 'lison',
  age: 18,
  sex: 'man'
}

/**************** 2.3.2属性名遍历 ***********************/
// 可以看到打印出来对象的属性名是Symbol值，如果我们想访问这个属性值，就只能使用name这个symbol值
console.log('createInfo2', info2)
info2[s5] = 'haha'
console.log('newInfo2', info2)

// Symbol作为属性名的时候。有几种方式，获取不到symbol的值
// 方式一（for in 循环）
for (const key in info2) {
  console.log('for in :',key)
}
// 在打印值中，我们可以看到只有age和sex属性，symbol值作为属性名的没有打印出来

// 方式二(使用Object.keys()方法)
// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 

console.log('Object.keys(info2):', Object.keys(info2))

// 方法三(使用Object.getOwnPropertyNames())
// Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

console.log('Object.getOwnPropertyNames(info2) : ',Object.getOwnPropertyNames(info2))

// 方法四(使用JSON.stringify())
console.log('JSON.stringify(info2): ', JSON.stringify(info2))

// 以上四种方法都是获取不到symbol的值的，那么通过什么方法可以获取到symbol的值呢

// 可以获取到symbol的属性名
// 方法一(Object.getOwnPropertySymbols())
// Object.getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组。
console.log('Object.getOwnPropertySymbols(info2): ', Object.getOwnPropertySymbols(info2))

// 方法二(使用Es6的Reflect.ownKeys(info2))
console.log('Reflect.ownKeys(info2): ', Reflect.ownKeys(info2))


/**************** 2.3.3 Symbol.for()和 Symbol.keyFor() ***********************/
// Symbol有两个静态方法，for和keyfor
const s6 = Symbol("lison");
const s7 = Symbol("lison");
const s8 = Symbol.for("lison");
const s9 = Symbol.for("lison");
// s3 === s4; // true
// s1 === s3; // false

console.log('Symbol.keyFor(s8)', Symbol.keyFor(s8))

/**************** 2.3.3 11 个内置 symbol 值 ***********************/
// 1、Symbol.hasInstance
// const obj1 = {
//   [Symbol.hasInstance] (otherObj) {
//     console.log(otherObj);
//   }
// };
// console.log({ a: "a" } instanceof <any>obj1)

// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。


// class C extends Array {
//   static get [Symbol.species]() {
//     return Array;
//   }
//   getName() {
//     return "lison";
//   }
// }
// const c = new C(1, 2, 3);
// const a = c.map(item => item + 1);
// console.log(a); // [2, 3, 4]
// console.log(a instanceof C); // false
// console.log(a instanceof Array); // true
// console.log(a.getName()); // error a.getName is not a function