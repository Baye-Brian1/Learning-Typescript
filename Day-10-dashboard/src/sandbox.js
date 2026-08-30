const popup = document.querySelector(".add-modal-card");
const openModal = document.querySelector("#addPopup");
const closeModal = document.querySelector("#closePopup");
openModal.addEventListener("click", () => {
    popup === null || popup === void 0 ? void 0 : popup.classList.add("show");
});
closeModal.addEventListener("click", () => {
    popup === null || popup === void 0 ? void 0 : popup.classList.remove("show");
});
const productName = document.querySelector("#productName");
const productCategory = document.querySelector("#productCategory");
const productAmount = document.querySelector("#productAmount");
const productQuantity = document.querySelector("#productQuantity");
const productList = document.querySelector("#productList");
const submitBtn = document.querySelector("#addProductButton");
const form = document.querySelector("#productForm");
const products = [];
let editingID = null;
const STORAGE = "products";
const saveProduct = () => {
    try {
        const data = JSON.stringify(products);
        localStorage.setItem(STORAGE, data);
    }
    catch (error) {
        console.log(error);
    }
};
const loadProduct = () => {
    try {
        const data = localStorage.getItem(STORAGE);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    catch (_a) {
        return [];
    }
};
const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product"))
        products.filter(product => product.id !== id);
    renderProduct();
    saveProduct();
    return;
};
const updateProduct = (id) => {
    const product = products.find(product => product.id === id);
    if (!product) {
        alert("product not found");
        return;
    }
    editingID = id;
    productName.value = product.name;
    productCategory.value = product.category;
    productAmount.valueAsNumber = product.amount;
    productQuantity.valueAsNumber = product.stock;
    submitBtn.textContent = "Edit Product";
    return;
};
const renderProduct = () => {
    productList.innerHTML = "";
    if (products.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `
    <div class="empty-state" id="emptyState">
          <div class="empty-icon">
            <i class="fa-solid fa-receipt"></i>
          </div>
          <h3>No products yet</h3>
          <p>Add your first products.</p>
        </div>`;
        productList.appendChild(emptyRow);
        saveProduct();
    }
    products.forEach((product) => {
        const row = document.createElement("tr");
        const formatAmount = product.amount.toLocaleString();
        row.innerHTML = `
    <td>${product.name}</td>
    <td>${product.category}</td>
    <td>${formatAmount}</td>
    <td>${product.stock}</td>
    <td class="button-action">
        <button class="action-button edit-button" data-id="${product.id}" aria-label="Edit transaction">
             <i class="fa-solid fa-pen"></i>
            </button>
            <button class="action-button delete-button" data-id="${product.id}" aria-label="Delete transaction">
              <i class="fa-solid fa-trash"></i>
            </button>
        </td>
     `;
        productList.appendChild(row);
        saveProduct();
        return;
    });
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = productName.value.trim();
    const category = productCategory.value;
    const amount = productAmount.valueAsNumber;
    const quantity = productQuantity.valueAsNumber;
    if (!name) {
        alert("Please fill in the product name");
        return;
    }
    if (!category) {
        alert("Please select the product's catgory");
        return;
    }
    if (!amount || !amount) {
        alert("Please fill in the product's amount and quantity");
        return;
    }
    const product = {
        id: Date.now(),
        name: name,
        category: category,
        amount: amount,
        stock: quantity,
    };
    products.push(product);
    renderProduct();
    saveProduct();
});
const init = () => {
    loadProduct();
    console.log("Data loaded successfully");
};
init();
export {};
//# sourceMappingURL=sandbox.js.map