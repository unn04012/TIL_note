let str =
  '# Queue\n' +
  'Array를 이용하는 방법과 Linked List를 이용하는 방법 2가지가 있다.\n' +
  '\n' +
  'Array를 이용하면 메모리 낭비가 일어날 수 있어 이럴 경우에는 Linked list를 이용한다.\n' +
  '\n' +
  '`Array.shift()` 로 큐를 흉내낼 수는 있다. 하지만 삭제 시 O(n) 연산이 일어나 효율성에서 좋지 못하다.\n' +
  '\n' +
  '### Queue 시간 복잡도\n' +
  '\n' +
  '- 삽입 : O(1)\n' +
  '- 삭제 : O(1)\n' +
  '- 탐색 : O(n)\n' +
  '\n' +
  '## Array\n' +
  '\n' +
  '```jsx\n' +
  '// Array 사용\n' +
  'class Queue {\n' +
  ' constructor() {\n' +
  ' this.queue = [];\n' +
  ' this.front = 0;\n' +
  ' this.rear = 0;\n' +
  ' }\n' +
  '\n' +
  ' enqueue(value) {\n' +
  ' this.queue[this.rear++] = value;\n' +
  ' }\n' +
  '\n' +
  ' dequeue() {\n' +
  ' const value = this.queue[this.front];\n' +
  ' delete this.queue[this.front];\n' +
  ' this.front += 1;\n' +
  ' return value;\n' +
  ' }\n' +
  ' peek() { // queue의 맨 앞 노드\n' +
  ' return this.queue[this.front];\n' +
  ' }\n' +
  '\n' +
  ' size() {\n' +
  ' return this.rear - this.front;\n' +
  ' }\n' +
  '}\n' +
  '```\n' +
  '\n' +
  '## Linked_list\n' +
  '\n' +
  '```jsx\n' +
  'class Node {\n' +
  ' constructor(value) {\n' +
  ' this.value = value;\n' +
  ' this.next = null;\n' +
  ' }\n' +
  '}\n' +
  '\n' +
  'class Queue {\n' +
  ' constructor() {\n' +
  ' this.head = null; // front -> head\n' +
  ' this.tail = null; // rear -> tail\n' +
  ' this.size = 0;\n' +
  ' }\n' +
  '\n' +
  ' enqueue(newValue) {\n' +
  ' const newNode = new Node(newValue);\n' +
  ' if (this.head === null) {\n' +
  ' this.head = this.tail = newNode;\n' +
  ' } else {\n' +
  ' this.tail.next = newNode;\n' +
  ' this.tail = newNode;\n' +
  ' }\n' +
  ' this.size += 1;\n' +
  ' }\n' +
  '\n' +
  ' dequeue() {\n' +
  ' const value = this.head.value;\n' +
  ' this.head = this.head.next;\n' +
  ' this.size -= 1;\n' +
  ' return value;\n' +
  ' }\n' +
  '\n' +
  ' peek() {\n' +
  ' return this.head.value;\n' +
  ' }\n' +
  '}\n' +
  '\n' +
  'const queue = new Queue();\n' +
  'queue.enqueue(1);\n' +
  'queue.enqueue(2);\n' +
  'queue.enqueue(4);\n' +
  'console.log(queue);\n' +
  'console.log(queue.dequeue());\n' +
  'queue.enqueue(8);\n' +
  'console.log(queue.size);\n' +
  'console.log(queue.peek());\n' +
  '```\n' +
  '\n' +
  "- 이것은 테스트용으로 '아무' 상관이 없습니다." +
  '``` javascript\n' +
  "console.log('hello world');\n" +
  '```\n' +
  '- 안녕하세요';
let index = -1;
let quotes = [];

// str = str.replace(/(\s*)/g, '');
// console.log(str);
do {
  index = str.indexOf('```', index + 1);
  if (index !== -1) quotes.push(index);
} while (index !== -1);
let newStr = str.slice(0, quotes[0]);
// console.log(quotes);
for (let i = 1; i < quotes.length; i += 2) {
  // console.log(quotes[i] + 3, quotes[i + 1]);
  if (quotes[i + 1]) newStr += str.slice(quotes[i] + 3, quotes[i + 1]);
}

if (quotes[quotes.length - 1] !== str.length - 1) newStr += str.slice(quotes[quotes.length - 1] + 3, str.length);
// console.log(newStr);
newStr = newStr.replace(/[^a-zA-Z0-9():ㄱ-ㅎ|ㅏ-ㅣ|가-힣._\s'"]/g, '');
// console.log(newStr);
// console.log(str[1532]);

class test {
  constructor(_id) {
    this.id = _id;
  }
  toString() {
    return this.id.toString();
  }
}
const findNote = {
  _id: new test(123),
  title: 'test',
  content: 'delete test',
  search: 'delete test',
  createdAt: '2022-01-15T12:54:43.804Z',
  __v: 0,
};

// console.log(findNote);
if (findNote) {
  findNote._id = findNote._id.toString();
}
// console.log(findNote);

// function wrapAsync(fn) {
//   return () => {
//     fn.catch((err) => console.log(err))
//   });
// }

function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error conflict!');
    }, sec * 1000);
  });
}
/**
 * wait가 promise reject 반환
 * 원래는 myfun 함수에서 try-catch 문으로 처리를 해야 하지만 그럴 경우 확장성과 재사용성이 떨어짐
 *
 * 마찬가지로 app.ts파일에 wrapAsync()메서드도 promise를 반환 한다
 *
 */
// const myfun = async () => {
//   await wait(3);
// };
// // myfun();
// myfun().catch(e => console.log(e));
/**
 * 비동기함수 : 기다리지 않고 다음 함수를 실행하는 함수
 * 대표적 비동기 함수 : setTimeout()
 * async, await 은 비동기 처리를 제어하는 방법 중 하나
 * Promise return 한 함수를 잡기 위해서는 해당 함수의 catch문을 잡아주어야 한다.
 */
// async function myfun() {
//   // console.log(new Date());
//   await wait(3).catch(e => console.log(e));
//   // console.log(new Date());
// }
// myfun().catch(e => console.log(e));
// console.log('hello world');

/**
 *
 * 콜백함수 : 비동기로 작성된 함수를 처리하기 위한 하나의 방법론 -> Promise로 발전
 */

function pay(tot) {
  console.log(tot + '원을 지불했습니다.');
}
function buy_normal(item, price, quantity) {
  console.log(item + ' 상품을 ' + quantity + '개 골라서 점원에게 주었습니다.');
  console.log('계산이 필요합니다.');
  var total = price * quantity;
  return total;
}
// var tot = buy_normal('고구마', 1000, 5);
// pay(tot);

function buy_asis(item, price, quantity, callback) {
  console.log(item + ' 상품을 ' + quantity + '개 골라서 점원에게 주었습니다.');
  setTimeout(() => {
    console.log('게산이 필요합니다');
    var total = price * quantity;
    callback(total);
  }, 1000);
}
// buy_asis('고구마', 1000, 5, total => {
//   console.log(total, ' 원을 지불하였습니다.');
// });

/**
 * Promise
 */

function goToSchool() {
  console.log('학교에 갑니다.');
}

function arriveAtSchool_asis(callback) {
  setTimeout(function () {
    let str = '학교에 도착했습니다.';
    callback(str);
  }, 1000);
}
function study() {
  console.log('열심히 공부를 합니다.');
}

// goToSchool();
// arriveAtSchool_asis(str => {
//   console.log(str);
// });
// study();

// function mul(a, b, callback) {
//   callback();
// }
// mul(5, 5, () => {
//   console.log('hello world');
// });

// function wrapAsync(fn) {
//   // callback function : 인자로 함수를 전달하는 함수
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// }
const repeatFunc = (num, callback) => {
  // callBack 함수를 num번 실행하는 함수
  // 클로저 : 외부함수의 실행이 종료되어도 외부함수의 스코프에 접근할 수 있는 내부 변수
  return () => {
    // 리턴값이 함수이기 때문에 이 값을 실행하기 위해서는 함수를 사용해야 한다.
    for (let i = 0; i < num; i++) {
      callback();
    }
  };
};
const repeat = () => {
  console.log('hello world');
};
repeatFunc(3, repeat); // 이러면 실행 안됨,
let three = repeatFunc(3, () => {
  console.log('hello world'); //repeat 함수와 같은 역할, 익명함수로 작성
});
// three();
// repeatFunc(3, () => {
//   console.log('hello world2');
// });

function outerFn() {
  let outerVar = 'outer';
  console.log(outerVar);
  function innerFn() {
    let innerVar = 'inner';
    console.log(innerVar);
  }
  return () => {
    let innerVal = 'inner';
    console.log(innerVal);
  };
}
// let inner = outerFn();
// inner();

const wrapAsync = fn => {
  // callback function : 인자로 함수를 전달하는 함수
  // fn : 인자 : req, rext,next를 가지는 함수 -> 이 함수를 사용하기 위해서는 ()를 선언해야 한다.
  // fn에 catch 메서드가 체이닝 되어있다는 것은 fn() 함수인 콜백 함수가 promise객체인 것을 알 수 있다.
  return () => {
    fn().catch(e => console.log(e));
  };
}; // 현재 이 함수가 에러 처리하고 있음
let req = 'req',
  res = 'test3 res',
  next = 'next';
function test3(req, res, next) {
  // test3함수가 reject 발생시킨 에러 처리 필요
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('hello');
    }, 50);
  });
}

function test6() {
  // test3함수가 reject 발생시킨 에러 처리 필요
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('test6 error');
    }, 50);
  });
}
async function test4() {
  await test3();
}

async function test7() {
  await test6();
}

// 이 함수로 알 수 있는 것은 위 wrapAsync 함수와 같은 역할을 하고 있는 것을 알 수 있다.
// 그런데 이 함수를 콜백함수가 되면서 클로저 역할을 하고 있다.
// test4().catch(e => console.log(e));
// test2();

/**
 * 즉, wrapAsync의 인자인 fn() 콜백함수와 test4의 함수가 같다는 것을 알 수 있다.
 * 다시 말하면 test4() 함수가 Promise 객체를 사용하는 것을 알 수 있다.
 * test4()함수를 보면 현재 에러 처리가 되지 않는 것을 볼 수 있다. 그래서 오류가 발생
 * fn === test4 이므로, fn() 에서 catch 구문을 써서 에러 처리를 할 수 있다.
 *
 *
 * 이것을 mongoose와 연관지어서 생각해보면 현재 몽구스 라이브러리는 제공되는 쿼리 메서드가 promise 객체를 반환한다.
 * 즉, 쿼리 메서드와 test3, test6 함수가 같은 함수라고 여길 수 있다.
 *
 * 개발자는 해당 메서드를 이용하여 구현을 해야 하기 때문에 사용을 해야 한다. -> 위에보면 test4()와 test7() 함수와 같은 역할
 * 그래서 해당 메서드를 사용할 때마다 try-catch 구문으로 에러 처리를 해야 한다.
 * 하지만 위의 방법처럼 에러 처리를 위임할 경우 try-catch구문을 사용할 필요가 없다. -> 코드의 양 줄고, 가독성이 올라감, 확장성 증가
 */
// let test5 = wrapAsync((test4));
let test5 = wrapAsync(async () => {
  await test3();
});
let test8 = wrapAsync(test7);
test5();
test8();
