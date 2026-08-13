class Invoice {
    constructor(client, details, amount) {
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.client} owes £${this.amount} for ${this.details}`;
    }
}
const invOne = new Invoice("mario", 'work on the mario website', 250);
const invTwo = new Invoice("brian", 'work on the amazon website', 300);
const invThree = new Invoice("nesta", 'studied marketing', 150);
console.log(invOne, invTwo, invThree);
let invoice = [];
invoice.push(invOne);
invoice.push(invTwo);
invoice.push(invThree);
invoice.forEach(inv => {
    console.log(inv.client, inv.amount, inv.format());
});
const form = document.querySelector('.new-item-form');
console.log(form.children);
const type = document.querySelector('#type');
const toFrom = document.querySelector('#toFrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(type.value, toFrom.value, details.value, amount.valueAsNumber);
});
export {};
//# sourceMappingURL=sandbox.js.map