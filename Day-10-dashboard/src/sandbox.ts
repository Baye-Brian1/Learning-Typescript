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
const searchInput= document.querySelector('#searchProducts') as HTMLInputElement
const filterCat= document.querySelector('#filter') as HTMLSelectElement
const ProductCount= document.querySelector('#productCount') as HTMLParagraphElement
const stockCount= document.querySelector('#stockCount') as HTMLParagraphElement
interface Product {
  id: number;
  name: string;
  amount: number;
  category: string;
  stock: number;
}
let products: Product[] = [];
let editingID: number| null=null;
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


const updateStats=()=>{
  const totalProducts = products.length;
  const totalStocks= products.reduce((a, b)=>{
    return a+b.stock;
  },0)
  ProductCount.textContent= totalProducts.toString();
  stockCount.textContent= totalStocks.toString();

}


searchInput.addEventListener('input', ()=>{
 searchProduct()
})
filterCat.addEventListener('change', ()=>{
  filterCategories()
})

const filterCategories=()=>{
  const filter =filterCat.value.toLocaleLowerCase()
   if (filter===''|| filter==="all") {
    renderProduct();
  } else {
    const filteredCategory = products.filter(product=>{
      return product.category.toLowerCase().includes(filter);
  })
  renderProduct(filteredCategory);
}
}

const searchProduct=()=>{
  const searchTerm= searchInput.value.toLowerCase().trim()
  if (searchTerm==='') {
    renderProduct()
    
  } else {
    const filteredProducts=products.filter(product=>{
      return product.name.toLowerCase().includes(searchTerm);
  })
   renderProduct(filteredProducts);
  }
  
}
const deleteProduct=(id:number)=>{
  if (confirm("Are you sure you want to delete this product"))
  products=products.filter(product=> product.id !== id);

  renderProduct(products);
  updateStats();
  saveProduct();
  return;
}
const updateProduct=(id:number)=>{
  const product =products.find(product=> product.id===id)
  if(!product){
      alert("product not found");
      return;
  }
  editingID= id;
  productName.value= product.name;
  productCategory.value= product.category
  productAmount.valueAsNumber= product.amount;
  productQuantity.valueAsNumber=product.stock;
  submitBtn.textContent="Edit Product"

}

const renderProduct = (productsRender= products) => {
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
  }

  productsRender.forEach((product) => {
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
       productList.appendChild(row)
       return;
  });

  updateStats();
};

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const name = productName.value.trim();
  const category = productCategory.value;
  const amount = productAmount.valueAsNumber;
  const quantity = productQuantity.valueAsNumber;

  if (!name ||!category||!amount || !amount) {
    alert("Please fill in all the required fields");
    return;
  }

   if (editingID !==
     null){
    products = products.map(p=> p.id=== editingID? {...p, name, category, amount, stock:quantity}:p)
    editingID= null;
    submitBtn.textContent="Add Products"

  }else{
    const product: Product = {
    id: Date.now(),
    name: name,
    category: category,
    amount: amount,
    stock: quantity,
  };
  products.push(product);
  

  }
  form.reset()
  setTimeout(()=>{
     popup?.classList.remove("show");
  },500)
  
  renderProduct();
  saveProduct();
});
 
productList.addEventListener('click', (e:MouseEvent)=>{
  const target= e.target as HTMLElement
    const button= target.closest("button");

    if(!button)return; 
    const productId= Number(button?.dataset.id);

    if(button.classList.contains("delete-button")){
      deleteProduct(productId);
    }
    if (button.classList.contains("edit-button")){
       updateProduct(productId);
       popup?.classList.add('show')
    }
})


const init = () => {
  products=loadProduct();
  renderProduct(products)
  
  console.log("Data loaded successfully");
};
init();
