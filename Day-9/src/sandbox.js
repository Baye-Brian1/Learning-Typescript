// interface HasFormatter{
//     format():string
//  }
//  class Invoice implements HasFormatter{
//     constructor(
//         readonly client: string,
//         private details: string,
//         public amount: number
//     ){}
const form = document.querySelector("#transactionForm");
const typeInput = document.querySelector("#transactionType");
const sourceInput = document.querySelector("#transactionSource");
const detailsInput = document.querySelector("#transactionDetails");
const amountInput = document.querySelector("#transactionAmount");
const transactionList = document.querySelector("#transactionList");
let transactions = [];
function renderTransactions() {
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
        const dateobj = new Date(transaction.date);
        const formatDate = dateobj.toLocaleDateString();
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
        transactionList.appendChild(row);
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = typeInput.value;
    const source = sourceInput.value.trim();
    const details = detailsInput.value.trim();
    const amount = amountInput.valueAsNumber;
    if (!source) {
        alert("Please enter source");
        return;
    }
    if (!amount || amount <= 0) {
        alert("please enter amount");
        return;
    }
    const transaction = {
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
export {};
//# sourceMappingURL=sandbox.js.map