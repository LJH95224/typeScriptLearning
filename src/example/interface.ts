/**************** 2.6.1 接口的基本用法 ***********************/
// 注：这段代码为纯JavaScript代码，请在JavaScript开发环境编写下面代码，在TypeScript环境会报一些类型错误
// const getFullName = ({ firstName, lastName }) => {
//   return `${firstName} ${lastName}`
// }

// getFullName({
//   firstName: 'haha',
//   lastName: 'Li',
// })

interface NameInfo {
  firstName: string,
  lastName: string
}

const getFullName = ({ firstName, lastName }: NameInfo): string => {
  return `${firstName} ${lastName}`
}

// tslint:disable-next-line: no-console
console.log(getFullName({firstName: 'Li',  lastName: 'Alfred'}))

/**************** 2.6.2可选属性 ***********************/

// interface Vegetable {
//   color?: string,
//   type: string,
// }

// const getVegetables = ({ color, type }: Vegetable) => {
//   return `A ${color ? (color + ' ') : ' '} ${type}`
// }

// tslint:disable-next-line: no-console
// console.log(getVegetables({
//   color: 'red',
//   type: 'tomato',
// }))

/**************** 2.6.3多余属性检查 && 2.6.4 绕开多余属性检查 ***********************/

// 使用类型断言
// tslint:disable-next-line: no-console
// console.log(getVegetables({
//   type: 'tomato',
//   color: 'red',
//   size: 2,
// } as Vegetable))

// 添加索引签名
// interface Vegetables {
//   color: string;
//   type: string;
//   [prop: string]: any;
// }

// 利用类型兼容性
const vegetableInfo = {
  type: 'tomato',
  color: 'red',
  size: 2,
}

// tslint:disable-next-line: no-console
// console.log(getVegetables(vegetableInfo))

/**************** 2.6.5 只读属性 ***********************/
// const NAME: string = "Lison";
// NAME = "Haha"; // Uncaught TypeError: Assignment to constant variable

// const obj = {
//   name: "lison",
// };
// obj.name = "Haha";

// interface Info {
//   readonly name: string;
// }
// const info: Info = {
//   name: "Lison",
// };
// info.name = "Haha"; // Cannot assign to 'name' because it is a read-only property
// 我们可以看到上面使用const定义的常量NAME定义之后再修改会报错，但是如果使用const定义一个对象，然后修改对象里属性的值是不会报错的。所以如果我们要保证对象的属性值不可修改，需要使用readonly。

/**************** 2.6.6 只读属性 ***********************/

// interface AddFunc {
//   (num1: number, num2: number): number;
// }
type AddFunc = (num1: number, num2: number) => number
// const add: AddFunc = (n1, n2) => n1 + n2
// tslint:disable-next-line: no-console
// console.log(add(1, 2))

/**************** 2.6.7 索引类型 ***********************/
// 我们可以使用接口描述索引的类型和通过索引得到的值的类型，
// interface RoleDic {
//   [id: number]: string;
// }
// const role1: RoleDic = {
//   0: "super_admin",
//   1: "admin",
// }

// const role2: RoleDic = {
//   s: "super_admin",  // error 不能将类型"{ s: string; a: string; }"分配给类型"RoleDic"。
//   a: "admin"
// };
// const role3: RoleDic = ["super_admin", "admin"];

// const obj = {
//   123: "a", // 这里定义一个数值类型的123这个属性
//   "123": "b" // 这里在定义一个字符串类型的123这个属性，这里会报错：标识符“"123"”重复。
// };
// console.log(obj); // { '123': 'b' }

/**************** 2.6.7 继承接口 ***********************/
// interface Vegetables {
//   color: string;
// }
// interface Tomato extends Vegetables {
//   radius: number;
// }
// interface Carrot extends Vegetables {
//   length: number;
// }
// const tomato: Tomato = {
//   radius: 1.2 // error  Property 'color' is missing in type '{ radius: number; }'
// };
// const carrot: Carrot = {
//   color: "orange",
//   length: 20
// };

// 一个接口可以被多个接口继承，同样，一个接口也可以继承多个接口，多个接口用逗号隔开。比如我们再定义一个Food接口，Tomato 也可以继承 Food：
interface Vegetables {
  color: string;
}
interface Food {
  type: string;
}
interface Tomato extends Food, Vegetables {
  radius: number;
}

const tomato: Tomato = {
  type: "vegetables",
  color: "red",
  radius: 1.2,
};  // 在定义tomato变量时将继承过来的color和type属性同时声明

/**************** 2.6.8 混合类型接口 ***********************/
// interface Counter {
//   (): void; // 这里定义Counter这个结构必须包含一个函数，函数的要求是无参数，返回值为void，即无返回值
//   count: number; // 而且这个结构还必须包含一个名为count、值的类型为number类型的属性
// }
// const getCounter = (): Counter => { // 这里定义一个函数用来返回这个计数器
//   const c = () => { // 定义一个函数，逻辑和前面例子的一样
//     c.count++;
//   };
//   c.count = 0; // 再给这个函数添加一个count属性初始值为0
//   return c; // 最后返回这个函数对象
// };
// const counter: Counter = getCounter(); // 通过getCounter函数得到这个计数器
// counter();
// console.log(counter.count); // 1
// counter();
// console.log(counter.count); // 2
// 上面的例子中，getCounter函数返回值类型为Counter，它是一个函数，无返回值，即返回值类型为void，它还包含一个属性count，属性返回值类型为number。
