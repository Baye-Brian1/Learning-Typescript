const popup = document.querySelector(".add-modal-card");
const openModal = document.querySelector("#addPopup") as HTMLButtonElement;
const closeModal = document.querySelector("#closePopup") as HTMLButtonElement;

openModal.addEventListener("click", () => {
  popup?.classList.add("show");
});
closeModal.addEventListener("click", () => {
  popup?.classList.remove("show");
});
const productName = document.querySelector("#productName") as HTMLInputElement;
const productCategory = document.querySelector(
  "#productCategory",
) as HTMLSelectElement;
const productAmount = document.querySelector(
  "#productAmount",
) as HTMLInputElement;
const productQuantity = document.querySelector(
  "#productQuantity",
) as HTMLInputElement;
const productList = document.querySelector(
  "#productList",
) as HTMLTableSectionElement;
const submitBtn = document.querySelector(
  "#addProductButton",
) as HTMLButtonElement;
const form = document.querySelector("#productForm") as HTMLFormElement;
interface Product {
  id: number;
  name: string;
  amount: number;
  category: string;
  stock: number;
}
const products: Product[] = [];
const STORAGE = "products";

const saveProduct = () => {
  try {
    const data = JSON.stringify(products);
    localStorage.setItem(STORAGE, data);
  } catch (error) {
    console.log(error);
  }
};
const loadProduct = (): Product[] => {
  try {
    const data = localStorage.getItem(STORAGE);
    if (!data) return [];
    return JSON.parse(data) as Product[];
  } catch {
    return [];
  }
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
    <td>
        <button class="action-button edit-button" data-id="${product.id}" aria-label="Edit transaction">
             <i class="fa-solid fa-pen"></i>
            </button>
            <button class="action-button delete-button" data-id="${product.id}" aria-label="Delete transaction">
              <i class="fa-solid fa-trash"></i>
            </button>
        </td>
     `;
       productList.appendChild(row)
  });

};

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const name = productName.value.trim();
  const category = productCategory.value;
  const amount = productAmount.valueAsNumber;
  const quantity = productQuantity.valueAsNumber;

  if (!name) {
    alert("Please fill in the product name");
  }
  if (!category) {
    alert("Please select the product's catgory");
  }
  if (!amount || !amount) {
    alert("Please fill in the product's amount and quantity");
  }

  const product: Product = {
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
