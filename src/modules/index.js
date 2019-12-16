/********************* ES6 模块 ****************/
// 最主要的两个关键字 import和export

// import { time } from './b'
// setInterval(() => {
//   console.log(time)
// }, 1000);

// import { name as nameProp, age, info } from './c'
// console.log(name)
// console.log(age)
// console.log(nameProp, info)
// import 引入的时候也可以取别名，使用别名之后，原名将不会显示任何值
// 引入的时候使用as 当做别名，引入的参数是只读的不能修改值。修改就会报错
// nameProp = 'alfred'  // error 

// info.name = 'alfred'
// console.log(info)

// import './d'
// import有提升的效果，可以提升到模块的头部

import { getName } from './e'
getName()
// 我们放在import的引入之前，调用这个函数也是可以的


// export default 
// export default可以导出一个默认的内容，一个模块只能使用一次export default

/********************* Node.js 模块 ****************/