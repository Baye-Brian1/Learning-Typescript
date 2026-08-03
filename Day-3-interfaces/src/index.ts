// Interfaces

interface User {
  readonly id: number;
  name: string;
  age: number;
  phone?: number;
  isDeveloper: boolean;
}

const user1: User = {
  id: 1,
  name: "Brian",
  age: 20,
  isDeveloper: true,
};
const user2: User = {
  id: 2,
  name: "Joseph",
  age: 18,
  phone: 67800123,
  isDeveloper: true,
};
interface Developer extends User {
  language: string;
}
const dev: Developer = {
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

interface Car {
  brand: string;
  model: string;
  year: number;
}
const car1: Car = {
  brand: "Toyota",
  model: "yaris",
  year: 2010,
};
const car2: Car = {
  brand: "KIA",
  model: "Benz",
  year: 2020,
};
console.log(car1);
console.log(car2);

interface Laptop {
  brand: string;
  ram: number;
  storage: number;
}

const laptop: Laptop = {
  brand: "Dell",
  ram: 16,
  storage: 500,
};

console.log("====laptop interface====");
console.log(`I have a ${laptop.brand} laptop with a 
    ram size of ${laptop.ram}GB and storage capacity of ${laptop.storage}GB`);

interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  company: string;
  position: string;
}
const employee: Employee = {
  name: "Joseph",
  age: 18,
  company: "TIC Foundation",
  position: "Frontend Dev",
};

console.log("====extended interface====");
console.log(employee);

interface Address{
    location: string;
    telephone: number;
    email: string;
}

interface Company{
    name: string;
    isVisible: boolean;
    address: Address;
}

const company: Company={
    name:"Traitz Tech",
    isVisible: true,
    address:{
        location:"bambili",
        telephone: 675717944,
        email: "traitztech@1gmail.com"
    }
}

console.log("====nested interface====");
console.log(company);

// 