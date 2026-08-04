"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const inventoryProduct = {
    item: [
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
};
function addProduct() {
    const product = {
        id: 6,
        name: "Iphone",
        price: 600
    };
    inventoryProduct.item.push(product);
}
function removeProduct() {
    const remove = inventoryProduct.item.filter(emp => emp.id !== 3);
    console.log("------Product 3 removed------");
    console.log(remove);
}
function displayItems() {
    inventoryProduct.item.forEach((it) => {
        console.log("------Product------");
        console.log(`Employee No: ${it.id}`);
        console.log(`Name: Mr.${it.name}`);
        console.log(`Department: ${it.price} FCFA`);
    });
}
function SearchName() {
    const searchTerm = "Laptop";
    const results = inventoryProduct.item.filter(product => product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    console.log("------Laptop Product------");
    console.log(results);
}
console.log("------Inventory before------");
console.log(inventoryProduct);
addProduct();
console.log("------Inventory after------");
console.log(inventoryProduct);
console.log("------Product 3 removed------");
removeProduct();
console.log("------Products Displayed------");
displayItems();
SearchName();
//# sourceMappingURL=index.js.map