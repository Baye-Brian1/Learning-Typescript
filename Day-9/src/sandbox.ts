// interface HasFormatter{
//     format():string
//  }
//  class Invoice implements HasFormatter{
//     constructor(
//         readonly client: string,
//         private details: string,
//         public amount: number
//     ){}

//     format(){
//         return `${this.client} owes £${this.amount} for ${this.details}`
//     }
// }
//  class Payment implements HasFormatter{
//     constructor(
//         readonly recipient: string,
//         private details: string,
//         public amount: number
//     ){}

//     format(){
//         return `${this.recipient} is owed £${this.amount} for ${this.details}`
//     }
// }
// class ListTemplate{
//     constructor(private container: HTMLUListElement){}
//     render(item: HasFormatter, heading:string, position:'start'|'end'){
//         const li= document.createElement('li')

//         const h4= document.createElement('h4')
//         h4.innerText= heading;
//         li.append(h4);

//         const p= document.createElement('p');
//         p.innerText= item.format()
//         li.append(p)

//         if (position=== 'start'){
//             this.container.prepend(li)
//         }else{
//             this.container.append(li)
//         }
//     }
// }

// const form= document.querySelector('.new-item-form') as HTMLFormElement;
// console.log(form.children);

// const type= document.querySelector('#type') as HTMLSelectElement;
// const toFrom= document.querySelector('#toFrom') as HTMLInputElement;
// const details= document.querySelector('#details') as HTMLInputElement;
// const amount= document.querySelector('#amount') as HTMLInputElement;

// const ul= document.querySelector('ul')!;
// const list= new ListTemplate(ul)

// form.addEventListener('submit', (e: Event)=>{
//     e.preventDefault();
//     let doc:HasFormatter;
//     if(type.value==='invoice'){
//         doc=new Invoice(toFrom.value, details.value, amount.valueAsNumber)
//     }else{
//         doc= new Payment(toFrom.value, details.value, amount.valueAsNumber)
//     }
//    list.render(doc, type.value, "start")

// });

interface Transaction {
  id: number;
  type: "income" | "expense";
  source: string;
  details: string;
  amount: number;
  date: string;
}

const form = document.querySelector("#transactionForm") as HTMLFormElement;
const typeInput = document.querySelector(
  "#transactionType",
) as HTMLSelectElement;
const sourceInput = document.querySelector(
  "#transactionSource",
) as HTMLInputElement;
const detailsInput = document.querySelector(
  "#transactionDetails",
) as HTMLInputElement;
const amountInput = document.querySelector(
  "#transactionAmount",
) as HTMLInputElement;

const transactionList = document.querySelector(
  "#transactionList",
) as HTMLTableSectionElement;

let transactions: Transaction[] = [];
function renderTransactions(): void {
  transactionList.innerHTML = "";
  if (transactions.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
        <td colspan="5" class="empty-state-cell">
          <div class="empty-state>
            <i class="fa-solid fa-wallet"></i>
            <p>No transactions yet</p>
            <span>Add your first income or expense to get started</span>
          </div>
        </td>
        `;
    transactionList.appendChild(emptyRow);
    return;
  }
  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.dataset.id = String(transaction.id);

    const isIncome = transaction.type === "income";
    const amountClass = isIncome ? "income" : "expense";
    const amountSign = isIncome ? "+" : "-";
    const formattedAmount = `${amountSign}${transaction.amount.toLocaleString()}`;
    const dateobj= new Date(transaction.date)
    const formatDate= dateobj.toLocaleDateString()
    row.innerHTML = `
    <td>${formatDate}</td>
    <td class="transaction-type ${amountClass}">
       <i class="fa-solid ${isIncome ? "fa-arrow-up" : "fa-arrow-down"}"></i>
       ${transaction.type}
    </td>
    <td>${transaction.source}</td>
    <td>${transaction.details || "-"}</td>
    <td class="amount ${amountClass}">${formattedAmount}</td>
     <td>
                <button class="action-btn edit-btn" data-id="${transaction.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${transaction.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
    `;
    transactionList.appendChild(row)
  });
}

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const type = typeInput.value as "income" | "expense";
  const source = sourceInput.value.trim();
  const details = detailsInput.value.trim();
  const amount = amountInput.valueAsNumber;

  if (!source) {
    alert("Please enter source");
    return;
  }
  if (!amount|| amount <= 0) {
    alert("please enter amount");
    return;
  }

  const transaction: Transaction = {
    id: Date.now(),
    type: type,
    source: source,
    details: details,
    amount: amount,
    date: new Date().toISOString(),
  };
  transactions.push(transaction);
  renderTransactions();
  form.reset();

  console.log("transactions", transaction);
  
});
