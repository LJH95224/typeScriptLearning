
/**************** ES5和ES6实现创建实例 ***********************/
// es5中如何定义构造函数，以及如何创建实例的
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.getPostion = function () {
  return '(' + this.x + ',' + this.y + ')'
}

var p1 = new Point(2, 3)
console.log(p1)
console.log(p1.getPostion())

var p2 = new Point(4, 5)
console.log(p2)
console.log(p2.getPostion()) 

// 在es6中 引入类的概念，使用class定义了类。

class Points {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  getPostion () {
    return `(${this.x}, ${this.y})`
  }
}

var p3 = new Points(2, 3)
console.log(p3)
console.log(p3.getPostion())

var p4 = new Points(4, 5)
console.log(p4)
console.log(p4.getPostion()) 


/**************** constructor方法 ***********************/

 
/**************** 类的实例 ***********************/
// 查看p3上面是够有x这个属性
console.log(p3.hasOwnProperty('x'))
// 查看getPostion是不是p3上面的自有属性，
console.log(p3.hasOwnProperty('getPostion')) // false 

// getPostion其实是p3继承来的，它是定义在类的原型对象上的 （注意proto上面是两个_）
console.log(p3.__proto__.hasOwnProperty('getPostion')) // true 

/**************** 取值函数和存值函数 ***********************/

var info = {
  _age: 18,
  // 存值器函数
  set age (newVal) {
    if(newVal > 18) {
      console.log('怎么变老了')
    } else {
      console.log('哈哈我还年轻')
    }
  },
  // 取值器函数
  get age () {
    console.log('你问我年龄干嘛')
    return this._age
  }
}
console.log(info.age)
info.age = 17

info.age = 19


class InfoClass {
  constructor (age) {
    this._age = age
  }
  set age (newAge) {
    console.log('new age is:' + newAge)
    this._age = newAge
  }
  get age () {
    return this._age
  }
}

const info1 = new InfoClass(18)
console.log(info1.age)
info1.age = 17

/**************** class 表达式 ***********************/

// 函数定义的两种方式
// const func = function () {}
// function funcc () {}

// class Infos {
//   constructor () {}
// }

const Infoss = class c {
  constructor() { }
}
// 后面的名字可以省略
const Infosss = class {
  constructor() { }
}

// const testInfo = new c() // 报错 Identifier 'testInfo' has already been declared
const testInfo = new Infoss()

/**************** 静态方法 ***********************/

// 在es5中
function testFunc() {}
console.log('testFunc这个方法的名字' + testFunc.name)

// 如果不想实例基础这个方法,只希望类本身自己调用,那么我们需要将这个方法写成静态方法 使用 static 关键字表示一个静态方法

class Pointss {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  getPostion() {
    return `(${this.x}, ${this.y})`
  }
  static getClassName () {
    return Pointss.name
  }
}

const p6 = new Pointss(1, 2)
console.log('p6.getPostion()：', p6.getPostion())
// console.log('p6.getClassName()', p6.getClassName()) // 报错 p6.getClassName is not a function

console.log('Pointss.getClassName()：', Pointss.getClassName())

/**************** 实例属性的其他写法 ***********************/

// 定义静态属性
class Point2 {
  constructor() {
    this.x = 0
  }
}

Point2.y = 2
const p7 = new Point2()
console.log(p7)
console.log(p7.x)
console.log(p7.y)
console.log(Point2.y)

/**************** 实现私有方法 ***********************/

// class Point3





