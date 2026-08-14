// ==========================================
// TRANSACTION TYPE
// ==========================================
// ==========================================
// STATE
// ==========================================
let transactions = [];
let editingId = null;
const STORAGE_KEY = "finance_transactions";
// ==========================================
// DOM ELEMENTS
// ==========================================
const form = document.querySelector("#transactionForm");
const typeInput = document.querySelector("#transactionType");
const sourceInput = document.querySelector("#transactionSource");
const detailsInput = document.querySelector("#transactionDetails");
const amountInput = document.querySelector("#transactionAmount");
const transactionList = document.querySelector("#transactionList");
// ✅ FIXED: Added # for ID selector
const submitBtn = document.querySelector("#addTransactionButton");
// ==========================================
// STORAGE FUNCTIONS (Phase 6)
// ==========================================
function saveToLocalStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        console.log("✅ Data saved to localStorage");
    }
    catch (error) {
        console.error("❌ Failed to save data:", error);
    }
}
function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            console.log("✅ Loaded", parsed.length, "transactions from localStorage");
            return parsed;
        }
    }
    catch (error) {
        console.error("❌ Failed to load data:", error);
    }
    return [];
}
// ==========================================
// CALCULATE TOTALS
// ==========================================
function calculateTotals() {
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance };
}
// ==========================================
// UPDATE TOTALS UI
// ==========================================
function updateTotals() {
    const totalIncomeEl = document.querySelector("#totalIncome");
    const totalExpensesEl = document.querySelector("#totalExpenses");
    const balanceEl = document.querySelector("#balance");
    const totals = calculateTotals();
    if (totalIncomeEl) {
        totalIncomeEl.innerHTML = `${totals.totalIncome.toLocaleString()} FCFA`;
        totalIncomeEl.style.color = "#2ecc71";
    }
    if (totalExpensesEl) {
        totalExpensesEl.innerHTML = `${totals.totalExpenses.toLocaleString()} FCFA`;
        totalExpensesEl.style.color = "#e74c3c";
    }
    if (balanceEl) {
        const balance = totals.balance;
        balanceEl.innerHTML = `${balance.toLocaleString()} FCFA`;
        balanceEl.style.color = balance >= 0 ? "#2ecc71" : "#e74c3c";
    }
}
// ==========================================
// RENDER FUNCTION
// ==========================================
function renderTransactions() {
    // Clear the table
    transactionList.innerHTML = "";
    // Show empty state if no transactions
    if (transactions.length === 0) {
        const emptyRow = document.createElement("tr");
        // ✅ FIXED: colspan is 6 (Date, Type, Source, Details, Amount, Actions)
        // ✅ FIXED: Added closing quote for class
        emptyRow.innerHTML = `
            <td colspan="6" class="empty-state-cell">
                <div class="empty-state visible">
                    <div class="empty-icon">
                        <i class="fa-solid fa-receipt"></i>
                    </div>
                    <h3>No transactions yet</h3>
                    <p>Add your first income or expense to get started.</p>
                </div>
            </td>
        `;
        transactionList.appendChild(emptyRow);
        updateTotals();
        return;
    }
    // Render each transaction
    transactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.dataset.id = String(transaction.id);
        const isIncome = transaction.type === "income";
        const amountClass = isIncome ? "income" : "expense";
        const amountSign = isIncome ? "+" : "-";
        const formattedAmount = `${amountSign}${transaction.amount.toLocaleString()}`;
        const formattedDate = new Date(transaction.date).toLocaleDateString();
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td class="type-badge ${amountClass}">
                <i class="fa-solid ${isIncome ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
                ${transaction.type}
            </td>
            <td>${transaction.source}</td>
            <td>${transaction.details || "-"}</td>
            <td class="amount ${amountClass}">${formattedAmount}</td>
            <td>
                <button class="action-button edit-btn" data-id="${transaction.id}" aria-label="Edit transaction">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="action-button delete-btn" data-id="${transaction.id}" aria-label="Delete transaction">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        transactionList.appendChild(row);
    });
    // Update totals
    updateTotals();
}
// ==========================================
// DELETE TRANSACTION (FIXED: singular name)
// ==========================================
function deleteTransaction(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) {
        return;
    }
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveToLocalStorage();
    renderTransactions();
    console.log(`🗑️ Transaction ${id} deleted`);
}
// ==========================================
// EDIT TRANSACTION (FIXED: singular name)
// ==========================================
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) {
        alert("Transaction not found");
        return;
    }
    // Fill form with transaction data
    typeInput.value = transaction.type;
    sourceInput.value = transaction.source;
    detailsInput.value = transaction.details || "";
    amountInput.value = String(transaction.amount);
    editingId = transaction.id;
    submitBtn.textContent = "Update Transaction";
    form.scrollIntoView({ behavior: "smooth" });
}
// ==========================================
// FORM SUBMISSION HANDLER
// ==========================================
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get values
    const type = typeInput.value;
    const source = sourceInput.value.trim();
    const details = detailsInput.value.trim();
    const amount = amountInput.valueAsNumber;
    // Validate
    if (!source) {
        alert("Please enter a source");
        return;
    }
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    // Check if we're editing or adding
    if (editingId !== null) {
        // ======================================
        // UPDATE EXISTING TRANSACTION
        // ======================================
        const index = transactions.findIndex(t => t.id === editingId);
        if (index !== -1) {
            transactions[index] = Object.assign(Object.assign({}, transactions[index]), { type: type, source: source, details: details, amount: amount });
            console.log(`✅ Updated transaction ${editingId}`);
            saveToLocalStorage();
        }
        else {
            alert("Transaction not found!");
            editingId = null;
            submitBtn.textContent = "Add Transaction";
            form.reset();
            return;
        }
        // Reset editing state
        editingId = null;
        submitBtn.textContent = "Add Transaction";
    }
    else {
        // ======================================
        // ADD NEW TRANSACTION
        // ======================================
        const transaction = {
            id: Date.now(),
            type: type,
            source: source,
            details: details,
            amount: amount,
            date: new Date().toISOString(),
        };
        transactions.push(transaction);
        console.log("✅ New transaction added:", transaction);
        saveToLocalStorage();
    }
    // Re-render and reset
    renderTransactions();
    form.reset();
});
// ==========================================
// EVENT DELEGATION
// ==========================================
transactionList.addEventListener("click", (event) => {
    const target = event.target;
    const button = target.closest("button");
    if (!button)
        return;
    const transactionId = Number(button.dataset.id);
    if (isNaN(transactionId))
        return;
    if (button.classList.contains("delete-btn")) {
        deleteTransaction(transactionId); // ✅ FIXED: singular name
    }
    if (button.classList.contains("edit-btn")) {
        editTransaction(transactionId); // ✅ FIXED: singular name
        alert(`Editing transaction`);
    }
});
// ==========================================
// INITIALIZE APP (Phase 6)
// ==========================================
function init() {
    // Load from localStorage
    transactions = loadFromLocalStorage();
    // Render transactions
    renderTransactions();
    console.log("🚀 App initialized with", transactions.length, "transactions");
}
// Start the app
init();
export {};
//# sourceMappingURL=sandbox.js.map