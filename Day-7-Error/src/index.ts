// // Union Types
// let userId: string|number;

// userId="1";
// userId= 1;

// // literal types
// let status: "pending"|"Approved"|"rejected";

// status="pending";

// // Type narrowing
// function printValue(value: string|number){
//   if (typeof value== "string"){
//     console.log(value.toUpperCase());
    
//   }
//    if (typeof value== "number"){
//     console.log(value.toFixed(2));
    
//   }
// }

// printValue(10)
// printValue("bitch")

// // Type Guard

// function process(value:string|number){
//   if (typeof value=== "string") {
//     console.log("String", value);
//   }else{
//     console.log("Number", value); 
//   }
// }
// process(100);
// process("YOO")

// class Student{
//   name: string;
  
//   constructor(name: string){
//     this.name=name
//   }
// }
// const student= new Student("brian");

// if (student instanceof Student){
//   console.log(student.name);
// }
// const name= null;
// const userName=name??"guest";

// console.log(userName);

// const age= null;
// const userAge=age??18;

// console.log(userAge);

// const newAge= 0;
// const newUserAge=newAge??20;

// console.log(newUserAge);

// function login(password: string){
//   if (password!=="12345"){
//     throw new Error("invalid password");
    
//   }
//   return "Login successful"

// }

// try {
//   console.log(login("bbv"));
  
// } catch (error) {
//   if (error instanceof Error){
//     console.log(error.message);
    
//   }
  
// }

// const formatID=(value: string|number)=>{
//   console.log(value);
  
// }

// formatID(90);
// formatID("bbv")

// type OrderStatus= "pending"|"processing"|"shipped"|"delivered"

// const order:OrderStatus= "delivered"
// console.log(order);


// const calculate=(value: string|number)=> {
//   if (typeof value ==="string"){
//     console.log(value.length.toFixed(1));
//   }
//   if (typeof value ==="number"){
//     console.log((value*2).toFixed(1));
    
//   }
// }
// calculate("necrosis")
// calculate(12);

// let data: unknown;

// data='hello ts';
// if (typeof data==="string"){
//   console.log("string:", data.toUpperCase());
// }

// interface User{
//   name: string;
//   profile?:{
//     bio: string;
//   }
// }

// const brian:User={
//   name:"Brian",
//   profile:{bio:"hello im a dev"}
// }

// console.log(brian.name);
// console.log(brian.profile?.bio);


type OrderStatus ="pending"|"processing"|"shipped"|"delivered";

interface Order{
  id: number;
  customer: string;
  items: string[];
  total: number;
  status: OrderStatus;
}
 const orders: Order[]=[
   {
    id: 1,
    customer: "Brian",
    items: ["laptop","phone","phone stand"],
    total: 3,
    status: "pending"
   },
   {
    id: 2,
    customer: "Nesta",
    items: ["laptop","Tv","Tv stand"],
    total: 3,
    status: "pending"
   },
   {
    id: 3,
    customer: "lucien",
    items: ["dress","wifi-box"],
    total: 6,
    status: "delivered"
   },
   {
    id: 4,
    customer: "chelsy",
    items: ["mirror","comb",],
    total: 5,
    status: "shipped"
   },
   {
    id: 4,
    customer: "Ashly",
    items: ["shoes"],
    total: 3,
    status: "processing"
   }

  ]

  const displayOrders=()=>{
    console.log("====display all orders====");
    orders.forEach(order=>{
      console.log("---customer---");
      console.log(`ID: ${order.id}`);
      console.log(`Customer Name: ${order.customer}`);
      console.log(`Items: ${order.items}`);
      console.log(`Total items: ${order.total}`);
      console.log(`Status: ${order.status}`);
      
      
    })
    
  }

  const findOrder=(id:number):Order =>{
    const Order= orders.find((order)=> order.id === id);
    if(!Order){
      throw new Error("Order not found");
      
    }
    return Order;
  }
  

  const filterByStatus=(status: OrderStatus)=>{
   console.log(`Orders with status: ${status.toUpperCase()}`);
   const filteredOrders= orders.filter(order=> order.status===status)
   filteredOrders.forEach((filteredOrder)=>{
    console.log(filteredOrder);
    
   })
   
  }

  const totalSales=():number=>{
     return orders.reduce((sum, num)=>sum+num.total, 0)
  }

  const getCustomer=(id: number):string|undefined=>{
      const order= orders.find(order=> order.id=== id);
      return order?.customer
  }
  const processOrder=(id:number, newStatus:OrderStatus)=>{
    const order= findOrder(id)
    order.status=newStatus
    console.log(`Order Id ${id} status updated ${newStatus}`);
    
  }
//   displayOrders()
//   findOrder(2)
//  try {
//     console.log(findOrder(6));
    
//   } catch (error) {
//     if (error instanceof Error){
//       console.log(error.message);
      
//     }
//   }

 
  console.log("total sales");
  totalSales()
  // getCustomer(3);
  // processOrder(4, "processing");