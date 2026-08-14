// ==========================================
// TRANSACTION TYPE
// ==========================================

interface Transaction {
    id: number;
    type: "income" | "expense";
    source: string;
    details: string;
    amount: number;
    date: string;
}

// ==========================================
// STATE
// ==========================================

let transactions: Transaction[] = [];
let editingId: number | null = null;
const STORAGE_KEY = "finance_transactions";

// ==========================================
// DOM ELEMENTS
// ==========================================

const form = document.querySelector("#transactionForm") as HTMLFormElement;
const typeInput = document.querySelector("#transactionType") as HTMLSelectElement;
const sourceInput = document.querySelector("#transactionSource") as HTMLInputElement;
const detailsInput = document.querySelector("#transactionDetails") as HTMLInputElement;
const amountInput = document.querySelector("#transactionAmount") as HTMLInputElement;
const transactionList = document.querySelector("#transactionList") as HTMLTableSectionElement;

// ✅ FIXED: Added # for ID selector
const submitBtn = document.querySelector("#addTransactionButton") as HTMLButtonElement;

// ==========================================
// STORAGE FUNCTIONS (Phase 6)
// ==========================================

function saveToLocalStorage(): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        console.log("✅ Data saved to localStorage");
    } catch (error) {
        console.error("❌ Failed to save data:", error);
    }
}

function loadFromLocalStorage(): Transaction[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            console.log("✅ Loaded", parsed.length, "transactions from localStorage");
            return parsed;
        }
    } catch (error) {
        console.error("❌ Failed to load data:", error);
    }
    return [];
}

// ==========================================
// CALCULATE TOTALS
// ==========================================

function calculateTotals(): { totalIncome: number; totalExpenses: number; balance: number } {
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

function updateTotals(): void {
    const totalIncomeEl = document.querySelector("#totalIncome") as HTMLElement;
    const totalExpensesEl = document.querySelector("#totalExpenses") as HTMLElement;
    const balanceEl = document.querySelector("#balance") as HTMLElement;

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

function renderTransactions(): void {
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

function deleteTransaction(id: number): void {
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

function editTransaction(id: number): void {
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

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    // Get values
    const type = typeInput.value as "income" | "expense";
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
            transactions[index] = {
               ...transactions[index],
                type: type,
                source: source,
                details: details,
                amount: amount,
        // Keep original date
            } as Transaction;
            console.log(`✅ Updated transaction ${editingId}`);
            saveToLocalStorage();
        } else {
            alert("Transaction not found!");
            editingId = null;
            submitBtn.textContent = "Add Transaction";
            form.reset();
            return;
        }

        // Reset editing state
        editingId = null;
        submitBtn.textContent = "Add Transaction";

    } else {
        // ======================================
        // ADD NEW TRANSACTION
        // ======================================

        const transaction: Transaction = {
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
    const target = event.target as HTMLElement;
    const button = target.closest("button");

    if (!button) return;

    const transactionId = Number(button.dataset.id);
    if (isNaN(transactionId)) return;

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

function init(): void {
    // Load from localStorage
    transactions = loadFromLocalStorage();
    
    // Render transactions
    renderTransactions();
    
    console.log("🚀 App initialized with", transactions.length, "transactions");
}

// Start the app
init();