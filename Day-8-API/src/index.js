"use strict";
// interface Student{
//   id: number;
//   name: string;
//   course: string;
// }
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error:", error);
        throw error;
    }
}
const displayProducts = (products) => {
    products.forEach(product => {
        console.log(`ID: ${product.id}| Title: ${product.title} | Price: $${product.price} | Category: ${product.category}`);
    });
};
const findProducts = (products, id) => {
    const product = products.find(product => product.id === id);
    if (!product) {
        throw new Error("Product with ID ${id} not found");
    }
    return product;
};
const filterByCategory = (products, category) => {
    const product = products.filter(product => product.category === category);
    if (!product) {
        throw new Error("Product Category ${category} not found");
    }
    return product;
};
const calculatePrice = (products) => {
    const Total = products.reduce((sum, num) => sum + num.price, 0);
    return Total;
};
const getExpensive = (products) => {
    if (products.length === 0) {
        throw new Error("No products Available");
    }
    const Expensive = products.reduce((MostExpensive, currentProduct) => {
        return currentProduct.price > MostExpensive.price ? currentProduct : MostExpensive;
    });
    return Expensive;
};
//# sourceMappingURL=index.js.map