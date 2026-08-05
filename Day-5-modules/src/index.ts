// import greet, {add} from "./utils"
// console.log(add(3,5));
// greet()

// const promise = Promise.resolve("hello Joseph! Whats your problem");
// promise.then(result =>console.log(result));

// async function Greet(){
//   return "Greetings Sir"
// }

// async function run(){
//   const message= await Greet()
//   console.log(message);
// }

// run()


// function fetchProduct(): Promise<string[]>{
//   return new Promise(resolve  =>{
//     setTimeout(()=>{
//       resolve([
//         "laptop",
//         "phone",
//         "tablet"
//       ])

//     }, 2000)
//   })
// }

// async function loadProducts() {
//   const products = await fetchProduct();
//   console.log(products);
// }
// loadProducts()

// function divide(a:number, b:number){
//   if (b===0){
//     throw new Error("caonnot divide by zero")
//   }
//   return a/b
// }
// try {
//   console.log(divide(10, 0));
// } catch (error) {
//   console.log(error); 
// }

// console.log(add(5, 10));
// console.log(subtract(20, 100));
// console.log(multiply(2000, 2000));

// function fetchName():Promise<string>{
//   return new Promise(resolve =>{
//     setTimeout(()=>{
//       resolve("Learning Typescript")
//     })
//   })
// }


// async function fetchNamex(){
//   const message= await fetchName()
//   console.log(message);
  
// }
// fetchNamex()

// function login(password: string){
//   if (password !== "12345"){
//     throw new Error("Invalid Password")

//   }
//   console.log(password);
// }

// try {
//   console.log(login("1234")); 
  
// } catch (error) {
//   console.log(error);
// }


import { displayStudent } from "./utils";
import { Student, students } from "./student";

function fetchStudent():Promise<Student[]>{
  return new Promise (resolve =>{
    setTimeout(()=>{
     resolve (students);
    },3000)
  })
}

async function displayStud(){
  console.log("Loading students ....");
  
  const data= await fetchStudent()
  data.forEach(student=>{
    displayStudent(student)
  })
  console.log("Students loaded Succesfully");
}
displayStud()

