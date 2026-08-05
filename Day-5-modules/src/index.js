"use strict";
// import greet, {add} from "./utils"
// console.log(add(3,5));
// greet()
Object.defineProperty(exports, "__esModule", { value: true });
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
const utils_1 = require("./utils");
const student_1 = require("./student");
function fetchStudent() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(student_1.students);
        }, 3000);
    });
}
async function displayStud() {
    console.log("Loading students ....");
    const data = await fetchStudent();
    data.forEach(student => {
        (0, utils_1.displayStudent)(student);
    });
    console.log("Students loaded Succesfully");
}
displayStud();
//# sourceMappingURL=index.js.map