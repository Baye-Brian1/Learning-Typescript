// // ==========================================
// // TRANSACTION TYPE
// // ==========================================
const form = document.querySelector("#transactionForm");
const typeInput = document.querySelector("#transactionType");
const sourceInput = document.querySelector("#transactionSource");
const detailsInput = document.querySelector("#transactionDetails");
const amountInput = document.querySelector("#transactionAmount");
const submitBtn = document.querySelector("#addTransactionButton");
const transactionList = document.querySelector("#transactionList");
let transactions = [];
const renderTransaction = () => {
    transactionList.innerHTML = "";
    if (transactions.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `
        <td colspan="6" class="empty-state">
          <div class="empty-state visible">
            <div class="empty-icon">
              <i class="fa-solid fa-receipt"></i>
            </div>
            <h3>No transactions yet</h3>
            <p>Add your Income or expenses</p>
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
        const typeClass = isIncome ? "income" : "expense";
        const Sign = isIncome ? "+" : "-";
        const formatAmount = `${Sign}${transaction.amount.toLocaleString()}`;
        const formatDate = new Date(transaction.date).toLocaleDateString();
        row.innerHTML = `
        <td class="">${formatDate}</td>
        <td>
            <span class="type-badge ${typeClass}">
              <i class="fa-solid ${isIncome ? "fa-arrow-up" : "fa-arrow-down"}"></i>
             ${transaction.type}
            </span>
        </td>
        <td>${transaction.source}</td>
        <td>${transaction.details}</td>
        <td class="amount ${typeClass}">${formatAmount}</td>
        <td>
            <button class="action-button edit-button" data-id="${transaction.id}" aria-label="Edit transaction">
             <i class="fa-solid fa-pen"></i>
            </button>
            <button class="action-button delete-button" data-id="${transaction.id}" aria-label="Delete transaction">
              <i class="fa-solid fa-trash"></i>
            </button>
        </td>
        `;
        transactionList.appendChild(row);
        return;
    });
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = typeInput.value;
    const source = sourceInput.value.trim();
    const details = detailsInput.value.trim();
    const amount = amountInput.valueAsNumber;
    if (!source) {
        alert("please enter source");
        return;
    }
    if (!amount || amount <= 0) {
        alert("pleae enter amount");
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
    console.log(transaction);
    renderTransaction();
});
export {};
//# sourceMappingURL=sandbox.js.map