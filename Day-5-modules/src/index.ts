import greet, {add} from "./utils"
console.log(add(3,5));
greet()

const promise = Promise.resolve("hello Joseph! Whats your problem");
promise.then(result =>console.log(result));

async function Greet(){
  return "Greetings Sir"
}

async function run(){
  const message= await Greet()
  console.log(message);
}

run()
