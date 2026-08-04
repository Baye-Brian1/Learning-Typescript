// Generics




const numbers: Array<number>=[1,2,3,4];
const names: Array<string>=[
  "brain",
  "nesta",
  "kim"
]

interface ApiResponse<T>{
  success: boolean;
  data: T;
}

interface User{
  name: string;
  age: number;
}
const response: ApiResponse<User>={
  success: true,
  data:{
    name: "joebass",
    age: 20
  }
}

function identity <T>(value: T):T{
  return value;
}
console.log(identity("brian"));
console.log(identity(19));
console.log(identity(true));

interface Box<T>{
  item: T;
}
const text: Box<string>={
   item: "Hello"
}

console.log(text.item);

const Number: Box<number>={
  item: 100,
}
console.log(Number.item);

interface Pair<T,U>{
  first: T,
  second: U,
}

