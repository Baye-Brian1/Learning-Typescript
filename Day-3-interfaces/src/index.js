"use strict";
// // Interfaces
Object.defineProperty(exports, "__esModule", { value: true });
const employees = [
    {
        id: 1,
        name: "Brian",
        department: "IT Sector",
        salary: 500000,
        isActive: true,
        address: {
            street: "Emana",
            city: "Yaounde",
            country: "Cameroon"
        }
    },
    {
        id: 2,
        name: "Nesta",
        department: "Management Sector",
        salary: 400000,
        isActive: false,
        address: {
            street: "Bambili",
            city: "Bamenda",
            country: "Cameroon"
        }
    },
    {
        id: 3,
        name: "Magloire",
        department: "Intelligence and Research",
        salary: 600000,
        isActive: false,
        address: {
            street: "Mile 3",
            city: "Bamenda",
            country: "Cameroon"
        }
    }
];
const displayEmployee = () => {
    console.log("====Employees====");
    employees.forEach((employee) => {
        console.log("------Employee------");
        console.log(`Employee No: ${employee.id}`);
        console.log(`Name: Mr.${employee.name}`);
        console.log(`Department: ${employee.department}`);
        console.log(`Salary: ${employee.salary}`);
        console.log(`Street: ${employee.address.street}`);
        console.log(`City: ${employee.address.city}`);
        console.log(`Country: ${employee.address.country}`);
        console.log(`Status: Active? ${employee.isActive}`);
    });
};
const activeEmployee = () => {
    console.log("===Active Employee===");
    employees.forEach((employee) => {
        console.log("------Employee active------");
        if (employee.isActive === true) {
            console.log(`Name:Mr.${employee.name}`);
            console.log(`Department: ${employee.department}`);
            console.log(`Salary: ${employee.salary}`);
            console.log("Employee is Active");
        }
    });
};
console.log("===Average Salary====");
const totalSalary = employees.reduce((sum, emp) => {
    return sum + emp.salary;
}, 0);
const average = totalSalary / employees.length;
console.log(`Average salary = ${average}`);
const higehestSalary = Math.max(...employees.map(emp => emp.salary));
console.log("====highest salary=====");
console.log(higehestSalary);
displayEmployee();
activeEmployee();
//# sourceMappingURL=index.js.map