// interface Student{
//   id: number;
//   name: string;
//   course: string;
// }

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

interface Product{
  id: number;
  title: string;
  price: number;
  category: string;
}

async function fetchProducts():Promise<Product[]> {
  try {
    const response= await fetch("https://fakestoreapi.com/products");
    if (!response.ok){
      throw new Error("Failed to fetch data");
      
    }
    const data: Product[]= await response.json(); 
    return data
  } catch (error) {
    console.log("Error:", error);
    throw error
  }
  
}

const displayProducts=(products: Product[])=>{
  products.forEach(product=>{
    console.log(`ID: ${product.id}| Title: ${product.title} | Price: $${product.price} | Category: ${product.category}`);
    
  })
}
const findProducts=(products:Product[], id:number):Product=>{
  const product= products.find(product=> product.id === id);

  if (!product){
    throw new Error("Product with ID ${id} not found");
    
  }
  return product
}
const filterByCategory=(products:Product[], category:string):Product[]=>{
  const product:Product[]= products.filter(product=> product.category===category)
   if (!product){
    throw new Error("Product Category ${category} not found");
  }
  return product;
}
const calculatePrice=(products:Product[])=>{
  const Total= products.reduce((sum, num)=> sum +num.price, 0)
  return Total;
}
const getExpensive=(products:Product[]):Product=>{
  if (products.length ===0){
    throw new Error("No products Available");
    
  }
   const Expensive =products.reduce((MostExpensive, currentProduct)=>{
    return currentProduct.price> MostExpensive.price? currentProduct:MostExpensive
   })

   return Expensive;

}