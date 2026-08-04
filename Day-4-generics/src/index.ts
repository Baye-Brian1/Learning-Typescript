// // Generics
// const numbers: Array<number> = [1, 2, 3, 4];
// const names: Array<string> = ["brain", "nesta", "kim"];
// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
// }
// interface User {
//   name: string;
//   age: number;
// }
// const response: ApiResponse<User> = {
//   success: true,
//   data: {
//     name: "joebass",
//     age: 20,
//   },
// };

// function identity<T>(value: T): T {
//   return value;
// }
// console.log(identity("brian"));
// console.log(identity(19));
// console.log(identity(true));

// interface Box<T> {
//   item: T;
// }
// const text: Box<string> = {
//   item: "Hello",
// };

// console.log(text.item);

// const Number: Box<number> = {
//   item: 100,
// };
// console.log(Number.item);

// interface Pair<T, U> {
//   first: T;
//   second: U;
// }

// const Info: Pair<string, number> = {
//   first: "Brian",
//   second: 20,
// };
// console.log(`name: ${Info.first}`);
// console.log(`age: ${Info.second}`);

// function printItem<T>(value: T): T {
//   return value;
// }

// console.log(printItem("Hello"));
// console.log(printItem(22));

// const NameA: Array<string | number> = ["Brian", 20, "Paul"];

// console.log(NameA);

// Inventory System

interface Product{
  id: number
  name: string,
  price: number;
}

interface Inventory<T>{
  item: T[];
}

const inventoryProduct:  Inventory<Product>={
  item:[
    {
    id: 1,
    name: "laptop",
    price: 400
    },
    {
    id: 2,
    name: "phone",
    price: 150
    },
    {
    id: 3,
    name: "Playstation",
    price: 150
    },
    {
    id: 4,
    name: "Airpod",
    price: 40
    },
    {
    id: 5,
    name: "IPad",
    price: 200
    },
  ]
}

function addProduct(){
  const product={
    id: 6,
    name: "Iphone",
    price: 600
  }
  inventoryProduct.item.push(product)
}

function removeProduct(){
  const remove=inventoryProduct.item.filter(emp=>emp.id !== 3)
  console.log("------Product 3 removed------");
  console.log(remove);
  
}

function displayItems(){
  inventoryProduct.item.forEach((it)=>{
     console.log("------Product------");
    console.log(`Employee No: ${it.id}`);
    console.log(`Name: Mr.${it.name}`);
    console.log(`Department: ${it.price} FCFA`);
  })
}
function SearchName(){
const searchTerm= "Laptop"
const results=inventoryProduct.item.filter(product=>
  product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
)
 console.log("------Laptop Product------");
console.log(results);


}

 console.log("------Inventory before------");
console.log(inventoryProduct);
addProduct()
console.log("------Inventory after------");
console.log(inventoryProduct);

console.log("------Product 3 removed------");
removeProduct()
console.log("------Products Displayed------");
displayItems()

SearchName()


