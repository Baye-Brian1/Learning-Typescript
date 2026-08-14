interface HasFormatter{
    format():string
 }
 class Invoice implements HasFormatter{
    constructor(
        readonly client: string,
        private details: string,
        public amount: number
    ){}

    format(){
        return `${this.client} owes £${this.amount} for ${this.details}`
    }
}
 class Payment implements HasFormatter{
    constructor(
        readonly recipient: string,
        private details: string,
        public amount: number
    ){}

    format(){
        return `${this.recipient} is owed £${this.amount} for ${this.details}`
    }
}
class ListTemplate{
    constructor(private container: HTMLUListElement){}
    render(item: HasFormatter, heading:string, position:'start'|'end'){
        const li= document.createElement('li')
        
        const h4= document.createElement('h4')
        h4.innerText= heading;
        li.append(h4);

        const p= document.createElement('p');
        p.innerText= item.format()
        li.append(p)

        if (position=== 'start'){
            this.container.prepend(li)
        }else{
            this.container.append(li)
        }
    }
}

const form= document.querySelector('.new-item-form') as HTMLFormElement;
console.log(form.children);

const type= document.querySelector('#type') as HTMLSelectElement;
const toFrom= document.querySelector('#toFrom') as HTMLInputElement;
const details= document.querySelector('#details') as HTMLInputElement;
const amount= document.querySelector('#amount') as HTMLInputElement;

const ul= document.querySelector('ul')!;
const list= new ListTemplate(ul)

form.addEventListener('submit', (e: Event)=>{
    e.preventDefault();
    let doc:HasFormatter;
    if(type.value==='invoice'){
        doc=new Invoice(toFrom.value, details.value, amount.valueAsNumber)
    }else{
        doc= new Payment(toFrom.value, details.value, amount.valueAsNumber)
    }
   list.render(doc, type.value, "start")
    
});
