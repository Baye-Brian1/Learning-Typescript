"use strict";
// function greet(name: string, age: number){
//     console.log(`Hello my name is ${name} and I'm ${age} years old`);
Object.defineProperty(exports, "__esModule", { value: true });
// }
// greet("Brian", 20);
// function add(a:number, b:number):number{
//     return a+b;
// }
// const result= add(10, 20);
// console.log(`The sum of 10 and 20 results in ${result}`);
// const name = (firstName:string, middleName:string):string =>{
//     return `My name is ${firstName} ${middleName}`;
// }
// const fullName=name("Baye", "Brian")
// console.log(fullName);
// function Salut(name:string, country?:string){
//     console.log(`Hello ${name}`);
//     if (country){
//         console.log(`from ${country}`);  
//     }
//     // console.log(`from ${country}`);  
// }
// Salut("Brian")
// Salut("Brian", "UK")
console.log("=====Full Name and Age of a person=====");
const fullName = (name, age) => {
    console.log(`my name is ${name} and im ${age} years old`);
};
fullName("Baye Brian", 20);
console.log("=====SQUARE OF A NUMBER=====");
const Square = (value) => {
    return value * value;
};
console.log(Square(5));
console.log("=====Succses Verification=====");
const Verify = (input) => {
    if (input >= 50) {
        console.log("Student succesfully passed");
    }
    else {
        console.log("Student Failed");
    }
};
Verify(70);
Verify(40);
// OR
console.log("=====Success or Score Verification=====");
const Check = (score) => {
    if (score <= 49) {
        return false;
    }
    else {
        return true;
    }
};
const Passed = Check(50);
console.log(Passed ? "Student Passed" : "Student Failed");
console.log("=====Address Verification=====");
const address = (name, phone) => {
    console.log(`Name: ${name}`);
    if (phone) {
        console.log(`Phone: ${phone}`);
    }
    else {
        console.log("phone: Unprovided");
    }
};
address("Brian");
address("Brian", 675717944);
//# sourceMappingURL=index.js.map