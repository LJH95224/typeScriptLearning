/**************** ES5中的继承 ***********************/
// function Food() {
//   this.type = 'food'
// }
// Food.prototype.getType = function () {
//   return this.type
// }

// function Vegetables (name) {
//   this.name = name
// }

// Vegetables.prototype = new Food()

// const tomato = new Vegetables('tomato')
// console.log(tomato.getType())

/**************** ES6中类的继承 ***********************/

// class Parent {
//   constructor (name) {
//     this.name = name
//   }
//   getName () {
//     return this.name
//   }
// }

// class Child extends Parent {
//   constructor (name, age) {
//     super(name),
//     this.age = age
//   }
// }

// const c = new Child('Alfred', 18)
// console.log(c)

// console.log(c.getName())

/**************** Object.getPrototypeOf ***********************/
// console.log(Object.getPrototypeOf(Child) === Parent)




/**************** super ***********************/

// super 作为函数
// super 作为对象
    // 在普通方法中， --> 父类的原型对象
    // 在静态方法中， --> 父类

// class Parent {
//   constructor () {
//     this.type = 'parent'
//   }
//   getName () {
//     return this.type
//   }
// }
// Parent.getType = () => {
//   return 'is parent'
// }

// class Child extends Parent {
//   constructor () {
//     super()
//     console.log('constructor: ' + super.getName())
//   }
//   getParentName () {
//     console.log('getParentName: ' + super.getName())
//   }
//   getParentType () {
//     console.log('getParentType: ' + super.getType())
//   }
//   static getParentTypes () {
//     console.log('getParentType: ' + super.getType())
//   }
// }

// const c = new Child()
// c.getParentName()
// // c.getParentType() // 报错
// Child.getParentTypes()
// console.log(c)

class Parent {
  constructor () {
    this.type = 'parent'
  }
  print () {
    console.log(this.name)
  }
}

class Child extends Parent {
  constructor () {
    super()
    this.name = 'Child'
  }
  childPrint () {
    super.print()
  }
}

const c = new Child()
c.childPrint()




/**************** 类的prototype属性和 \__proto__ 属性 ***********************/

var objs = new Object()

console.log(objs.__proto__ === Object.prototype)

// 子类的__proto__指向父类本身
// 子类的prototype属性的 __proto__ 指向父类的prototype属性
// 实例的__proto__ 属性的 __proto__ 执行父类实例的 __proto__



/**************** 原生构造函数的继承 ***********************/







