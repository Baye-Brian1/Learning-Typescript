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
        salary: 300000,
        isActive: true,
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
        salary: 400000,
        isActive: false,
        address: {
            street: "Mile 3",
            city: "Bamenda",
            country: "Cameroon"
        }
    }
];
const displayEmployee = () => {
    employees.forEach((epmloyee) => {
        console.log("====Employees====");
        console.log(`Employee No: ${epmloyee.id}`);
        console.log(`Name: Mr.${epmloyee.name}`);
    });
};
const activeEmployee = () => {
    employees.forEach((employee) => {
        console.log("===Active Employee===");
        if (employee.isActive === true) {
            console.log(`Name: ${employee.name}`);
            console.log(`Department: ${employee.department}`);
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
const higehestSalary = () => {
    console.log("====Highest Salary====");
    employees.forEach((employee) => {
        Math.max(employee.salary);
    });
};
displayEmployee();
activeEmployee();
higehestSalary();
//# sourceMappingURL=index.js.map