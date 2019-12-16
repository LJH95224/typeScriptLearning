/**************** TS 数字枚举 ***********************/
// enum Status {
//   Uploading,
//   Success,
//   Failed,
// }

// console.log(Status.Uploading)
// // 可以写成Status['Status.Success']
// console.log(Status.Success)
// console.log(Status.Failed)

// 修改起始编码
// enum Color {
//   Red = 2,
//   Blue,
//   Yellow,
// }

// console.log(Color.Red, Color.Blue, Color.Yellow) // 2 3 4

// 指定任意字段的索引值
// enum Status {
//   Success = 200,
//   NotFound = 404,
//   Error = 500,
// }
// console.log(Status.Success, Status.NotFound, Status.Error) // 200 404 500

// 指定部分字段，其他使用默认递增索引
// enum Status {
//   Ok = 200,
//   Created,
//   Accepted,
//   BadRequest = 400,
//   Unauthorized,
// }
// console.log(Status.Created, Status.Accepted, Status.Unauthorized) // 201 202 401

/**************** TS 反向映射 ***********************/
// enum Status {
//   Uploading,
//   Success,
//   Failed,
// }

// console.log(Status)

/**************** TS 字符串枚举 ***********************/
// enum Message {
//   Error = 'Sorry, error',
//   Success = 'Hoho, success',
// }
// console.log(Message.Error) // 'Sorry, error'

// enum Message {
//   Error = 'error message',
//   ServerError = Error,
//   ClientError = Error,
// }
// console.log(Message.Error) // 'error message'
// console.log(Message.ServerError) // 'error message'

/**************** TS 异构枚举 ***********************/
// enum Result {
//   Faild = 0,
//   Success = 'Success',
// }
// 这种如果不是真的需要，不建议使用

/**************** TS 枚举成员类型和联合枚举类型 ***********************/
// 如果枚举值里所有成员的值都是字面量类型的值，那么这个枚举的每个成员和枚举值本身都可以作为类型来使用，先来看下满足条件的枚举成员的值有哪些：

// 不带初始值的枚举成员，例如enum E { A }
// 值为字符串字面量，例如enum E { A = ‘a’ }
// 值为数值字面量，或者带有 - 符号的数值字面量，例如enum E { A = 1 } 、enum E { A = -1 }
// 当我们的枚举值的所有成员的值都是上面这三种情况的时候，枚举值和成员就可以作为类型来用：

// 1、枚举成员类型
// enum Animal {
//   Dog = 1,
//   Cat = 2,
// }
// interface Dog {
//   type: Animal.Dog // 这里使用Animal.Dog作为类型，指定接口Dog的必须有一个type字段，且类型为Animal.Dog
// }
// interface Cat {
//   type: Animal.Cat // 这里同上
// }
// // let cat1: Cat = {
// //   type: Animal.Dog, // error [ts] 不能将类型“Animal.Dog”分配给类型“Animal.Cat”
// // }
// let dog: Dog = {
//   type: Animal.Dog,
// }
// console.log(dog)

// 2. 联合枚举类型
// 当我们的枚举值符合条件时，这个枚举值就可以看做是一个包含所有成员的联合类型
// enum Status {
//   Off,
//   On,
// }
// interface Light {
//   status: Status
// }
// enum Animal {
//   Dog = 1,
//   Cat = 2,
// }
// const light1: Light = {
//   status: Animal.Dog, // error 不能将类型“Animal.Dog”分配给类型“Status”
// }
// const light2: Light = {
//   status: Status.Off,
// }
// const light3: Light = {
//   status: Status.On,
// }

// 3. 运行时候的枚举
// 枚举在编译成 JavaScript 之后实际是一个对象。这个我们前面讲过了，既然是对象，那么就可以当成对象来使用
// enum E {
//   A,
//   B,
// }
// const getIndex = (enumObj: { A: number }): number => {
//   return enumObj.A
// }
// console.log(getIndex(E)) // 0

/**************** TS const enum ***********************/
// enum Status {
//   Off,
//   On,
// }
// const enum Animal {
//   Dog,
//   Cat,
// }
// const status1 = Status.On
// const animal = Animal.Dog
// console.log(status1)
// console.log(animal)
