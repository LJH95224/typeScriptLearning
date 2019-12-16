/**************** TS 中的类基础 ***********************/
/*
class Point {
  public x: number
  public y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  public getPosition() {
    return `(${this.x}, ${this.y})`
  }
}

const point = new Point(1, 2)
// console.log(1, 2)

class Parent {
  public name: string
  constructor(name: string) {
    this.name = name
  }
}

class Child extends Parent {
  constructor(name: string) {
    super(name)
  }
}
*/

/**************** TS 中的类修饰符 ***********************/
// public修饰符 public表示公共的，用来指定在创建实例后可以通过实例访问的，也就是类定义的外部可以访问的属性和方法。
/*
class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public getPosition() {
    return `(${ this.x }, ${ this.y })`;
  }
}
*/
// private 修饰符 private修饰符表示私有的，它修饰的属性在类的定义外面是没法访问的
// class Parent {
//   private age: number
//   constructor(age: number) {
//     this.age = age
//   }
// }
// const p = new Parent(18)
// // console.log(p)  // { age: 18}
// // console.log(p.age) // error 属性“age”为私有属性，只能在类“Parent”中访问
// // console.log(Parent.age) // error 类型“typeof ParentA”上不存在属性“age”
// class Child extends Parent {
//   constructor(age: number) {
//     super(age)
//     // console.log(super.age) // 通过super关键词只能访问积累的公共方法和受保护方法
//   }
// }
// protected 受保护修饰符
// class Parent {
//   protected age: number
//   constructor(age: number) {
//     this.age = age
//   }
//   protected getAge() {
//     return this.age
//   }
// }
// const p = new Parent(18)
// // console.log(p)  // { age: 18}
// // console.log(p.age) // error 属性“age”为私有属性，只能在类“Parent”中访问
// // console.log(Parent.age) // error 类型“typeof ParentA”上不存在属性“age”
// class Child extends Parent {
//   constructor(age: number) {
//     super(age)
//     // console.log(super.age) // 报错，拿不到属性
//     console.log(super.getAge()) // 没有报错，可以拿到方法
//   }
// }

/**************** TS readonly修饰符 ***********************/
// 在类里可以使用readonly关键字将属性设置为只读。

// class UserInfo {
//   public readonly name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }
// const userInfo = new UserInfo('lvjinhu')
// console.log(userInfo)
// userInfo.name = 'haha' // error: 这个是只读属性，不能修改

/**************** TS 参数属性 ***********************/
// 之前的例子中，我们都是在类的定义的顶部初始化实例属性，
// 在 constructor 里接收参数然后对实力属性进行赋值，我们可以使用参数属性来简化这个过程。
// 参数属性简单来说就是在 constructor 构造函数的参数前面加上访问限定符，也就是前面讲的 public、private、protected 和 readonly 中的任意一个。
// class A {
//   constructor(name: string) {}
// }
// const a1 = new A('lison')
// console.log(a1)
// // console.log(a1.name) // error 类型“A”上不存在属性“name”
// class B {
//   constructor(public name: string) { }
// }
// const b = new B('bbb')
// console.log(b.name) // "bbb"
// 可以看到，在定义类 B 时，构造函数有一个参数 name，这个 name 使用访问修饰符 public 修饰，
// 此时即为 name 声明了参数属性，也就无需再显示地在类中初始化这个属性了。

/**************** TS 静态属性 ***********************/
// 和 ES6 的类一样，在 TS 中一样使用static关键字来指定属性或方法是静态的，
// 实例将不会添加这个静态属性，也不会继承这个静态方法，你可以使用修饰符和 static 关键字来指定一个属性或方法：
// class Parent {
//   public static age: number = 18
//   public static getAge() {
//     return Parent.age
//   }
//   constructor() {
//     //
//   }
// }
// const p = new Parent()
// console.log(p.age) // error Property 'age' is a static member of type 'Parent'
// console.log(Parent.age) // 18

// 如果使用了 private 修饰道理和之前的一样
// class Parent {
//   public static getAge() {
//     return Parent.age
//   }
//   private static age: number = 18
//   constructor() {
//     //
//   }
// }
// const p = new Parent()
// console.log(p.age); // error Property 'age' is a static member of type 'Parent'
// console.log(Parent.age); // error 属性“age”为私有属性，只能在类“Parent”中访问。

/**************** TS 可选类属性 ***********************/
// TS 在 2.0 版本，支持可选类属性，也是使用 ? 符号来标记。
// class Info {
//   public name: string
//   public age?: number
//   constructor(name: string, age?: number, public sex?: string) {
//     this.name = name
//     this.age = age
//   }
// }
// const info1 = new Info('lison')
// const info4 = new Info('lison', 18)
// const info3 = new Info('lison', 18, 'man')

/**************** TS 存取器 ***********************/
// 这个也就 ES6 标准中的存值函数和取值函数，也就是在设置属性值的时候调用的函数，
// 和在访问属性值的时候调用的函数，用法和写法和 ES6 的没有区别

// class UserInfo {
//   // tslint:disable-next-line: variable-name
//   private _fullName: string
//   constructor() {
//     //
//   }
//   get fullName() {
//     return this._fullName
//   }
//   set fullName(value) {
//     console.log(`setter: ${value}`)
//     this._fullName = value
//   }
// }
// const user = new UserInfo()
// user.fullName = 'Lison Li' // "setter: Lison Li"
// console.log(user.fullName) // "Lison Li"

/**************** TS 抽象类 ***********************/
// 抽象类一般用来被其他类继承，而不直接用它创建实例。抽象类和类内部定义抽象方法，使用abstract关键字

// abstract class People {
//   constructor(public name: string) {
//     //
//   }
//   public abstract printName(): void
// }

// // const p1 = new People() // error: 无法创建抽象类实例

// class Man extends People {
//   constructor(name: string) {
//     super(name)
//     this.name = name
//   }
//   public printName() {
//     console.log(this.name)
//   }
// }

// const m = new Man('lison')
// console.log(m.printName)

// abstract class People {
//   abstract get insideName(): string
//   abstract set insideName(value: string)
// }

// class P extends People {
//   // tslint:disable-next-line: variable-name
//   public _name: string
//   public insideName: string
// }
// 但是要记住，抽象方法和抽象存取器都不能包含实际的代码块。

/**************** TS 实例类型 ***********************/

// class People {
//   constructor(public name: string) { }
// }
// let p1: People = new People('lison')

// class Animal {
//   constructor(public name: string) { }
// }
// p1 = new Animal('lark')

/**************** TS 对之前跳过的知识补充 ***********************/
// 类类型接口
// interface FoodInterface {
//   type: string
// }

// class FoodClasss implements FoodInterface {
//   public type: string
//   constructor() {
//     //
//   }
// }

// 接口继承类
// 接口可以继承一个类，当接口继承了该类后，会继承类的成员，但是不包括其实现，
// 也就是只继承成员以及成员类型。接口还会继承类的private和protected修饰的成员，
// 当接口继承的这个类中包含这两个修饰符修饰的成员时，这个接口只可被这个类或他的子类实现。
// class A {
//   protected name: string;
// }
// interface I extends A { }
// class B implements I { } // error Property 'name' is missing in type 'B' but required in type 'I'
// class C implements I {
//   // error 属性“name”受保护，但类型“C”并不是从“A”派生的类
//   name: string;
// }
// class D extends A implements I {
//   getName() {
//     return this.name;
//   }
// }

// 在泛型中使用类类型
// const create = <T>(c: new() => T): T => {
//   return new c()
// }
// class Info {
//   public age: number
//   constructor() {
//     this.age = 18
//   }
// }
// console.log(create(Info).age)
// create(Info).name // error 类型“Info”上不存在属性“name”
