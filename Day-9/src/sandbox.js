// interface HasFormatter{
//     format():string
//  }
//  class Invoice implements HasFormatter{
//     constructor(
//         readonly client: string,
//         private details: string,
//         public amount: number
//     ){}
const form = document.querySelector('#transactionForm');
const type = document.querySelector('#transactionType');
const toFrom = document.querySelector('#transactionSource');
const details = document.querySelector('#transactionDetails');
const amount = document.querySelector('#transactionAmount');
const transactionList = document.querySelector('#transactionList');
const Income = {
    id: 1,
    type: "income",
    source: toFrom.value,
    details: details.value,
    amount: amount.valueAsNumber,
    date: "1"
};
console.log(Income);
const transaction = {
    id: 1,
    type: "income",
    source: "Salary",
    details: "Monthly salary",
    amount: 500000,
    date: "2026-08-14"
};
console.log(transaction);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (type.value === "income") {
        console.log(toFrom.value, details.value, amount.valueAsNumber);
    }
});
export {};
//# sourceMappingURL=sandbox.js.map