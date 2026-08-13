"use strict";
// interface Student{
//   id: number;
//   name: string;
//   course: string;
// }
Object.defineProperty(exports, "__esModule", { value: true });
// const student: Student={
//   id: 1,
//   name: "Brian",
//   course: "software"
// }
// // async function fetchStudents():Promise<Student[]> {
// //   const response= await fetch("https://example.com/students");
// //   const students: Student[]=await response.json();
// //   return students
// // }
// async function fetchStudents():Promise<Student[]> {
//   try {
//     const response= await fetch("https://example.com/students")
//     if (!response.ok){
//       throw new Error("Failed to fetch students")
//     }
//     const students: Student[]= await response.json();
//     return students
//   } catch (error) {
//     console.log("Error:", error);
//     throw error;
//   }
// }
// interface Product{
//   id: number;
//   title: string;
//   price: number;
// }
// const products: Product[]=[
//   {
//     id: 1,
//     title: "TV",
//     price: 100000
//   },
//   {
//     id: 2,
//     title: "phone",
//     price: 500
//   },
//   {
//     id: 3,
//     title: "laptop",
//     price: 10000
//   },
//   {
//     id: 4,
//     title: "Fridge",
//     price: 1000
//   },
//   {
//     id:5,
//     title: "Couch",
//     price: 1000
//   },
// ];
// interface ApiResponse<T>{
//   success: boolean;
//   data: T;
// }
// async function getProducts(): Promise<Product[]>{
//   const response: ApiResponse<Product[]>={
//     success: true,
//     data: [
//       {
//     id:5,
//     title: "Couch",
//     price: 1000
//   },
//   {
//     id: 4,
//     title: "Fridge",
//     price: 1000
//   },
//     ]
//   }
//   await new Promise(resolve =>setTimeout(resolve, 1000))
//   const Pro: Product[]= await response.data;
//   return Pro;
// }
// // getProducts().then(products => console.log(products));
// async function fetchUsers(){
//   try {
//      const response= await fetch("https://fakestoreapi.com/products")  
//      if(!response.ok){
//       throw new Error("Failed to fetch data"); 
//      }
//      const data= await response.json();
//      return data;
//   } catch (error) {
//     console.log("Error:", error);
//     throw error
//   }
// }
// console.log("===Users===");
// fetchUsers
//# sourceMappingURL=index.js.map