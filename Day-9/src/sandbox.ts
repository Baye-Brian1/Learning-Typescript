class Invoice{
    constructor(
        readonly client: string,
        private details: string,
        public amount: number
    ){}

    format(){
        return `${this.client} owes £${this.amount} for ${this.details}`
    }
}

class ListTemplate{
    
}

const invOne= new Invoice("mario", 'work on the mario website', 250)
const invTwo= new Invoice("brian", 'work on the amazon website', 300)
const invThree= new Invoice("nesta", 'studied marketing', 150)
console.log(invOne, invTwo,invThree);

let invoice: Invoice[]=[];
invoice.push(invOne);
invoice.push(invTwo);
invoice.push(invThree)


 invoice.forEach(inv=>{
    console.log(inv.client, inv.amount, inv.format());
    
 })

const form= document.querySelector('.new-item-form') as HTMLFormElement;
console.log(form.children);

const type= document.querySelector('#type') as HTMLSelectElement;
const toFrom= document.querySelector('#toFrom') as HTMLInputElement;
const details= document.querySelector('#details') as HTMLInputElement;
const amount= document.querySelector('#amount') as HTMLInputElement;

form.addEventListener('submit', (e: Event)=>{
    e.preventDefault();
    console.log(
        type.value,
        toFrom.value, 
        details.value, 
        amount.valueAsNumber
    );
    
})