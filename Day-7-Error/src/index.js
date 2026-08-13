"use strict";
// // Union Types
// let userId: string|number;
Object.defineProperty(exports, "__esModule", { value: true });
const orders = [
    {
        id: 1,
        customer: "Brian",
        items: ["laptop", "phone", "phone stand"],
        total: 3,
        status: "pending"
    },
    {
        id: 2,
        customer: "Nesta",
        items: ["laptop", "Tv", "Tv stand"],
        total: 3,
        status: "pending"
    },
    {
        id: 3,
        customer: "lucien",
        items: ["dress", "wifi-box"],
        total: 6,
        status: "delivered"
    },
    {
        id: 4,
        customer: "chelsy",
        items: ["mirror", "comb",],
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
];
const displayOrders = () => {
    console.log("====display all orders====");
    orders.forEach(order => {
        console.log("---customer---");
        console.log(`ID: ${order.id}`);
        console.log(`Customer Name: ${order.customer}`);
        console.log(`Items: ${order.items}`);
        console.log(`Total items: ${order.total}`);
        console.log(`Status: ${order.status}`);
    });
};
const findOrder = (id) => {
    const Order = orders.find((order) => order.id === id);
    if (!Order) {
        throw new Error("Order not found");
    }
    return Order;
};
const filterByStatus = (status) => {
    console.log(`Orders with status: ${status.toUpperCase()}`);
    const filteredOrders = orders.filter(order => order.status === status);
    filteredOrders.forEach((filteredOrder) => {
        console.log(filteredOrder);
    });
};
const totalSales = () => {
    return orders.reduce((sum, num) => sum + num.total, 0);
};
const getCustomer = (id) => {
    const order = orders.find(order => order.id === id);
    return order?.customer;
};
const processOrder = (id, newStatus) => {
    const order = findOrder(id);
    order.status = newStatus;
    console.log(`Order Id ${id} status updated ${newStatus}`);
};
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
totalSales();
// getCustomer(3);
// processOrder(4, "processing");
//# sourceMappingURL=index.js.map