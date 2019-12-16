// [2] import语句
// import { name } from './b'
// console.log(name)

// import * as info from './b'
// console.log(info)

// import { name as nameProp } from './b'
// console.log(nameProp)

// import * as AData from './a'
// console.log(AData)

// 这种引用只能引用适合全局作用的逻辑而不是要再一次加工或者使用
// import './a'

// import name from './c'
// console.log(name)

/*
TypeScript可以将代码编译为CommonJS、AMD或其它模块系统代码，同时会生成对应的声明文件。我们知道
CommonJS和AMD两种模块系统语法是不兼容的，所以TypeScript为了兼容这两种语法，使得我们编译后的声明文
件同时支持这两种模块系统，增加了 export = 和 import xx = require() 两个语句。
*/

// import name = require('./c')
// console.log(name)

// import * as moment from 'moment'
// console.log(moment)

// import moment from 'moment' // 这样写是错误的

// import moment = require('moment')
// console.log(moment)

// 命名空间
// 命名空间的作用与使用场景和模块还是有区别的：
// 当我们是在程序内部用于防止全局污染，想把相关的内容都放在一起的时候，使用命名空间；
// 当我们封装了一个工具或者库，要适用于模块系统中引入使用时，适合使用模块。

// 定义和使用
// 命名空间的定义实际相当于定义了一个大的对象，里面可以定义变量、接口、类、方法等等，但是如果不使用 export 关键字指定此内容要对外可见的话，外部是没法访问的。
