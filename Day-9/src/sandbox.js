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
let editingId = null;
const STORAGE = "finance-transaction";
const saveTransaction = () => {
    try {
        const data = JSON.stringify(transactions);
        localStorage.setItem(STORAGE, data);
        console.log("Data successfully saved");
    }
    catch (error) {
        console.log("Failed to save data");
    }
};
const loadTransaction = () => {
    try {
        const data = localStorage.getItem(STORAGE);
        if (data) {
            const parsed = JSON.parse(data);
            transactions = parsed;
            console.log("Data Parsed successfully");
            return parsed;
        }
    }
    catch (error) {
        console.log("Failed to get data");
    }
};
const deleteTransaction = (id) => {
    if (!confirm("Are you sure you want to delete this transaction")) {
        return;
    }
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransaction();
    renderTransaction();
    return;
};
const editTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) {
        alert("Transaction not found");
        return;
    }
    editingId = id;
    typeInput.value = transaction.type;
    sourceInput.value = transaction.source;
    detailsInput.value = transaction.details;
    amountInput.value = transaction.amount.toString();
    submitBtn.textContent = "Edit Transaction";
    return;
};
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
        updateTotals();
        saveTransaction();
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
    updateTotals();
};
const calculateTotal = () => {
    const income = transactions.filter(t => t.type === "income");
    const totalIncome = income.reduce((sum, num) => sum + num.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense");
    const totalExpenses = expenses.reduce((sum, num) => sum + num.amount, 0);
    const balance = totalIncome - totalExpenses;
    return {
        totalIncome,
        totalExpenses,
        balance
    };
};
const updateTotals = () => {
    const incomeElement = document.querySelector("#totalIncome");
    const expenseElement = document.querySelector("#totalExpenses");
    const balance = document.querySelector("#balance");
    const total = calculateTotal();
    incomeElement.textContent = `${total.totalIncome.toLocaleString()} FCFA`;
    incomeElement.style.color = "green";
    expenseElement.textContent = `${total.totalExpenses.toLocaleString()} FCFA`;
    expenseElement.style.color = "red";
    balance.textContent = `${total.balance.toLocaleString()} FCFA`;
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
        alert("please enter amount");
        return;
    }
    if (editingId !== null) {
        const index = transactions.findIndex(t => t.id === editingId);
        if (index !== -1) {
            transactions[index] = Object.assign(Object.assign({}, transactions[index]), { type: type, source: source, details: details, amount: amount });
            editingId = null;
            submitBtn.textContent = "Add Transaction";
            saveTransaction();
            form.reset();
        }
        else {
            alert("Transaction not found");
            editingId = null;
            submitBtn.textContent = "Add Transaction";
            form.reset();
        }
    }
    else {
        const transaction = {
            id: Date.now(),
            type: type,
            source: source,
            details: details,
            amount: amount,
            date: new Date().toISOString()
        };
        transactions.push(transaction);
    }
    renderTransaction();
    saveTransaction();
    form.reset();
});
transactionList.addEventListener('click', (e) => {
    const target = e.target;
    const button = target.closest("button");
    if (!button)
        return;
    const transactionID = Number(button.dataset.id);
    if (button.classList.contains("delete-button")) {
        deleteTransaction(transactionID);
    }
    if (button.classList.contains("edit-button")) {
        editTransaction(transactionID);
    }
});
const init = () => {
    loadTransaction();
    renderTransaction();
    console.log("data succssfully loaded");
};
init();
export {};
//# sourceMappingURL=sandbox.js.map