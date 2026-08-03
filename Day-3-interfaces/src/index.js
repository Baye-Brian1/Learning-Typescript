"use strict";
// Interfaces
Object.defineProperty(exports, "__esModule", { value: true });
const user1 = {
    id: 1,
    name: "Brian",
    age: 20,
    isDeveloper: true,
};
const user2 = {
    id: 2,
    name: "Joseph",
    age: 18,
    phone: 67800123,
    isDeveloper: true,
};
const dev = {
    id: 2,
    name: "Joseph",
    age: 18,
    phone: 67800123,
    isDeveloper: true,
    language: "typescript",
};
user1.name = "Baye";
console.log(user1);
console.log(user2);
const car1 = {
    brand: "Toyota",
    model: "yaris",
    year: 2010,
};
const car2 = {
    brand: "KIA",
    model: "Benz",
    year: 2020,
};
console.log(car1);
console.log(car2);
const laptop = {
    brand: "Dell",
    ram: 16,
    storage: 500,
};
console.log("====laptop interface====");
console.log(`I have a ${laptop.brand} laptop with a 
    ram size of ${laptop.ram}GB and storage capacity of ${laptop.storage}GB`);
const employee = {
    name: "Joseph",
    age: 18,
    company: "TIC Foundation",
    position: "Frontend Dev",
};
console.log("====extended interface====");
console.log(employee);
const company = {
    name: "Traitz Tech",
    isVisible: true,
    address: {
        location: "bambili",
        telephone: 675717944,
        email: "traitztech@1gmail.com"
    }
};
console.log("====nested interface====");
console.log(company);
// 
//# sourceMappingURL=index.js.map