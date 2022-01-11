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
console.log(str);
do {
  index = str.indexOf('```', index + 1);
  if (index !== -1) quotes.push(index);
} while (index !== -1);
let newStr = str.slice(0, quotes[0]);
console.log(quotes);
for (let i = 1; i < quotes.length; i += 2) {
  console.log(quotes[i] + 3, quotes[i + 1]);
  if (quotes[i + 1]) newStr += str.slice(quotes[i] + 3, quotes[i + 1]);
}

if (quotes[quotes.length - 1] !== str.length - 1) newStr += str.slice(quotes[quotes.length - 1] + 3, str.length);
// console.log(newStr);
newStr = newStr.replace(/[^a-zA-Z0-9():ㄱ-ㅎ|ㅏ-ㅣ|가-힣._\s'"]/g, '');
console.log(newStr);
console.log(str[1532]);
