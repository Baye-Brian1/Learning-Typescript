//I. Variables and Types

//A) Types
// 1-string
// 2-number
// 3-boolean: either true or false
// 4-null
// 5-unidentified
// 6-symbol: here it goes for unique variables
// 7-any: it is rarely used because it cancels the verifications of SVGUnitTypes ETC.

//B) Variables
let fullName: string="Baye Brian";
let age: number = 20;
let Occupation: string= "Student";
let School: string ="COLTECH"
let Department: string="Computer Engineering"
let Level: number= 400;
let isFrontEndDeveloper: boolean = true
let FavouriteLanguage: string= "English Language"

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
let Quantity= 3;
let inStock = 10;
let Category: string= "Tech";

const totalPrice= Price * Quantity;
const QuantityAvailable= inStock - Quantity;

console.log(`Product Name: ${productName}`);
console.log(`Price: ${Price}`);
console.log(`Ordered Qty: ${Quantity}`);
console.log(`Initial Available Qty: ${inStock}`);
console.log(`Total: ${totalPrice}`);
console.log(`Final Available Qty: ${QuantityAvailable}`);

//II. Arrays and Objects

// A) Arrays
let fruits: string[] =["Apple", "Banana", "Mango", "Grapes"];
console.log(fruits[3]);
fruits.push("Orange");
console.log(fruits);

let scores: number[]= [20, 40, 60, 80, 100];
console.log(scores);

let completed: boolean[]=[true, false, true, false];
console.log(completed);
console.log(completed[0]);

let Sentence: (string | number)[]= ["Baye Brian", 20, "Frontend Developer", "currently Learning", "Typescript"]
console.log(Sentence);









