"use strict";
//I. Variables and Types
Object.defineProperty(exports, "__esModule", { value: true });
//A) Types
// 1-string
// 2-number
// 3-boolean: either true or false
// 4-null
// 5-unidentified
// 6-symbol: here it goes for unique variables
// 7-any: it is rarely used because it cancels the verifications of SVGUnitTypes ETC.
//B) Variables
let fullName = "Baye Brian";
let age = 20;
let Occupation = "Student";
let School = "COLTECH";
let Department = "Computer Engineering";
let Level = 400;
let isFrontEndDeveloper = true;
let FavouriteLanguage = "English Language";
console.log(`Name: ${fullName}`);
console.log(`Age: ${age}`);
console.log(`School: ${School}`);
console.log(`Occupation: ${Occupation}`);
console.log(`Department: ${Department}`);
console.log(`Level: ${Level}`);
console.log(`Language: ${FavouriteLanguage}`);
console.log(`Frontend Developer: ${isFrontEndDeveloper}`);
let productName = "Keyboard";
const Price = 50;
let Quantity = 3;
let inStock = 10;
let Category = "Tech";
const totalPrice = Price * Quantity;
const QuantityAvailable = inStock - Quantity;
console.log(`Product Name: ${productName}`);
console.log(`Price: ${Price}`);
console.log(`Ordered Qty: ${Quantity}`);
console.log(`Initial Available Qty: ${inStock}`);
console.log(`Total: ${totalPrice}`);
console.log(`Final Available Qty: ${QuantityAvailable}`);
//II. Arrays and Objects
// A) Arrays
let fruits = ["Apple", "Banana", "Mango", "Grapes"];
console.log(fruits[3]);
fruits.push("Orange");
console.log(fruits);
let scores = [20, 40, 60, 80, 100];
console.log(scores);
let completed = [true, false, true, false];
console.log(completed);
console.log(completed[0]);
let Sentence = ["Baye Brian", 20, "Frontend Developer", "currently Learning", "Typescript"];
console.log(Sentence);
//# sourceMappingURL=index.js.map